// Utility function cn() langsung di sini (tanpa library)
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className,
  disabled,
  type = 'button',
  onClick,
  ...props 
}) => {
  // === STYLES MODERN & LUXURY SKINCARE PALETTE ===
  
  const baseStyles =
    'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed tracking-wide';

  const variants = {
    // Primary: Gold / Champagne
    primary:
      'bg-[#D4AF7F] text-[#FAF9F6] hover:bg-[#E0C097] shadow-lg shadow-[#D4AF7F]/30 transform active:scale-98',
    
    // Secondary: Soft Blush / Grey
    secondary:
      'bg-[#E6C6C6] text-[#2C2C2C] hover:bg-[#D7CACA] border border-[#D7CACA]',
    
    // Accent: Sage / Light Green
    accent:
      'bg-[#B7C5B6] text-[#FAF9F6] hover:bg-[#AABBA9] shadow-md',
      
    // Danger: Soft Red
    danger:
      'bg-[#F28C8C] text-[#FAF9F6] hover:bg-[#E76C6C] shadow-md shadow-[#F28C8C]/30',
      
    // Outline: Gold border
    outline:
      'border-2 border-[#D4AF7F] text-[#D4AF7F] hover:bg-[#FDF6EC] hover:text-[#B38D5D]',
      
    // Ghost: Subtle hover effect
    ghost:
      'text-[#2C2C2C] hover:bg-[#FAF9F6] hover:text-[#D4AF7F] border border-transparent',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    // Size untuk icon-only
    icon: 'p-3 text-base rounded-full',
  };

  return (
    <button
      type={type}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
