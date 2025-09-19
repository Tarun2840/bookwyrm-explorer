import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package } from 'lucide-react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { CategoryCard } from '@/components/category/CategoryCard';
import { CategoryGridSkeleton } from '@/components/ui/loading-skeleton';

export const Categories = () => {
  const { navigationSlug } = useParams();

  // For this demo, we'll use a fixed navigation ID
  const navigationId = '1';

  const { data: categoriesData, isLoading, error } = useQuery({
    queryKey: ['categories', navigationId],
    queryFn: () => api.getCategories(navigationId)
  });

  const categories = categoriesData?.data || [];

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="heading-lg text-foreground mb-4">Error Loading Categories</h1>
          <p className="text-muted-foreground mb-6">Unable to fetch category data.</p>
          <Link to="/">
            <Button className="btn-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="space-y-2">
          <h1 className="heading-lg text-foreground">Browse Categories</h1>
          <p className="text-lg text-muted-foreground">
            Discover books organized by genre, topic, and category
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      {isLoading ? (
        <CategoryGridSkeleton count={6} />
      ) : categories.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="heading-md text-foreground mb-2">No Categories Found</h2>
          <p className="text-muted-foreground">
            Categories are being scraped and will appear shortly.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button 
              variant="outline"
              size="lg"
              className="px-8"
            >
              Load More Categories
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Categories;