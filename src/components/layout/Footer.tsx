import { Link } from 'react-router-dom';
import { Book, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-primary shadow-card">
                <Book className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">World Explorer</h3>
                <p className="text-sm text-muted-foreground">Book Discovery</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover millions of books through our intelligent exploration platform powered by real-time data from World of Books.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Explore</h4>
            <nav className="space-y-2">
              <Link to="/categories" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Browse Categories
              </Link>
              <Link to="/search" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Advanced Search
              </Link>
              <Link to="/bestsellers" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Bestsellers
              </Link>
              <Link to="/new-arrivals" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                New Arrivals
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <nav className="space-y-2">
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Link to="/help" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Help Center
              </Link>
              <Link to="/api-docs" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                API Documentation
              </Link>
            </nav>
          </div>

          {/* Social & Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex space-x-3 mb-4">
              <a 
                href="https://github.com" 
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a 
                href="https://twitter.com" 
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
            <nav className="space-y-2">
              <Link to="/privacy" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 World Explorer. Built for production-ready book discovery.
            </p>
            <p className="text-sm text-muted-foreground">
              Powered by World of Books API • Real-time scraping technology
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};