'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

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
  const [customPath, setCustomPath] = useState<string>('')
  const [showQR, setShowQR] = useState<string | null>(null)
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')

  const generateQR = async (url: string) => {
    try {
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      })
      setQrCodeUrl(qrDataUrl)
      setShowQR(url)
    } catch (error) {
      console.error('QR Code generation failed:', error)
    }
  }

  const closeQR = () => {
    setShowQR(null)
    setQrCodeUrl('')
  }

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
                        const customUrl = customPath ? `${baseUrl}${customPath}` : configUrl
                        
                        return (
                          <div key={pathIndex} className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="text-xs text-gray-500 w-16 flex-shrink-0">Config:</div>
                              <a
                                href={`https://httpbin.org/redirect-to?url=${encodeURIComponent(configUrl)}`}
                                target="_blank"
                                className="text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 p-2 rounded break-all text-gray-600 hover:text-gray-800 transition-colors flex-1"
                              >
                                {configUrl}
                              </a>
                              <button
                                onClick={() => generateQR(configUrl)}
                                className="bg-gray-100 hover:bg-gray-200 p-2 rounded transition-colors flex-shrink-0"
                                title="Generate QR Code for Config Path"
                              >
                                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM19 13h-2v2h2v-2zM19 17h-2v2h2v-2zM17 15h-2v2h2v-2zM13 13h2v2h-2v-2zM15 15h2v2h-2v-2zM13 17h2v2h-2v-2z"/>
                                </svg>
                              </button>
                            </div>
                            <div className="w-full">
                              <div className="text-xs text-blue-600 mb-2">Custom Path:</div>
                              <div className="mb-2">
                                <div className="w-full border border-blue-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-400">
                                  <div className="bg-blue-50 px-3 py-2 text-xs text-blue-700 border-b border-blue-200">
                                    {baseUrl}
                                  </div>
                                  <input
                                    type="text"
                                    placeholder="/custom/path"
                                    value={customPath}
                                    onChange={(e) => setCustomPath(e.target.value)}
                                    className="w-full px-3 py-3 text-sm border-0 focus:outline-none focus:ring-0"
                                  />
                                </div>
                              </div>
                              {customPath && (
                                <div className="flex flex-col sm:flex-row gap-2">
                                  <a
                                    href={`https://httpbin.org/redirect-to?url=${encodeURIComponent(customUrl)}`}
                                    target="_blank"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors text-center flex-1"
                                  >
                                    Test Custom Path
                                  </a>
                                  <button
                                    onClick={() => generateQR(customUrl)}
                                    className="bg-blue-100 hover:bg-blue-200 px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                                    title="Generate QR Code for Custom Path"
                                  >
                                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM19 13h-2v2h2v-2zM19 17h-2v2h2v-2zM17 15h-2v2h2v-2zM13 13h2v2h-2v-2zM15 15h2v2h-2v-2zM13 17h2v2h-2v-2z"/>
                                    </svg>
                                    <span className="text-sm sm:hidden">QR</span>
                                  </button>
                                </div>
                              )}
                            </div>
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

        {/* QR Code Modal */}
        {showQR && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeQR}
          >
            <div 
              className="bg-white rounded-lg p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">QR Code</h3>
                <button
                  onClick={closeQR}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="text-center">
                {qrCodeUrl && (
                  <img 
                    src={qrCodeUrl} 
                    alt="QR Code" 
                    className="mx-auto mb-4"
                  />
                )}
                <p className="text-sm text-gray-600 break-all">
                  {showQR}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Scan with your mobile device
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
