'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sessionId = searchParams?.get('session_id');
  const transactionId = searchParams?.get('transaction_id');

  useEffect(() => {
    if (sessionId || transactionId) {
      // In a real implementation, you would:
      // 1. Call Paddle API to get transaction details
      // 2. Generate secure download link
      // 3. Send email with download instructions

      // For now, we'll simulate this process
      setTimeout(() => {
        setDownloadUrl('/api/download?token=sample-token');
        setLoading(false);
      }, 2000);
    } else {
      setError('No payment information found');
      setLoading(false);
    }
  }, [sessionId, transactionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <h1 className="text-2xl font-bold text-gray-900 mt-4">
              Processing Payment
            </h1>
            <p className="text-gray-600 mt-2">
              Please wait while we confirm your payment...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-4">
              Payment Error
            </h1>
            <p className="text-gray-600 mt-2">{error}</p>
            <a
              href="/"
              className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mt-2">
            Thank you for your purchase. Your download is ready.
          </p>

          <div className="mt-6 space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-blue-900">Next Steps:</h3>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• Check your email for download instructions</li>
                <li>• Your download link expires in 24 hours</li>
                <li>• Keep your receipt for your records</li>
              </ul>
            </div>

            {downloadUrl && (
              <a
                href={downloadUrl}
                className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
                download
              >
                Download Now
              </a>
            )}

            <a
              href="/"
              className="block w-full px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-center"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
