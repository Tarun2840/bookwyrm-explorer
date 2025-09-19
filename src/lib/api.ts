// Mock API service - simulates backend API calls
import { NavigationHeading, Category, Product, ProductDetail, Review, SearchFilters, ApiResponse } from './types';

// Mock data generators
const generateMockNavigationHeadings = (): NavigationHeading[] => [
  {
    id: '1',
    title: 'Books',
    slug: 'books',
    description: 'Explore millions of books across all genres',
    categoryCount: 847,
    lastScrapedAt: new Date().toISOString()
  },
  {
    id: '2', 
    title: "Children's Books",
    slug: 'childrens-books',
    description: 'Wonderful stories for young readers',
    categoryCount: 156,
    lastScrapedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Textbooks',
    slug: 'textbooks', 
    description: 'Academic and educational resources',
    categoryCount: 89,
    lastScrapedAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Fiction',
    slug: 'fiction',
    description: 'Immersive stories and novels',
    categoryCount: 234,
    lastScrapedAt: new Date().toISOString()
  }
];

const generateMockCategories = (navigationId: string): Category[] => [
  {
    id: 'cat-1',
    navigationId,
    title: 'Science Fiction & Fantasy',
    slug: 'sci-fi-fantasy',
    description: 'Explore otherworldly adventures',
    productCount: 12847,
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400',
    lastScrapedAt: new Date().toISOString()
  },
  {
    id: 'cat-2',
    navigationId,
    title: 'Mystery & Thrillers',
    slug: 'mystery-thrillers',
    description: 'Suspenseful page-turners',
    productCount: 8956,
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    lastScrapedAt: new Date().toISOString()
  },
  {
    id: 'cat-3',
    navigationId,
    title: 'Romance',
    slug: 'romance',
    description: 'Love stories and romantic fiction',
    productCount: 6734,
    imageUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400',
    lastScrapedAt: new Date().toISOString()
  },
  {
    id: 'cat-4',
    navigationId,
    title: 'Biography & Autobiography',
    slug: 'biography',
    description: 'Real life stories and memoirs',
    productCount: 4521,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    lastScrapedAt: new Date().toISOString()
  }
];

const generateMockProducts = (categoryId?: string): Product[] => [
  {
    id: 'prod-1',
    sourceId: 'wob-12345',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    price: 8.99,
    currency: 'GBP',
    originalPrice: 14.99,
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300',
    sourceUrl: 'https://worldofbooks.com/product/12345',
    condition: 'Used - Very Good',
    availability: true,
    lastScrapedAt: new Date().toISOString(),
    categoryId: categoryId || 'cat-1',
    categoryName: 'Fiction'
  },
  {
    id: 'prod-2',
    sourceId: 'wob-67890',
    title: 'Dune: The Complete Series',
    author: 'Frank Herbert',
    price: 24.99,
    currency: 'GBP',
    originalPrice: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300',
    sourceUrl: 'https://worldofbooks.com/product/67890',
    condition: 'New',
    availability: true,
    lastScrapedAt: new Date().toISOString(),
    categoryId: categoryId || 'cat-1',
    categoryName: 'Science Fiction'
  }
];

const generateMockProductDetail = (productId: string): ProductDetail => ({
  ...generateMockProducts()[0],
  id: productId,
  description: `This captivating novel tells the riveting and unforgettable story of one of Hollywood's most iconic figures. A testament to the power of ambition, love, and the price of fame.

From the outside, it looks like Evelyn Hugo is living the Hollywood dream. But behind the glamour and the fame lies a story of passion, sacrifice, and secrets that will leave you questioning everything you thought you knew about love and loyalty.

This beautifully written novel explores themes of identity, love, and the cost of success in a way that will stay with you long after you turn the final page.`,
  specifications: {
    publisher: 'Atria Books',
    publicationDate: '2017-06-13',
    isbn: '9781501139239',
    pages: 400,
    language: 'English',
    dimensions: '5.31 x 0.91 x 8.00 inches',
    weight: '0.75 pounds'
  },
  ratingsAvg: 4.6,
  reviewsCount: 847,
  recommendations: generateMockProducts().slice(1)
});

// API simulation functions
export const api = {
  // Navigation endpoints
  async getNavigationHeadings(): Promise<ApiResponse<NavigationHeading[]>> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return {
      success: true,
      data: generateMockNavigationHeadings()
    };
  },

  // Category endpoints  
  async getCategories(navigationId: string): Promise<ApiResponse<Category[]>> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      success: true,
      data: generateMockCategories(navigationId)
    };
  },

  async getCategory(slug: string): Promise<ApiResponse<Category>> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const categories = generateMockCategories('1');
    const category = categories.find(cat => cat.slug === slug);
    
    if (!category) {
      return { success: false, error: 'Category not found' };
    }

    return { success: true, data: category };
  },

  // Product endpoints
  async getProducts(
    categoryId?: string, 
    filters?: SearchFilters,
    page = 1,
    limit = 20
  ): Promise<ApiResponse<Product[]>> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Generate more products for pagination demo
    const allProducts = Array.from({ length: 100 }, (_, i) => ({
      ...generateMockProducts(categoryId)[i % 2],
      id: `prod-${i + 1}`,
      title: `${generateMockProducts()[i % 2].title} ${i + 1}`,
    }));

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const products = allProducts.slice(startIndex, endIndex);

    return {
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total: allProducts.length,
        totalPages: Math.ceil(allProducts.length / limit)
      }
    };
  },

  async getProduct(productId: string): Promise<ApiResponse<ProductDetail>> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      success: true,
      data: generateMockProductDetail(productId)
    };
  },

  async searchProducts(query: string, filters?: SearchFilters): Promise<ApiResponse<Product[]>> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const products = generateMockProducts().filter(product => 
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.author?.toLowerCase().includes(query.toLowerCase())
    );

    return {
      success: true,
      data: products
    };
  },

  // Reviews endpoint
  async getProductReviews(productId: string): Promise<ApiResponse<Review[]>> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const mockReviews: Review[] = [
      {
        id: 'rev-1',
        productId,
        author: 'BookLover23',
        rating: 5,
        text: 'Absolutely phenomenal read! Could not put it down. The storytelling is masterful and the characters feel incredibly real.',
        helpfulVotes: 24,
        verifiedPurchase: true,
        createdAt: new Date('2024-01-15').toISOString()
      },
      {
        id: 'rev-2', 
        productId,
        author: 'ReadingAddict',
        rating: 4,
        text: 'Really enjoyed this book. Great character development and an engaging plot that kept me hooked throughout.',
        helpfulVotes: 18,
        verifiedPurchase: true,
        createdAt: new Date('2024-01-10').toISOString()
      }
    ];

    return {
      success: true,
      data: mockReviews
    };
  }
};