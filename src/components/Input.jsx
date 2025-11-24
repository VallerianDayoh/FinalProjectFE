// Utility: merge className seperti fungsi cn (tanpa harus import library lain)
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const Input = ({ 
  label,           // Label untuk input
  error,           // Error message
  type = 'text',   // Default type input
  textarea = false, // Jika true, gunakan <textarea>
  className,       // Custom styling
  required,        // Tanda * jika wajib
  ...props 
}) => {

  // Base styling untuk input & textarea
  const baseStyles =
    'w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200';

  // Memilih apakah memakai input atau textarea
  const Component = textarea ? 'textarea' : 'input';

  return (
    <div className="space-y-2">
      
      {/* Section: Label */}
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      {/* Section: Input / Textarea field */}
      <Component
        type={type}
        className={cn(
          baseStyles,
          textarea && 'min-h-[120px] resize-y',
          error && 'border-destructive focus:ring-destructive',
          className
        )}
        {...props}
      />

      {/* Section: Error message */}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default Input;
