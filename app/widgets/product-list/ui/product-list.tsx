'use client';

import React, { useState } from 'react';
import { globalFetch } from '@/shared/utils/globalFetch';
import ProductCard from './product-card';
import { Product } from '@/types/dodo';

interface ProductListProps {
  products?: Product[]; // optional to be safer
}

const ProductList: React.FC<ProductListProps> = ({ products = [] }) => {
  const [paymentLoading, setPaymentLoading] = useState<string | null>(null);

  const handlePayClick = async (product: Product) => {
    if (!product.product_id) {
      console.error('❌ Product ID missing:', product);
      alert('Product ID missing. Please contact support.');
      return;
    }

    setPaymentLoading(product.product_id);
    console.log('💳 Initiating payment for:', product.name);

    try {
      const body = await globalFetch<{ payment_link: string }>(
        '/api/checkout/one-time',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'chyrupesh828@gmail.com',
            productId: product.product_id,
          }),
        }
      );

      if (body?.payment_link) {
        window.location.href = body.payment_link;
      } else {
        alert('Unable to get payment link. Please try again.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      alert(`Payment failed: ${errorMessage}. Please try again.`);
    } finally {
      setPaymentLoading(null);
    }
  };

  if (!Array.isArray(products) || !products.length) {
    return <div>No products available</div>;
  }

  const nestStarterProduct = products.find(
    (p) => p.product_id === 'pdt_38Q86HDiLR9HHeMh7Zshy'
  );

  return (
    <div>
      {nestStarterProduct && (
        <ProductCard
          key={nestStarterProduct.product_id}
          title={nestStarterProduct.name}
          description={nestStarterProduct.description}
          currency={nestStarterProduct.currency}
          price={nestStarterProduct.price}
          onPayClick={() => handlePayClick(nestStarterProduct)}
          loading={paymentLoading === nestStarterProduct.product_id}
        />
      )}
    </div>
  );
};

export default ProductList;
