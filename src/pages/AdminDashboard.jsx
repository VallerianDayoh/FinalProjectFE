// Edit by Imanuel Walintukan
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Package, RefreshCw } from 'lucide-react';

import Navbar from '../components/Navbar';
import Button from '../components/Button';

import { getProducts, deleteProduct } from '../services/api';

// Palet Warna Mewah
const COLORS = {
  // Background / Base
  BASE_LIGHTEST: '#FAF9F6', 
  BASE_LIGHT: '#F5F1EC', 
  // Primary / Brand Accent
  ACCENT_GOLD: '#D4AF7F', 
  ACCENT_BLUSH: '#E6C6C6', 
  // Secondary / Support
  SUPPORT_TAUPE: '#8E8D8A', 
  // Text / Foreground
  TEXT_DARK: '#2C2C2C',
  TEXT_MEDIUM: '#555555',
  // CTA / Highlight
  CTA_SOFT_GOLD: '#E0C097', 
  CTA_PEACH: '#F7BFA1', 
};

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();

      if (!Array.isArray(data)) {
        setProducts([]);
      } else {
        const clean = data.map((item) => ({
          id: item.id || item._id,
          title: item.title || 'Untitled Product',
          category: item.category || 'Uncategorized',
          price: item.price !== undefined ? item.price : 0,
          description: item.description || 'No description available.',
          image: item.image || ''
        }));

        setProducts(clean);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      alert('Gagal memuat produk. Silakan coba lagi.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus produk "${title}"?`);

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      alert('Produk berhasil dihapus!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Gagal menghapus produk. Terjadi kesalahan.');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    // Base Background: #FAF9F6
    <div style={{ backgroundColor: COLORS.BASE_LIGHTEST }} className="min-h-screen">
      <Navbar /> 

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              {/* Text Dark: #2C2C2C, Aksen Gold: #D4AF7F */}
              <h1 style={{ color: COLORS.TEXT_DARK }} className="text-3xl sm:text-4xl font-extrabold mb-1">
                <span style={{ color: COLORS.ACCENT_GOLD }}>Admin</span> Dashboard
              </h1>
              {/* Text Medium: #555555 */}
              <p style={{ color: COLORS.TEXT_MEDIUM }} className="text-lg">Kelola semua produk Anda dengan mudah.</p>
            </div>

            <Link to="/admin/add">
              <Button 
                variant="primary" 
                size="md" 
                // CTA Soft Gold: #E0C097 (default) & #D4AF7F (hover)
                style={{ backgroundColor: COLORS.CTA_SOFT_GOLD }}
                className={`text-white shadow-lg transition duration-300 hover:opacity-90`} // Shadow akan disesuaikan
              >
                <Plus className="w-5 h-5 mr-2" />
                Tambah Produk Baru
              </Button>
            </Link>
          </div>
          
          {/* Divider: border-gray-200 -> warna yang lebih lembut/base */}
          <hr style={{ borderColor: COLORS.BASE_LIGHT }} className="mb-8" />
          
          {/* Main Content Area */}
          {loading ? (
            // Loading State: Menggunakan BASE_LIGHT untuk background elemen loading
            <div style={{ backgroundColor: 'white' }} className="rounded-xl shadow-xl p-8 border" >
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex space-x-4 items-center">
                    {/* Skeleton element: bg-gray-200 -> BASE_LIGHT */}
                    <div style={{ backgroundColor: COLORS.BASE_LIGHT }} className="w-16 h-16 rounded-lg animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div style={{ backgroundColor: COLORS.BASE_LIGHT }} className="h-4 rounded w-3/4 animate-pulse"></div>
                      <div style={{ backgroundColor: COLORS.BASE_LIGHT }} className="h-4 rounded w-1/2 animate-pulse"></div>
                    </div>
                    <div style={{ backgroundColor: COLORS.BASE_LIGHT }} className="h-8 w-16 rounded-full animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : products.length > 0 ? (
            // Products Table (Desktop) and List (Mobile)
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">

              {/* Desktop Table (lg breakpoint and up) */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full">
                  {/* Table Header: bg-blue-50 -> BASE_LIGHT, text-blue-600 -> TEXT_MEDIUM */}
                  <thead style={{ backgroundColor: COLORS.BASE_LIGHT }} className="border-b border-gray-200">
                    <tr>
                      <th style={{ color: COLORS.TEXT_MEDIUM }} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Image</th>
                      <th style={{ color: COLORS.TEXT_MEDIUM }} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Title</th>
                      <th style={{ color: COLORS.TEXT_MEDIUM }} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Category</th>
                      <th style={{ color: COLORS.TEXT_MEDIUM }} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Price</th>
                      <th style={{ color: COLORS.TEXT_MEDIUM }} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Description</th>
                      <th style={{ color: COLORS.TEXT_MEDIUM }} className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {products.map((product) => (
                      // Hover: bg-blue-50/50 -> BASE_LIGHT/50
                      <tr key={product.id} style={{ '--tw-bg-opacity': 0.5 }} className={`hover:bg-[${COLORS.BASE_LIGHT}] transition-colors`}>
                        <td className="px-6 py-4">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-16 h-16 rounded-lg object-cover shadow-md border border-gray-100"
                            onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder-image.jpg'; }}
                          />
                        </td>

                        {/* Text Dark: #2C2C2C */}
                        <td style={{ color: COLORS.TEXT_DARK }} className="px-6 py-4 font-medium max-w-xs truncate">{product.title}</td>

                        <td className="px-6 py-4">
                          {/* Category Badge: bg-blue-100/text-blue-700 -> ACCENT_BLUSH/TEXT_DARK */}
                          <span style={{ backgroundColor: COLORS.ACCENT_BLUSH, color: COLORS.TEXT_DARK }} className="px-3 py-1 text-xs font-medium rounded-full">
                            {product.category}
                          </span>
                        </td>

                        {/* Price: text-blue-600 -> ACCENT_GOLD */}
                        <td style={{ color: COLORS.ACCENT_GOLD }} className="px-6 py-4 font-bold">{formatPrice(product.price)}</td>

                        {/* Text Medium: #555555 */}
                        <td style={{ color: COLORS.TEXT_MEDIUM }} className="px-6 py-4 text-sm max-w-xs truncate">
                          {product.description}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end space-x-2">
                            <Link to={`/admin/edit/${product.id}`}>
                              {/* Edit Button: text-blue-500/hover:bg-blue-100 -> ACCENT_GOLD/BASE_LIGHT */}
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                style={{ color: COLORS.ACCENT_GOLD }} 
                                className={`hover:bg-[${COLORS.BASE_LIGHT}] transition-colors`}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                            </Link>

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(product.id, product.title)}
                              // Delete Button: text-red-500/hover:bg-red-100 -> SUPPORT_TAUPE/BASE_LIGHT
                              style={{ color: COLORS.SUPPORT_TAUPE }} 
                              className={`hover:bg-[${COLORS.BASE_LIGHT}] transition-colors`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile List (Less than lg breakpoint) */}
              <div className="lg:hidden divide-y divide-gray-100">
                {products.map((product) => (
                  // Hover: bg-blue-50/50 -> BASE_LIGHT/50
                  <div key={product.id} className={`p-4 space-y-3 bg-white hover:bg-[${COLORS.BASE_LIGHT}] transition-colors`}>
                    <div className="flex space-x-4 items-start">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0 shadow-md border border-gray-100"
                        onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder-image.jpg'; }}
                      />

                      <div className="flex-1 min-w-0">
                        {/* Text Dark: #2C2C2C */}
                        <h3 style={{ color: COLORS.TEXT_DARK }} className="font-bold mb-1 truncate">{product.title}</h3>

                        {/* Category Badge: bg-blue-100/text-blue-700 -> ACCENT_BLUSH/TEXT_DARK */}
                        <span style={{ backgroundColor: COLORS.ACCENT_BLUSH, color: COLORS.TEXT_DARK }} className="inline-block px-2 py-1 text-xs font-medium rounded-full mb-2">
                          {product.category}
                        </span>

                        {/* Price: text-blue-600 -> ACCENT_GOLD */}
                        <p style={{ color: COLORS.ACCENT_GOLD }} className="font-bold text-lg">{formatPrice(product.price)}</p>
                      </div>
                    </div>

                    {/* Text Medium: #555555 */}
                    <p style={{ color: COLORS.TEXT_MEDIUM }} className="text-sm line-clamp-2">{product.description}</p>

                    <div className="flex space-x-3 pt-2">
                      <Link to={`/admin/edit/${product.id}`} className="flex-1">
                        {/* Edit Button: bg-blue-50/text-blue-600/hover:bg-blue-100 -> BASE_LIGHT/ACCENT_GOLD/BASE_LIGHT */}
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          style={{ backgroundColor: COLORS.BASE_LIGHT, color: COLORS.ACCENT_GOLD, borderColor: COLORS.BASE_LIGHT }}
                          className={`w-full hover:opacity-80 border`}
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </Link>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(product.id, product.title)}
                        // Delete Button: bg-red-500/hover:bg-red-600 -> SUPPORT_TAUPE/TEXT_DARK
                        style={{ backgroundColor: COLORS.SUPPORT_TAUPE, color: COLORS.F8F8F8 }} 
                        className={`flex-1 hover:opacity-80`}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Empty State
            <div className="bg-white rounded-xl shadow-xl p-12 text-center border border-gray-100">
              {/* Icon: text-blue-400 -> ACCENT_GOLD */}
              <Package style={{ color: COLORS.ACCENT_GOLD }} className="w-16 h-16 mx-auto mb-4" />
              {/* Text Dark: #2C2C2C */}
              <h3 style={{ color: COLORS.TEXT_DARK }} className="text-2xl font-bold mb-2">Belum ada produk</h3>
              {/* Text Medium: #555555 */}
              <p style={{ color: COLORS.TEXT_MEDIUM }} className="mb-6">Tambahkan produk pertama Anda untuk mulai mengelola inventaris.</p>

              <Link to="/admin/add">
                <Button 
                  variant="primary"
                  // CTA Soft Gold: #E0C097
                  style={{ backgroundColor: COLORS.CTA_SOFT_GOLD }}
                  className={`text-white shadow-lg transition duration-300 hover:opacity-90`}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Tambahkan Produk Pertama
                </Button>
              </Link>
              <button 
                onClick={loadProducts} 
                // Refresh Link: text-blue-600 -> ACCENT_GOLD
                style={{ color: COLORS.ACCENT_GOLD }}
                className="mt-4 ml-4 hover:text-opacity-80 transition duration-150 flex items-center justify-center mx-auto"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Refresh
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;