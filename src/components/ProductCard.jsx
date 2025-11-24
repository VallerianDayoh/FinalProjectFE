import { ShoppingCart } from 'lucide-react';
import Button from './Button';

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 border border-border/50">
      
      {/* Section: Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full shadow-lg">
            {product.category}
          </span>
        </div>
      </div>
      
      {/* Section: Content */}
      <div className="p-6 space-y-3">
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {product.description}
        </p>
        
        {/* Section: Price & Button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold text-primary">
            {product.price}
          </span>
          <Button 
            variant="accent" 
            size="sm"
            className="group-hover:scale-105 transition-transform"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
