'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
export const dynamic = 'force-dynamic';
interface PaymentStatus {
  status: string;
  raw?: any;
  foundAt?: string;
  error?: string;
}

export default function CheckoutSuccess() {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  // Get payment ID from URL parameters
  const paymentId =
    searchParams.get('payment_id') || searchParams.get('paymentId');

  useEffect(() => {
    if (!paymentId) {
      setPaymentStatus({ status: 'error', error: 'No payment ID provided' });
      setLoading(false);
      return;
    }

    // Verify payment status
    const verifyPayment = async () => {
      try {
        const response = await fetch(
          `/api/verify-payment?paymentId=${paymentId}`
        );
        const data = await response.json();

        if (response.ok) {
          setPaymentStatus(data);
        } else {
          setPaymentStatus({
            status: 'error',
            error: data.error || 'Failed to verify payment',
          });
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setPaymentStatus({
          status: 'error',
          error: 'Network error during payment verification',
        });
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [paymentId]);

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

  if (!paymentId) {
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Invalid Request
          </h1>
          <p className="text-gray-600 mb-6">
            No payment ID was provided in the URL.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }

  if (paymentStatus?.status === 'succeeded') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center bg-white p-8 rounded-lg shadow-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. Your payment has been processed
            successfully.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-500">Payment ID</p>
            <p className="font-mono text-sm text-gray-900 break-all">
              {paymentId}
            </p>
          </div>
          <div className="space-y-3">
            <a
              href={`/api/download?paymentId=${paymentId}`}
              className="block w-full px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md text-center"
            >
              Download Boilerplate
            </a>

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

  if (
    paymentStatus?.status === 'processing' ||
    paymentStatus?.status === 'pending'
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center bg-white p-8 rounded-lg shadow-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-yellow-600 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Processing
          </h1>
          <p className="text-gray-600 mb-4">
            Your payment is being processed. Please wait while we confirm the
            transaction.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-500">Payment ID</p>
            <p className="font-mono text-sm text-gray-900 break-all">
              {paymentId}
            </p>
          </div>
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

  // Error or failed payment
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Issue</h1>
        <p className="text-gray-600 mb-4">
          {paymentStatus?.error ||
            'There was an issue with your payment. Please try again.'}
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-500">Payment ID</p>
          <p className="font-mono text-sm text-gray-900 break-all">
            {paymentId}
          </p>
        </div>
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="block w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Try Again
          </button>
          <a
            href="/checkout"
            className="block w-full px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Return to Checkout
          </a>
        </div>
      </div>
    </div>
  );
}
