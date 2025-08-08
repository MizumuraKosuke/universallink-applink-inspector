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
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Universal Link Inspector
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* iOS Configuration */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <span className="mr-2">🍎</span>
              iOS Universal Links
            </h2>
            
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Configuration URL:</h3>
              <code className="text-sm bg-gray-100 p-2 rounded block break-all text-blue-600">
                {baseUrl}/.well-known/apple-app-site-association
              </code>
            </div>

            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Configuration:</h3>
              <pre className="text-gray-700 text-sm bg-gray-100 p-4 rounded overflow-auto max-h-64">
                {iosConfig ? JSON.stringify(iosConfig, null, 2) : 'Loading...'}
              </pre>
            </div>
          </div>

          {/* Android Configuration */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <span className="mr-2">🤖</span>
              Android App Links
            </h2>
            
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Configuration URL:</h3>
              <code className="text-sm bg-gray-100 p-2 rounded block break-all text-green-600">
                {baseUrl}/.well-known/assetlinks.json
              </code>
            </div>

            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Configuration:</h3>
              <pre className="text-gray-700 text-sm bg-gray-100 p-4 rounded overflow-auto max-h-64">
                {androidConfig ? JSON.stringify(androidConfig, null, 2) : 'Loading...'}
              </pre>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">📋 Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Update the configuration files in <code className="bg-blue-100 px-1 rounded">public/.well-known/</code></li>
            <li>Replace <code className="bg-blue-100 px-1 rounded">TEAM_ID.BUNDLE_ID</code> with your iOS app ID</li>
            <li>Replace <code className="bg-blue-100 px-1 rounded">com.example.app</code> with your Android package name</li>
            <li>Add your SHA-256 certificate fingerprint for Android</li>
            <li>Test the URLs above in your mobile apps</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
