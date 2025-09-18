'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SuccessPage() {
  const params = useSearchParams();
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const paymentId = params.get('payment_id');
    if (paymentId) {
      fetch(`/api/verify-payment?paymentId=${paymentId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 'succeeded') {
            setVerified(true);
          } else {
            setVerified(false);
          }
        })
        .catch(() => setVerified(false));
    }
  }, [params]);

  if (verified === null) return <p>⏳ Verifying payment...</p>;
  if (!verified) return <p>❌ Payment not verified. Please contact support.</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">✅ Payment Successful!</h1>
      <p className="mb-6">Thank you for your purchase.</p>
      <a
        href="/downloads/nest-starter.zip"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        download
      >
        Download Your Product
      </a>
    </div>
  );
}
