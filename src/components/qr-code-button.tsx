import { QRCODE_API_URL } from '@/constants'
import { useState } from 'react'
import Image from 'next/image'

interface QRCodeButtonProps {
  url: string
  title?: string
  className?: string
}

export default function QRCodeButton({ 
  url, 
  title = "Generate QR Code",
  className = "" 
}: QRCodeButtonProps) {
  const [showQR, setShowQR] = useState(false)

  const qrCodeUrl = `${QRCODE_API_URL}?url=${encodeURIComponent(url)}`

  return (
    <>
      <button
        onClick={() => setShowQR(true)}
        className={`bg-gray-100 hover:bg-gray-200 p-2 rounded transition-colors flex-shrink-0 ${className}`}
        title={title}
      >
        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM19 13h-2v2h2v-2zM19 17h-2v2h2v-2zM17 15h-2v2h2v-2zM13 13h2v2h-2v-2zM15 15h2v2h-2v-2zM13 17h2v2h-2v-2z"/>
        </svg>
      </button>

      {/* QR Code Modal */}
      {showQR && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowQR(false)}
        >
          <div 
            className="bg-white rounded-lg p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">QR Code</h3>
              <button
                onClick={() => setShowQR(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="text-center">
              {qrCodeUrl && (
                <Image 
                  src={qrCodeUrl} 
                  alt="QR Code" 
                  width={200}
                  height={200}
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
    </>
  )
}
