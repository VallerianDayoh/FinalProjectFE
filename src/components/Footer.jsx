// Import ikon dan komponen yang diperlukan
import { ShoppingBag, Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import Input from './Input';
import Button from './Button';

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Grid utama footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          
          {/* Section: Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">
                GlowCart
              </span>
            </Link>

            <p className="text-muted-foreground text-sm">
              Premium skincare products that work. Science-backed formulations for radiant, healthy skin.
            </p>

            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Section: Shop links */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">All Products</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Serums</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Moisturizers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Cleansers</a></li>
            </ul>
          </div>

          {/* Section: Support links */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Returns</a></li>
            </ul>
          </div>

          {/* Section: Newsletter form */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Stay Updated</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Get exclusive offers and skincare tips.
            </p>

            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Your email"
                className="text-sm"
              />
              <Button variant="primary" size="sm" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Section: Footer bottom text */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} GlowCart. All rights reserved. Skincare that works.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
