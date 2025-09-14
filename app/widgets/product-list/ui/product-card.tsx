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

const ProductCard: React.FC<ProductCardProps> = ({
  title = "NestBoost Starter Kit",
  description = "Production-ready NestJS boilerplate with 2FA authentication, Docker, TypeORM, and PostgreSQL",
  currency = "$",
  price = 149,
  originalPrice = 249,
  discount = "$100 off",
  onPayClick,
  loading = false,
}) => {
  return (
    <Card className="p-6 bg-card border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-lg">
      {/* Discount Badge */}
      {discount && (
        <Badge variant="secondary" className="w-fit mb-4 bg-accent/10 text-accent border-accent/20">
          <Zap className="h-3 w-3 mr-1" />
          {discount} - Limited Time
        </Badge>
      )}
      
      {/* Product Title */}
      <h2 className="text-2xl font-bold text-foreground mb-3">{title}</h2>
      
      {/* Description */}
      <p className="text-muted-foreground mb-6 text-pretty">{description}</p>
      
      {/* Pricing */}
      <div className="flex items-baseline gap-3 mb-6">
        <span className="text-3xl font-bold text-primary">
          {currency}{price}
        </span>
        {originalPrice && originalPrice > price && (
          <span className="text-lg text-muted-foreground line-through">
            {currency}{originalPrice}
          </span>
        )}
      </div>
      
      {/* Pay Button */}
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
      
      {/* Additional Info */}
      <p className="text-sm text-muted-foreground mt-3 text-center">
        15 days free access • One-time payment
      </p>
    </Card>
  );
};

export default ProductCard;