// Utility: merge class names without extra libraries
const cn = (...classes) => classes.filter(Boolean).join(" ");

const Input = ({
  label,        // Label for the input
  error,        // Error message
  type = "text", // Default input type
  textarea = false, // If true, renders a <textarea>
  className,    // Additional custom class names
  required,     // Show * for required fields
  ...props
}) => {
  // Base styles for both input and textarea
  const baseStyles = `
    w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-xl
    placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
    focus:border-blue-500 transition-all duration-300 shadow-sm
  `;

  // Determine the element type
  const Component = textarea ? "textarea" : "input";

  return (
    <div className="space-y-2">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input / Textarea */}
      <Component
        type={type}
        className={cn(
          baseStyles,
          textarea && "min-h-[120px] resize-y",
          error && "border-red-500 focus:ring-red-500 focus:border-red-500",
          className
        )}
        {...props}
      />

      {/* Error message */}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
