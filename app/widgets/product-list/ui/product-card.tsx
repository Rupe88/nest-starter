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
    <Card className="p-6 bg-card border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-lg">
      <Button
        onClick={onPayClick}
        disabled={loading}
        
        size="lg"
        className="w-full text-lg px-8 bg-primary hover:bg-primary/90 transition-colors"
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
    </Card>
  );
};

export default ProductCard;
