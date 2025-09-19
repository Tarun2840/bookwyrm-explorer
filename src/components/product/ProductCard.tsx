import { Link } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link 
      to={`/products/${product.id}`}
      className="group block"
    >
      <div className="card-interactive h-full">
        {/* Product Image */}
        <div className="relative mb-4 overflow-hidden rounded-lg bg-muted">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discountPercentage > 0 && (
              <Badge className="bg-destructive text-destructive-foreground">
                -{discountPercentage}%
              </Badge>
            )}
            {product.condition && product.condition !== 'New' && (
              <Badge variant="secondary" className="text-xs">
                {product.condition}
              </Badge>
            )}
          </div>

          {!product.availability && (
            <div className="absolute inset-0 bg-muted/80 flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            {product.author && (
              <p className="text-sm text-muted-foreground mt-1">by {product.author}</p>
            )}
          </div>

          {/* Category */}
          {product.categoryName && (
            <Badge variant="outline" className="text-xs">
              {product.categoryName}
            </Badge>
          )}

          {/* Rating placeholder */}
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} 
              />
            ))}
            <span className="text-sm text-muted-foreground ml-2">(24)</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-primary">
                £{product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-muted-foreground line-through">
                  £{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            <Button 
              size="sm" 
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/cart';
              }}
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};