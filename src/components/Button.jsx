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
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-primary text-primary-foreground hover:bg-primary-light shadow-glow hover:shadow-lg',
    secondary:
      'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground',
    accent:
      'bg-accent text-accent-foreground hover:bg-accent-dark',
    danger:
      'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline:
      'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
    ghost:
      'text-foreground hover:bg-secondary',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
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
