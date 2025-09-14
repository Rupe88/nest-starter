'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import { globalFetch } from '@/shared/utils/globalFetch';
import { ProductListResponse } from '@/types/dodo';

const NestStarterBuyButton: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [nestStarterProduct, setNestStarterProduct] =
    useState<ProductListResponse | null>(null);

  // Fetch the Nest Starter product on component mount
  useEffect(() => {
    const fetchNestStarter = async () => {
      try {
        const products = (await globalFetch(
          '/api/products'
        )) as ProductListResponse[];
        // Find the Nest Starter product (adjust the filter based on your product name/id)
        const nestStarter = products.find(
          (product) =>
            product.name?.toLowerCase().includes('nest starter') ||
            product.name?.toLowerCase().includes('nestboost')
        );
        setNestStarterProduct(nestStarter || products[0]); // Fallback to first product
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchNestStarter();
  }, []);

  const handlePayClick = async () => {
    if (!nestStarterProduct) {
      console.error('Nest Starter Product not found');
      return;
    }

    setLoading(true);
    console.log('Initiating payment for:', nestStarterProduct.name);

    try {
      const body = await globalFetch<{ payment_link: string }>(
        '/api/checkout/one-time',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'chyrupesh828@gmail.com', // You might want to get this from user input or auth
            productId: nestStarterProduct.product_id,
          }),
        }
      );

      console.log('Payment API response:', body);

      if (body.payment_link) {
        console.log('Redirecting to payment:', body.payment_link);
        router.push(body.payment_link);
      } else {
        console.error('Payment link not found in response:', body);
        alert('Unable to process payment. Please try again.');
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show loading or disabled state if product not loaded
  if (!nestStarterProduct) {
    return (
      <Button
        size="lg"
        className="text-lg px-8 bg-primary hover:bg-primary/90"
        disabled
      >
        <CreditCard className="h-5 w-5 mr-2" />
        Loading...
      </Button>
    );
  }

  return (
    <Button
      size="lg"
      className="text-lg px-8 bg-primary hover:bg-primary/90"
      onClick={handlePayClick}
      disabled={loading}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="h-5 w-5 mr-2" />
          Get Instant Access
        </>
      )}
    </Button>
  );
};

export default NestStarterBuyButton;
