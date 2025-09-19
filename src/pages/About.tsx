import { Link } from 'react-router-dom';
import { Zap, Shield, Search, Code, Database, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const About = () => {
  const technologies = [
    {
      name: 'React & TypeScript',
      description: 'Modern React with full TypeScript support for type-safe development',
      icon: Code
    },
    {
      name: 'NestJS Backend',
      description: 'Production-ready Node.js backend with comprehensive API endpoints',
      icon: Database
    },
    {
      name: 'Real-time Scraping',
      description: 'Crawlee + Playwright for ethical, efficient data extraction',
      icon: Globe
    },
    {
      name: 'PostgreSQL',
      description: 'Robust relational database with proper indexing and relationships',
      icon: Database
    },
    {
      name: 'Tailwind CSS',
      description: 'Utility-first CSS framework for rapid, responsive design',
      icon: Code
    },
    {
      name: 'React Query',
      description: 'Powerful data fetching with caching, background updates, and optimistic UI',
      icon: Zap
    }
  ];

  const features = [
    {
      title: 'Real-Time Data Integration',
      description: 'Live scraping from World of Books ensures current inventory, pricing, and availability',
      icon: Zap
    },
    {
      title: 'Production Architecture',
      description: 'Enterprise-grade backend with proper error handling, validation, and resource management',
      icon: Shield
    },
    {
      title: 'Intelligent Discovery',
      description: 'Advanced search, filtering, and recommendation systems for optimal book discovery',
      icon: Search
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{ background: 'var(--gradient-hero)' }}
        />
        <div className="container mx-auto text-center relative z-10">
          <h1 className="heading-xl text-foreground mb-6">
            About Our Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            A production-minded product exploration platform built with modern technologies 
            and real-time data integration. Discover millions of books through intelligent 
            navigation powered by live scraping from World of Books.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We believe in making book discovery effortless and intelligent. Our platform bridges 
              the gap between vast online inventories and personalized user experiences through 
              cutting-edge technology and thoughtful design.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {features.map((feature) => (
                <div key={feature.title} className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-primary shadow-glow flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="heading-sm text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-foreground mb-4">Technical Architecture</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with enterprise-grade technologies for scalability, performance, and reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech) => (
              <div key={tech.name} className="card-interactive">
                <div className="flex items-center space-x-3 mb-3">
                  <tech.icon className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold text-foreground">{tech.name}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="heading-lg text-foreground mb-8 text-center">System Architecture</h2>
          
          <div className="space-y-8">
            <div className="card-interactive">
              <h3 className="heading-sm text-foreground mb-4">Frontend Layer</h3>
              <p className="text-muted-foreground leading-relaxed">
                React application with TypeScript, featuring responsive design with Tailwind CSS, 
                client-side data fetching with React Query, and comprehensive routing with React Router. 
                Optimized for both desktop and mobile experiences with WCAG AA accessibility compliance.
              </p>
            </div>

            <div className="card-interactive">
              <h3 className="heading-sm text-foreground mb-4">Backend Services</h3>
              <p className="text-muted-foreground leading-relaxed">
                NestJS-powered API with RESTful endpoints, comprehensive DTO validation, 
                robust error handling, and PostgreSQL database integration. Features include 
                rate limiting, caching strategies, and queue-based scraping jobs for scalability.
              </p>
            </div>

            <div className="card-interactive">
              <h3 className="heading-sm text-foreground mb-4">Data Collection</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ethical web scraping using Crawlee and Playwright with respect for robots.txt, 
                intelligent rate limiting, exponential backoff, and comprehensive error handling. 
                Data deduplication and caching minimize external requests while ensuring freshness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="heading-lg text-foreground mb-6">Ready to Explore?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your book discovery journey with our intelligent platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/categories">
              <Button size="lg" className="btn-primary">
                Browse Categories
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;