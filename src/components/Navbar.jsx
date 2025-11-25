import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';

// Utility: merge className
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Reusable Button
const Button = ({ children, onClick, variant = 'primary', size = 'md', className = '', ...props }) => {
  let baseStyle = 'rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 disabled:opacity-60 disabled:cursor-not-allowed';

  if (size === 'lg') baseStyle += ' px-6 py-3 text-lg';
  else if (size === 'sm') baseStyle += ' px-4 py-2 text-sm';
  else baseStyle += ' px-5 py-2.5 text-base';

  if (variant === 'primary') baseStyle += ' bg-[#D4AF7F] text-[#FAF9F6] hover:bg-[#E0C097] focus:ring-[#D4AF7F]/50 shadow-md shadow-[#D4AF7F]/30';
  else if (variant === 'outline') baseStyle += ' border-2 border-[#D4AF7F] text-[#D4AF7F] bg-transparent hover:bg-[#FDF6EC] hover:text-[#B38D5D] focus:ring-[#D4AF7F]/50';
  else if (variant === 'secondary') baseStyle += ' bg-[#E6C6C6] text-[#2C2C2C] hover:bg-[#D7CACA] focus:ring-[#D7CACA]/50';

  return (
    <button className={`${baseStyle} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

// Premium Navbar
const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF9F6]/95 backdrop-blur-lg border-b border-[#E6C6C6] shadow-x1">
      <div className="container mx-auto px-6 lg:px-12 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">

          {/* Logo Only Name */}
          <Link to="/" className="text-3xl font-extrabold text-[#2C2C2C] tracking-wide">
            GlowCare
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6">
            <Link
              to="/"
              className={cn(
                "px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300",
                isActive('/') 
                  ? "text-[#D4AF7F] bg-[#FDF6EC]" 
                  : "text-[#2C2C2C] hover:text-[#D4AF7F] hover:bg-[#FFF7E8]"
              )}
            >
              Shop
            </Link>

            <Link
              to="/about"
              className={cn(
                "px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300",
                isActive('/about') 
                  ? "text-[#D4AF7F] bg-[#FDF6EC]" 
                  : "text-[#2C2C2C] hover:text-[#D4AF7F] hover:bg-[#FFF7E8]"
              )}
            >
              About
            </Link>

            <Link
              to="/admin"
              className={cn(
                "flex items-center space-x-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300",
                isActive('/admin') || isAdminRoute 
                  ? "text-[#D4AF7F] bg-[#FDF6EC]" 
                  : "text-[#2C2C2C] hover:text-[#D4AF7F] hover:bg-[#FFF7E8]"
              )}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Admin Dashboard</span>
            </Link>

            <Button variant="primary" size="md" className="hidden md:inline-flex">
              View Cart
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
