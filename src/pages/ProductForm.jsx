import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';

import { getProduct, createProduct, updateProduct } from '../services/api';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: '',
  });

  useEffect(() => {
    if (isEditMode) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await getProduct(id);

      setFormData({
        title: data.title || '',
        description: data.description || '',
        price: data.price || '',
        category: data.category || '',
        image: data.image || '',
      });
    } catch (error) {
      alert(error.message || 'Failed to load product');
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Product title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    } else if (!/^https?:\/\/.+/.test(formData.image)) {
      newErrors.image = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please fix the form errors');
      return;
    }

    try {
      setSubmitting(true);

      if (isEditMode) {
        await updateProduct(id, formData);
        alert('Product updated successfully!');
      } else {
        await createProduct(formData);
        alert('Product created successfully!');
      }

      navigate('/admin');
    } catch (error) {
      alert(error.message || 'Failed to save product');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">

          {/* Header */}
          <div className="mb-8">
            <Link to="/admin" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>

            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              {isEditMode ? 'Edit Product' : 'Add New Product'}
            </h1>

            <p className="text-muted-foreground mt-2">
              {isEditMode ? 'Update product information' : 'Fill in the details to create a new product'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-card p-6 sm:p-8 space-y-6 border border-border/50">

            <Input
              label="Product Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
              placeholder="e.g., Hydra Boost Face Serum"
              required
            />

            <Input
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={errors.description}
              placeholder="Describe your product..."
              textarea
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                error={errors.price}
                placeholder="e.g., $29"
                required
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Category <span className="text-destructive ml-1">*</span>
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Serum">Serum</option>
                  <option value="Moisturizer">Moisturizer</option>
                  <option value="Cleanser">Cleanser</option>
                  <option value="Sunscreen">Sunscreen</option>
                  <option value="Toner">Toner</option>
                  <option value="Mask">Mask</option>
                  <option value="Eye Care">Eye Care</option>
                </select>

                {errors.category && (
                  <p className="text-sm text-destructive">{errors.category}</p>
                )}
              </div>
            </div>

            <Input
              label="Image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
              error={errors.image}
              placeholder="https://example.com/image.jpg"
              required
            />

            {formData.image && (
              <div className="rounded-xl overflow-hidden border border-border">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                  }}
                />
                <p className="text-sm text-muted-foreground p-3 bg-secondary">Image Preview</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={submitting}
                className="flex-1"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {isEditMode ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    {isEditMode ? 'Update Product' : 'Create Product'}
                  </>
                )}
              </Button>

              <Link to="/admin" className="flex-1">
                <Button type="button" variant="secondary" size="lg" className="w-full">
                  Cancel
                </Button>
              </Link>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
};

export default ProductForm;
