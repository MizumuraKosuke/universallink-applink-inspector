'use client'

import { useEffect, useState } from 'react'
import TestUrlButton from '../components/test-url-button'
import QRCodeButton from '../components/qr-code-button'
import CustomPathForm from '../components/custom-path-form'
import ConfigSection from '../components/config-section'
import { APPLE_APP_SITE_ASSOCIATION_URL } from '@/constants'
import type { AppleAppSiteAssociation, AssetLink } from '@/types'

export default function Home() {
  const [iosConfig, setIosConfig] = useState<AppleAppSiteAssociation | null>(null)
  const [androidConfig, setAndroidConfig] = useState<AssetLink[] | null>(null)
  const [baseUrl, setBaseUrl] = useState<string>('')
  const [customPath, setCustomPath] = useState<string>('')

  useEffect(() => {
    setBaseUrl(window.location.origin)

    fetch('/.well-known/apple-app-site-association')
      .then(res => res.json())
      .then(data => setIosConfig(data))
      .catch(console.error)

    fetch('/.well-known/assetlinks.json')
      .then(res => res.json())
      .then(data => setAndroidConfig(data))
      .catch(console.error)
  }, [])

  return (
    <div className="min-h-screen p-3 sm:p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-900">
          Universal Link Inspector
        </h1>

        {/* App Transition Test URLs */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">🚀 App Transition Test (From Config)</h2>
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              🌐 <strong>External Redirect Test:</strong> Uses httpbin.org to redirect from external domain and trigger Universal Links
            </p>
          </div>
          {iosConfig && (
            <div className="mb-6">
              <div className="space-y-4">
                {iosConfig.applinks.details.map((detail, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      App ID: {detail.appID}
                    </div>
                    <div className="space-y-2">
                      {detail.paths?.map((path, pathIndex) => {
                        const configUrl = `${baseUrl}${path === '*' ? '/test' : path}`
                        
                        return (
                          <div key={pathIndex} className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="text-xs text-gray-500 w-16 flex-shrink-0">Config:</div>
                              <TestUrlButton url={configUrl} className="flex-1" />
                              <QRCodeButton 
                                url={configUrl} 
                                title="Generate QR Code for Config Path"
                              />
                            </div>
                            <CustomPathForm 
                              baseUrl={baseUrl}
                              customPath={customPath}
                              onPathChange={setCustomPath}
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <ConfigSection 
            title="iOS Universal Links"
            icon="🍎"
            configUrl={`${baseUrl}/.well-known/apple-app-site-association`}
            config={iosConfig}
            loading={!iosConfig}
          />

          <ConfigSection 
            title="Android App Links"
            icon="🤖"
            configUrl={`${baseUrl}/.well-known/assetlinks.json`}
            config={androidConfig}
            loading={!androidConfig}
          />
        </div>

        {/* Instructions */}
        <div className="mt-4 sm:mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-2 sm:mb-3">📋 Setup Instructions</h3>
          <ol className="list-decimal list-inside space-y-1 sm:space-y-2 text-blue-800 text-sm sm:text-base">
            <li>Edit configuration files in: <code className="bg-blue-100 px-1 rounded">public/.well-known/</code></li>
            <li>iOS: Replace <code className="bg-blue-100 px-1 rounded">TEAM_ID.BUNDLE_ID</code> with your actual app ID</li>
            <li>Android: Replace <code className="bg-blue-100 px-1 rounded">com.example.app</code> with your actual package name</li>
            <li>Android: Add your SHA-256 certificate fingerprint</li>
            <li>Test the URLs above with your mobile apps</li>
          </ol>
        </div>

        {/* iOS Features Info */}
        <div className="mt-4 sm:mt-8 bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-green-900 mb-2 sm:mb-3">🍎 iOS Features</h3>
          <div className="space-y-2 sm:space-y-3 text-green-800 text-sm sm:text-base">
            <div>
              <strong>Universal Links (applinks):</strong> Launch app directly from web links
            </div>
            <div>
              <strong>Handoff (activitycontinuation):</strong> Continue activities from Safari to app, across devices
            </div>
            <div>
              <strong>Password AutoFill (webcredentials):</strong> Auto-fill passwords saved in Safari into the app
            </div>
            <div className="text-xs sm:text-sm bg-green-100 p-2 rounded mt-2">
              💡 <strong>Default configuration:</strong> All three features are included. Remove unnecessary features from the config file if needed.
            </div>
            <div className="mt-3 pt-3 border-t border-green-200">
              <a 
                href={APPLE_APP_SITE_ASSOCIATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-green-700 hover:text-green-900 underline flex items-center flex-wrap"
              >
                📚 Apple Developer Documentation: Associated Domains
                <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-1a1 1 0 10-2 0v1H5V7h1a1 1 0 000-2H5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
