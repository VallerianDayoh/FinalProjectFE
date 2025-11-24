import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, LayoutDashboard } from 'lucide-react';
import Button from './Button';

// Utility className merger (pengganti cn tanpa perlu install library)
const cn = (...classes) => classes.filter(Boolean).join(" ");

const Navbar = () => {
  const location = useLocation();

  // Mengecek apakah link sedang aktif
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Section: Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
              GlowCart
            </span>
          </Link>

          {/* Section: Navigation Links */}
          <div className="flex items-center space-x-2 sm:space-x-4">

            {/* Link: Shop */}
            <Link
              to="/"
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all duration-200",
                isActive('/') 
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              Shop
            </Link>

            {/* Link: Admin */}
            <Link
              to="/admin"
              className={cn(
                "hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
                isActive('/admin') || location.pathname.startsWith('/admin')
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Admin</span>
            </Link>

            {/* Button: Shop Now */}
            <Button variant="accent" size="sm" className="hidden sm:inline-flex">
              Shop Now
            </Button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
