import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Search } from 'lucide-react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

export const Home = () => {
  const { data: navigationData, isLoading } = useQuery({
    queryKey: ['navigation-headings'],
    queryFn: api.getNavigationHeadings
  });

  const navigationHeadings = navigationData?.data || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{ background: 'var(--gradient-hero)' }}
        />
        <div className="container mx-auto text-center relative z-10">
          <h1 className="heading-xl text-foreground mb-6 max-w-4xl mx-auto">
            Discover Millions of Books with
            <span className="block bg-gradient-primary bg-clip-text text-transparent mt-2">
              Real-Time Intelligence
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Navigate from categories to products with our production-ready platform. 
            Powered by live scraping from World of Books for the most current inventory.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/categories">
              <Button size="lg" className="btn-primary text-lg px-8 py-4">
                Explore Categories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/search">
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-4 border-primary/20 hover:bg-primary/5"
              >
                Advanced Search
                <Search className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-muted/50 px-4 py-2 rounded-full">
              <Zap className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium">Real-time Data</span>
            </div>
            <div className="flex items-center space-x-2 bg-muted/50 px-4 py-2 rounded-full">
              <Shield className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium">Production Ready</span>
            </div>
            <div className="flex items-center space-x-2 bg-muted/50 px-4 py-2 rounded-full">
              <Search className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium">Smart Discovery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Headings */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-foreground mb-4">Start Your Discovery</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our main categories to dive deep into curated collections
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <LoadingSkeleton className="h-32 w-full" />
                  <LoadingSkeleton variant="text" />
                  <LoadingSkeleton variant="text" className="w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {navigationHeadings.map((heading) => (
                <Link
                  key={heading.id}
                  to={`/categories/${heading.slug}`}
                  className="card-interactive group"
                >
                  <div className="mb-4">
                    <h3 className="heading-sm text-foreground mb-2 group-hover:text-primary transition-colors">
                      {heading.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      {heading.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-secondary">
                        {heading.categoryCount.toLocaleString()} categories
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-foreground mb-4">Why Choose Our Platform</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for production with enterprise-grade architecture and real-time data integration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-primary shadow-glow flex items-center justify-center">
                <Zap className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="heading-sm text-foreground">Real-Time Scraping</h3>
              <p className="text-muted-foreground leading-relaxed">
                Live data extraction from World of Books using Crawlee and Playwright for up-to-date inventory and pricing.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-primary shadow-glow flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="heading-sm text-foreground">Production Ready</h3>
              <p className="text-muted-foreground leading-relaxed">
                Enterprise architecture with NestJS backend, PostgreSQL database, and comprehensive error handling.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-primary shadow-glow flex items-center justify-center">
                <Search className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="heading-sm text-foreground">Intelligent Discovery</h3>
              <p className="text-muted-foreground leading-relaxed">
                Advanced search, filtering, and recommendation engine to help users find exactly what they're looking for.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;