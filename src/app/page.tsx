'use client'

import { useEffect, useState } from 'react'

interface AppleAppSiteAssociation {
  applinks: {
    apps: string[]
    details: Array<{
      appID: string
      paths: string[]
    }>
  }
  activitycontinuation?: {
    apps: string[]
  }
  webcredentials?: {
    apps: string[]
  }
}

interface AssetLink {
  relation: string[]
  target: {
    namespace: string
    package_name: string
    sha256_cert_fingerprints: string[]
  }
}

export default function Home() {
  const [iosConfig, setIosConfig] = useState<AppleAppSiteAssociation | null>(null)
  const [androidConfig, setAndroidConfig] = useState<AssetLink[] | null>(null)
  const [baseUrl, setBaseUrl] = useState<string>('')

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
          <h2 className="text-xl font-semibold mb-4 text-gray-800">🚀 App Transition Test</h2>
          {iosConfig && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">iOS Universal Links</h3>
              <div className="space-y-2">
                {iosConfig.applinks.details.map((detail, index) => 
                  detail.paths.map((path, pathIndex) => (
                    <a
                      key={`${index}-${pathIndex}`}
                      href={`${baseUrl}${path === '*' ? '/test' : path}`}
                      className="text-sm bg-blue-50 hover:bg-blue-100 border border-blue-200 p-3 rounded break-all text-blue-600 hover:text-blue-800 transition-colors flex items-center justify-between"
                    >
                      <span>{baseUrl}{path === '*' ? '/test' : path}</span>
                      <div className="flex items-center ml-2">
                        <span className="text-xs bg-blue-200 px-2 py-1 rounded mr-2">
                          {detail.appID.split('.').pop()}
                        </span>
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12l-4-4h8l-4 4z"/>
                        </svg>
                      </div>
                    </a>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* iOS Configuration */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 flex items-center">
              <span className="mr-2">🍎</span>
              iOS Universal Links
            </h2>
            
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2 text-sm sm:text-base">Configuration URL:</h3>
              <code className="text-xs sm:text-sm bg-gray-100 p-2 rounded block break-all text-blue-600">
                {baseUrl}/.well-known/apple-app-site-association
              </code>
            </div>

            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2 text-sm sm:text-base">Configuration:</h3>
              <pre className="text-gray-700 text-xs sm:text-sm bg-gray-100 p-2 sm:p-4 rounded overflow-auto max-h-48 sm:max-h-64">
                {iosConfig ? JSON.stringify(iosConfig, null, 2) : 'Loading...'}
              </pre>
            </div>
          </div>

          {/* Android Configuration */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 flex items-center">
              <span className="mr-2">🤖</span>
              Android App Links
            </h2>
            
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2 text-sm sm:text-base">Configuration URL:</h3>
              <code className="text-sm bg-gray-100 p-2 rounded block break-all text-green-600">
                {baseUrl}/.well-known/assetlinks.json
              </code>
            </div>

            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2 text-sm sm:text-base">Configuration:</h3>
              <pre className="text-gray-700 text-xs sm:text-sm bg-gray-100 p-2 sm:p-4 rounded overflow-auto max-h-48 sm:max-h-64">
                {androidConfig ? JSON.stringify(androidConfig, null, 2) : 'Loading...'}
              </pre>
            </div>
          </div>
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
                href="https://developer.apple.com/documentation/bundleresources/entitlements/com.apple.developer.associated-domains"
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
  );
}
