import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Package } from 'lucide-react';

// Komponen reusable
import Button from '../components/Button';

// API Services
import { getProducts, deleteProduct } from '../services/api';

const AdminDashboard = () => {
  // ================================
  // STATE
  // ================================
  const [products, setProducts] = useState([]);  // Menyimpan daftar produk
  const [loading, setLoading] = useState(true);  // Loading indicator

  // ================================
  // LOAD PRODUCTS SAAT PERTAMA MASUK
  // ================================
  useEffect(() => {
    loadProducts();
  }, []);

  // ================================
  // FETCH ALL PRODUCTS
  // ================================
  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      alert(error.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // DELETE PRODUCT
  // ================================
  const handleDelete = async (id, title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${title}"? This action cannot be undone.`
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
      alert('Product deleted successfully');
    } catch (error) {
      alert(error.message || 'Failed to delete product');
    }
  };

  // ================================
  // RENDER UI
  // ================================
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* ================================
              PAGE HEADER
          ================================= */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your product catalog
              </p>
            </div>

            <Link to="/admin/add">
              <Button variant="primary" size="md">
                <Plus className="w-5 h-5 mr-2" />
                Add New Product
              </Button>
            </Link>
          </div>

          {/* ================================
              LOADING STATE
          ================================= */}
          {loading ? (
            <div className="bg-card rounded-2xl shadow-card p-8">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-16 bg-secondary rounded-lg animate-pulse"
                  />
                ))}
              </div>
            </div>
          ) : products.length > 0 ? (
            // ================================
            // PRODUCTS EXISTS
            // ================================
            <div className="bg-card rounded-2xl shadow-card overflow-hidden border border-border/50">

              {/* DESKTOP TABLE */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary border-b border-border">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Image</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Title</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Category</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Price</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Description</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-border">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-secondary/50 transition-colors">
                        <td className="px-6 py-4">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        </td>

                        <td className="px-6 py-4 font-medium text-foreground">
                          {product.title}
                        </td>

                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                            {product.category}
                          </span>
                        </td>

                        <td className="px-6 py-4 font-semibold text-primary">
                          {product.price}
                        </td>

                        <td className="px-6 py-4 text-muted-foreground text-sm max-w-md truncate">
                          {product.description}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end space-x-2">
                            <Link to={`/admin/edit/${product.id}`}>
                              <Button variant="ghost" size="sm">
                                <Edit2 className="w-4 h-4" />
                              </Button>
                            </Link>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(product.id, product.title)}
                              className="hover:text-destructive"
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

              {/* ===================================
                  MOBILE VERSION (CARD VIEW)
              ==================================== */}
              <div className="lg:hidden divide-y divide-border">
                {products.map((product) => (
                  <div key={product.id} className="p-4 space-y-3">
                    <div className="flex space-x-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-1 truncate">
                          {product.title}
                        </h3>

                        <span className="inline-block px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full mb-1">
                          {product.category}
                        </span>

                        <p className="text-primary font-semibold">{product.price}</p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex space-x-2">
                      <Link to={`/admin/edit/${product.id}`} className="flex-1">
                        <Button variant="secondary" size="sm" className="w-full">
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </Link>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(product.id, product.title)}
                        className="flex-1"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          ) : (
            // ================================
            // EMPTY STATE (NO PRODUCTS)
            // ================================
            <div className="bg-card rounded-2xl shadow-card p-12 text-center">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No products yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Start by adding your first product to the catalog.
              </p>

              <Link to="/admin/add">
                <Button variant="primary">
                  <Plus className="w-5 h-5 mr-2" />
                  Add First Product
                </Button>
              </Link>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
