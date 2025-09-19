'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface PaymentStatus {
  status: string;
  raw?: any;
  error?: string;
  downloadToken?: string;
}

export default function CheckoutSuccess() {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get payment ID from URL params
  const paymentId =
    searchParams.get('payment_id') || searchParams.get('paymentId');

  useEffect(() => {
    if (!paymentId) {
      setPaymentStatus({ status: 'error', error: 'No payment ID provided' });
      setLoading(false);
      return;
    }

    const verifyAndGenerateToken = async () => {
      try {
        // 1️⃣ Verify payment
        const verifyRes = await fetch(
          `/api/verify-payment?paymentId=${paymentId}`
        );
        const verifyData = await verifyRes.json();

        if (!verifyRes.ok) {
          setPaymentStatus({
            status: 'error',
            error: verifyData.error || 'Failed to verify payment',
          });
          setLoading(false);
          return;
        }

        if (verifyData.status !== 'succeeded') {
          setPaymentStatus({ ...verifyData });
          setLoading(false);
          return;
        }

        // 2️⃣ Generate short-lived download token
        const tokenRes = await fetch('/api/generate-download-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId }),
        });
        const tokenData = await tokenRes.json();

        if (!tokenRes.ok) {
          setPaymentStatus({
            status: 'error',
            error: tokenData.error || 'Failed to generate download token',
          });
          setLoading(false);
          return;
        }

        // 3️⃣ Update state with download token
        setPaymentStatus({ ...verifyData, downloadToken: tokenData.token });

        // 4️⃣ Optional: remove payment_id from URL to avoid exposing it
        router.replace('/checkout/success'); // URL now only shows /checkout/success
      } catch (err) {
        console.error(err);
        setPaymentStatus({
          status: 'error',
          error: 'Network error during payment verification',
        });
      } finally {
        setLoading(false);
      }
    };

    verifyAndGenerateToken();
  }, [paymentId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (!paymentStatus) return null;

  if (paymentStatus.status === 'succeeded') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. Your payment has been processed
            successfully.
          </p>

          <div className="space-y-3">
            {paymentStatus.downloadToken ? (
              <a
                href={`/api/download?token=${paymentStatus.downloadToken}`}
                className="block w-full px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md text-center"
              >
                Download Boilerplate
              </a>
            ) : (
              <button
                className="block w-full px-4 py-2 text-sm font-medium text-white bg-gray-400 rounded-md"
                disabled
              >
                Generating Download Link...
              </button>
            )}

            <a
              href="/orders"
              className="block w-full px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View Orders
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Pending / Processing
  if (
    paymentStatus.status === 'processing' ||
    paymentStatus.status === 'pending'
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Processing
          </h1>
          <p className="text-gray-600 mb-4">
            Your payment is being processed. Please wait while we confirm the
            transaction.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Refresh Status
          </button>
        </div>
      </div>
    );
  }

  // Payment Error
return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md mx-auto text-center bg-white p-8 rounded-lg shadow-md">
      <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
        <svg
          className="w-8 h-8 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Download Issue</h1>
      <p className="text-gray-600 mb-4">
        {paymentStatus?.error ||
          'Your download link may have expired or there was an issue with your payment.'}
      </p>
      <p className="text-sm text-gray-500 mb-6">
        ⚠️ Note: Download links expire <strong>10 minutes</strong> after generation.
        If your link has expired, please contact us at{' '}
        <a
          href="mailto:chyrupesh828@gmail.com"
          className="text-blue-600 hover:underline"
        >
          chyrupesh828@gmail.com
        </a>{' '}
        for assistance.
      </p>
      <div className="space-y-3">
        <button
          onClick={() => window.location.reload()}
          className="block w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Try Again
        </button>
        <a
          href="/"
          className="block w-full px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Return to Home
        </a>
      </div>
    </div>
  </div>
);

}
