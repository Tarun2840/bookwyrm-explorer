// Core domain types for World of Books platform

export interface NavigationHeading {
  id: string;
  title: string;
  slug: string;
  description?: string;
  categoryCount: number;
  lastScrapedAt: string;
}

export interface Category {
  id: string;
  navigationId: string;
  parentId?: string;
  title: string;
  slug: string;
  description?: string;
  productCount: number;
  imageUrl?: string;
  lastScrapedAt: string;
  subcategories?: Category[];
}

export interface Product {
  id: string;
  sourceId: string;
  title: string;
  author?: string;
  price: number;
  currency: string;
  originalPrice?: number;
  imageUrl: string;
  sourceUrl: string;
  condition?: 'New' | 'Used - Very Good' | 'Used - Good' | 'Used - Acceptable';
  availability: boolean;
  lastScrapedAt: string;
  categoryId?: string;
  categoryName?: string;
}

export interface ProductDetail extends Product {
  description: string;
  specifications: Record<string, any>;
  ratingsAvg: number;
  reviewsCount: number;
  publisher?: string;
  publicationDate?: string;
  isbn?: string;
  pages?: number;
  language?: string;
  recommendations: Product[];
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  text: string;
  helpfulVotes: number;
  verifiedPurchase: boolean;
  createdAt: string;
}

export interface ScrapeJob {
  id: string;
  targetUrl: string;
  targetType: 'navigation' | 'category' | 'product' | 'reviews';
  status: 'pending' | 'running' | 'completed' | 'failed';
  startedAt?: string;
  finishedAt?: string;
  errorLog?: string;
  progress?: number;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string[];
  rating?: number;
  author?: string;
  availability?: boolean;
  sortBy?: 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: PaginationData;
}