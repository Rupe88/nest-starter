'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { globalFetch } from '@/shared/utils/globalFetch';
import ProductCard from './product-card';
import { Product, ProductListResponse } from '@/types/dodo';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products=[] }) => {
  const router = useRouter();

  const handlePayClick = async (product: Product) => {
    try {
      const body = await globalFetch<{ payment_link: string }>(
        '/api/checkout/one-time',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'chyrupesh828@gmail.com', // currently hardcoded
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

  const nestStarterProduct = products.find(
    (p) => p.product_id === 'pdt_38Q86HDiLR9HHeMh7Zshy'
  );

  if (!products.length) {
    return <div>No products available</div>; // 👈 safe fallback
  }

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
        />
      )}
    </div>
  );
};

export default ProductList;
