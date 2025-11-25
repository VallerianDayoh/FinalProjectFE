// Rumagit, pranata vareliano


import { useState, useEffect, useRef } from 'react';
import { Sparkles, Search } from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import Input from '../components/Input';

import { getProducts } from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const productsRef = useRef(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      if (!Array.isArray(data)) return setProducts([]);
      const normalized = data.map((item) => ({
        id: item.id || item._id,
        title: item.title || '',
        category: item.category || 'Uncategorized',
        price: item.price || 0,
        description: item.description || '',
        image: item.image || '',
      }));
      setProducts(normalized);
    } catch (error) {
      console.error('Failed to load products:', error?.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const uniqueCategories = ['All', ...new Set(products.map((p) => p.category || 'Uncategorized'))];

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase();
    return (
      (product.title.toLowerCase().includes(search) || product.description.toLowerCase().includes(search)) &&
      (selectedCategory === 'All' || product.category === selectedCategory)
    );
  });

  const handleExploreClick = () => {
    if (productsRef.current) productsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar />

      {/* HERO SECTION FULLSCREEN */}
      <section className="min-h-screen flex items-center py-24 sm:py-32 bg-[#FDEFE8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#E6C6C6]/20 rounded-full">
              <Sparkles className="w-4 h-4 text-[#D4AF7F]" />
              <span className="text-sm font-medium text-[#8E8D8A]">Premium Skincare</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2C2C2C] leading-tight">
              Skincare that <span className="text-[#D4AF7F]">actually works</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#555555] max-w-2xl mx-auto">
              Discover science-backed formulations crafted for radiant, healthy skin. Premium ingredients, proven results.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button variant="primary" size="lg" className="bg-[#D4AF7F] hover:bg-[#E0C097]" onClick={handleExploreClick}>
                Explore Products
              </Button>
              <Button variant="outline" size="lg" className="border-[#D4AF7F] text-[#D4AF7F] hover:bg-[#E6C6C6]/30 hover:text-[#2C2C2C]">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="py-16 sm:py-20 flex-grow" ref={productsRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* HEADER */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2C2C2C] mb-4">Featured Products</h2>
            <p className="text-[#555555] max-w-2xl mx-auto">
              Curated collection of our best-selling skincare essentials
            </p>
          </div>

          {/* FILTERS */}
          <div className="max-w-4xl mx-auto mb-10 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8E8D8A]" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 border-[#C9B6C1] focus:ring-[#D4AF7F] focus:border-[#D4AF7F]"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {uniqueCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${selectedCategory === category
                      ? 'bg-[#D4AF7F] text-[#FAF9F6] shadow-md'
                      : 'bg-[#E6C6C6] text-[#2C2C2C] hover:bg-[#B7C5B6] hover:text-[#FAF9F6]'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* PRODUCT GRID */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-[#E6C6C6] rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-[#555555] text-lg">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
