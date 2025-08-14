interface TestUrlButtonProps {
  url: string
  className?: string
}

export default function TestUrlButton({ url, className = "" }: TestUrlButtonProps) {
  return (
    <a
      href={`https://httpbin.org/redirect-to?url=${encodeURIComponent(url)}`}
      target="_blank"
      className={`text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 p-2 rounded break-all text-gray-600 hover:text-gray-800 transition-colors ${className}`}
    >
      {url}
    </a>
  )
}