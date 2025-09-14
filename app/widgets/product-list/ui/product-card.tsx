'use client';

import React from 'react';

interface ProductCardProps {
  title: string | null;
  description: string | null;
  currency: string | null;
  price: number | null;
  onPayClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  currency,
  price,
  onPayClick,
}) => {
  return (
    <div className="border p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p>{description}</p>
      <p>
        {currency} {price}
      </p>
      <button
        onClick={onPayClick}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Pay
      </button>
    </div>
  );
};

export default ProductCard;
