import QRCodeButton from './qr-code-button'

interface CustomPathFormProps {
  baseUrl: string
  customPath: string
  onPathChange: (path: string) => void
}

export default function CustomPathForm({ 
  baseUrl, 
  customPath, 
  onPathChange 
}: CustomPathFormProps) {
  const customUrl = customPath ? `${baseUrl}${customPath}` : `${baseUrl}/test`

  return (
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
            onChange={(e) => onPathChange(e.target.value)}
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
          <QRCodeButton 
            url={customUrl}
            title="Generate QR Code for Custom Path"
            className="px-4 py-3 bg-blue-100 hover:bg-blue-200"
          />
        </div>
      )}
    </div>
  )
}