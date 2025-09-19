import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'card' | 'text' | 'circle' | 'product';
}

export const LoadingSkeleton = ({ className, variant = 'card' }: LoadingSkeletonProps) => {
  const baseClasses = "animate-pulse-soft bg-muted rounded-lg";
  
  const variants = {
    card: "h-48 w-full",
    text: "h-4 w-3/4", 
    circle: "h-12 w-12 rounded-full",
    product: "h-64 w-full"
  };

  return (
    <div className={cn(baseClasses, variants[variant], className)} />
  );
};

export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="space-y-3">
        <LoadingSkeleton variant="product" />
        <LoadingSkeleton variant="text" className="h-3" />
        <LoadingSkeleton variant="text" className="h-3 w-1/2" />
        <LoadingSkeleton variant="text" className="h-4 w-1/4" />
      </div>
    ))}
  </div>
);

export const CategoryGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="space-y-4">
        <LoadingSkeleton className="h-40 w-full" />
        <LoadingSkeleton variant="text" className="h-4" />
        <LoadingSkeleton variant="text" className="h-3 w-2/3" />
      </div>
    ))}
  </div>
);