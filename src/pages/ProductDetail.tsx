import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingBag, Share2, Heart, Package, Calendar, User, BookOpen } from 'lucide-react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/product/ProductCard';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

export const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();

  const { data: productData, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => api.getProduct(productId!),
    enabled: !!productId
  });

  const { data: reviewsData, isLoading: reviewsLoading } = useQuery({
    queryKey: ['product-reviews', productId],
    queryFn: () => api.getProductReviews(productId!),
    enabled: !!productId
  });

  const product = productData?.data;
  const reviews = reviewsData?.data || [];

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="heading-lg text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">Unable to load product details.</p>
          <Link to="/categories">
            <Button className="btn-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSkeleton className="h-8 w-32 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <LoadingSkeleton className="h-96 w-full" />
          <div className="space-y-4">
            <LoadingSkeleton className="h-8 w-3/4" />
            <LoadingSkeleton className="h-4 w-1/2" />
            <LoadingSkeleton className="h-12 w-full" />
            <LoadingSkeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link to="/categories" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Categories
        </Link>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden bg-muted">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-96 object-cover"
            />
            
            {discountPercentage > 0 && (
              <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-lg px-3 py-1">
                -{discountPercentage}%
              </Badge>
            )}
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <h1 className="heading-lg text-foreground mb-2">{product.title}</h1>
            {product.author && (
              <p className="text-lg text-muted-foreground">by {product.author}</p>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-5 w-5 ${i < Math.floor(product.ratingsAvg || 4) ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.ratingsAvg?.toFixed(1) || '4.0'} ({product.reviewsCount || 0} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-primary">
                £{product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xl text-muted-foreground line-through">
                  £{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Free delivery on orders over £25
            </p>
          </div>

          {/* Condition & Availability */}
          <div className="flex items-center space-x-4">
            {product.condition && (
              <Badge variant="secondary">
                {product.condition}
              </Badge>
            )}
            <span className={`text-sm font-medium ${product.availability ? 'text-secondary' : 'text-destructive'}`}>
              {product.availability ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="btn-primary flex-1"
              disabled={!product.availability}
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="mr-2 h-5 w-5" />
              Wishlist
            </Button>
            <Button variant="outline" size="lg">
              <Share2 className="mr-2 h-5 w-5" />
              Share
            </Button>
          </div>

          {/* Specifications */}
          <div className="space-y-4">
            <h3 className="heading-sm text-foreground">Product Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {product.publisher && (
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Publisher:</span>
                  <span className="text-foreground">{product.publisher}</span>
                </div>
              )}
              {product.publicationDate && (
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Published:</span>
                  <span className="text-foreground">
                    {new Date(product.publicationDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              {product.isbn && (
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">ISBN:</span>
                  <span className="text-foreground font-mono">{product.isbn}</span>
                </div>
              )}
              {product.pages && (
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Pages:</span>
                  <span className="text-foreground">{product.pages}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      {/* Description */}
      <div className="mb-12">
        <h2 className="heading-md text-foreground mb-6">Description</h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        </div>
      </div>

      <Separator className="my-12" />

      {/* Reviews */}
      <div className="mb-12">
        <h2 className="heading-md text-foreground mb-6">Customer Reviews</h2>
        
        {reviewsLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <LoadingSkeleton className="h-4 w-32" />
                <LoadingSkeleton className="h-16 w-full" />
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} 
                        />
                      ))}
                    </div>
                    <span className="font-medium text-foreground">{review.author}</span>
                    {review.verifiedPurchase && (
                      <Badge variant="secondary" className="text-xs">
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {review.text}
                </p>
                <div className="flex items-center mt-4 space-x-4">
                  <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Helpful ({review.helpfulVotes})
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator className="my-12" />

      {/* Recommendations */}
      {product.recommendations && product.recommendations.length > 0 && (
        <div>
          <h2 className="heading-md text-foreground mb-6">Recommended for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.recommendations.slice(0, 4).map((rec) => (
              <ProductCard key={rec.id} product={rec} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;