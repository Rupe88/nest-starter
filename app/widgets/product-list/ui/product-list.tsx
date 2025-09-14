'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { globalFetch } from '@/shared/utils/globalFetch';
import ProductCard from './product-card';
import { ProductListResponse } from '@/types/dodo';

interface ProductListProps {
  products: ProductListResponse[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const router = useRouter();

  const handlePayClick = async (product: ProductListResponse) => {
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

      if (body.payment_link) {
        router.push(body.payment_link);
        console.log('Payment initiated:', body);
      } else {
        console.error('Payment link not found', body);
      }
    } catch (err) {
      console.error('Payment error:', err);
    }
  };

  return (
    <div>
      {products.map((product) => (
        <ProductCard
          key={product.product_id}
          title={product.name}
          description={product.description}
          currency={product.currency}
          price={product.price}
          onPayClick={() => handlePayClick(product)}
        />
      ))}
    </div>
  );
};

export default ProductList;
