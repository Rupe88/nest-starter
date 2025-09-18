'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, CreditCard } from 'lucide-react';

interface ProductCardProps {
  title?: string;
  description?: string;
  currency?: string;
  price?: number;
  originalPrice?: number;
  discount?: string;
  onPayClick: () => void;
  loading?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  onPayClick,
  loading = false,
}) => {
  return (
    <Card>
      <Button
        onClick={onPayClick}
        disabled={loading}
        
        size="lg"
        className=""
      >
        {loading ? (
          <>
            <div/>
            Processing...
          </>
        ) : (
          <>
            <CreditCard/>
            Get Instant Access
          </>
        )}
      </Button>
    </Card>
  );
};

export default ProductCard;
