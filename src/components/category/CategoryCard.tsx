import { Link } from 'react-router-dom';
import { ArrowRight, Package } from 'lucide-react';
import { Category } from '@/lib/types';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link 
      to={`/categories/${category.slug}/products`}
      className="group block"
    >
      <div className="card-interactive h-full">
        {/* Category Image */}
        <div className="relative mb-4 overflow-hidden rounded-lg bg-muted">
          {category.imageUrl ? (
            <img
              src={category.imageUrl}
              alt={category.title}
              className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-32 flex items-center justify-center bg-gradient-primary">
              <Package className="h-12 w-12 text-primary-foreground opacity-80" />
            </div>
          )}
        </div>

        {/* Category Info */}
        <div className="space-y-3">
          <div>
            <h3 className="heading-sm text-foreground group-hover:text-primary transition-colors">
              {category.title}
            </h3>
            {category.description && (
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {category.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Package className="h-4 w-4" />
              <span>{category.productCount.toLocaleString()} products</span>
            </div>
            
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>

          {/* Last Updated */}
          <div className="text-xs text-muted-foreground">
            Updated {new Date(category.lastScrapedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Link>
  );
};