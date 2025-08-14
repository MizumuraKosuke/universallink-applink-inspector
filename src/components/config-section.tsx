interface ConfigSectionProps {
  title: string
  icon: string
  configUrl: string
  config: any
  loading?: boolean
}

export default function ConfigSection({ 
  title, 
  icon, 
  configUrl, 
  config, 
  loading = false 
}: ConfigSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 flex items-center">
        <span className="mr-2">{icon}</span>
        {title}
      </h2>
      
      <div className="mb-4">
        <h3 className="font-medium text-gray-700 mb-2 text-sm sm:text-base">Configuration URL:</h3>
        <code className="text-xs sm:text-sm bg-gray-100 p-2 rounded block break-all text-blue-600">
          {configUrl}
        </code>
      </div>

      <div className="mb-4">
        <h3 className="font-medium text-gray-700 mb-2 text-sm sm:text-base">Configuration:</h3>
        <pre className="text-gray-700 text-xs sm:text-sm bg-gray-100 p-2 sm:p-4 rounded overflow-auto max-h-48 sm:max-h-64">
          {loading ? 'Loading...' : JSON.stringify(config, null, 2)}
        </pre>
      </div>
    </div>
  )
}