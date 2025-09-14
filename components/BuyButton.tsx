'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Paddle: any;
  }
}

interface BuyButtonProps {
  price?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function BuyButton({
  price = 'Buy Now',
  className = 'px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
  children,
}: BuyButtonProps) {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initializePaddle = async () => {
      if (!window.Paddle) {
        const script = document.createElement('script');
        script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
        script.async = true;

        script.onload = () => {
          try {
            window.Paddle?.Initialize({
              token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
              environment:
                process.env.PADDLE_ENV === 'production'
                  ? 'production'
                  : 'sandbox',
            });
            setReady(true);
          } catch (err) {
            console.error('Paddle setup failed', err);
          }
        };

        script.onerror = () => {
          console.error('Failed to load Paddle script');
        };

        document.head.appendChild(script);
      } else {
        setReady(true);
      }
    };

    initializePaddle();
  }, []);

  const handleCheckout = async () => {
    if (!ready || loading) return;

    setLoading(true);

    try {
      // Open Paddle checkout
      window.Paddle?.Checkout?.open({
        items: [
          {
            priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID,
            quantity: 1,
          },
        ],
        settings: {
          displayMode: 'overlay',
          theme: 'light',
          locale: 'en',
          successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={checkout.id}`,
          closeUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/error`,
        },
        customData: {
          timestamp: Date.now().toString(),
          source: 'website',
        },
      });
    } catch (error) {
      console.error('Checkout failed:', error);
      // Optionally redirect to error page
      window.location.href = '/error';
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={!ready || loading}
      className={className}
    >
      {loading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </span>
      ) : (
        children || price
      )}
    </button>
  );
}
