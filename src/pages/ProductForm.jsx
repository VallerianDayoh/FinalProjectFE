import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Input from "../components/Input";

import { getProduct, createProduct, updateProduct } from "../services/api";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (isEditMode) loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await getProduct(id);

      // Pastikan price dikonversi ke string untuk input teks
      setFormData({
        title: data.title || "",
        description: data.description || "",
        price: String(data.price) || "", 
        category: data.category || "",
        image: data.image || "",
      });
    } catch (error) {
      alert(error.message || "Gagal memuat produk. Kembali ke dashboard.");
      navigate("/admin");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Nama produk wajib diisi";
    if (!formData.description.trim()) newErrors.description = "Deskripsi wajib diisi";
    
    // Validasi Harga (Pastikan numerik, meskipun input type="text" di sini)
    if (!formData.price || isNaN(Number(formData.price))) newErrors.price = "Harga wajib diisi dan harus berupa angka";
    
    if (!formData.category.trim()) newErrors.category = "Kategori wajib dipilih";

    if (!formData.image.trim()) {
      newErrors.image = "URL Gambar wajib diisi";
    } else if (!/^https?:\/\/.+/.test(formData.image)) {
      newErrors.image = "Harap masukkan URL yang valid (diawali http/https)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Harap perbaiki kesalahan pada formulir.");
      return;
    }

    try {
      setSubmitting(true);

      // Membuat objek data yang akan dikirim (mengkonversi harga kembali ke number)
      const dataToSubmit = {
          ...formData,
          price: Number(formData.price),
      };

      if (isEditMode) {
        await updateProduct(id, dataToSubmit);
        alert("Produk berhasil diperbarui!");
      } else {
        await createProduct(dataToSubmit);
        alert("Produk berhasil dibuat!");
      }

      navigate("/admin");
    } catch (error) {
      alert(error.message || "Gagal menyimpan produk. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-32 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50"> {/* Warna background terang */}
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/admin"
              className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors mb-4 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Dashboard
            </Link>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
              {isEditMode ? "Edit Produk" : "Tambah Produk Baru"}
            </h1>

            <p className="text-gray-500 mt-2">
              {isEditMode
                ? "Perbarui informasi produk dan simpan perubahan"
                : "Isi detail produk baru untuk ditambahkan ke inventaris"}
            </p>
          </div>

          {/* Form Card */}
          <form
            onSubmit={handleSubmit}
            // Menggunakan styling card modern (bg-white, shadow-xl, border)
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6 border border-gray-100"
          >
            
            {/* Field: Title */}
            <Input
              label="Nama Produk"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
              placeholder="e.g., Hydra Boost Face Serum"
              required
            />

            {/* Field: Description */}
            <Input
              label="Deskripsi"
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={errors.description}
              placeholder="Jelaskan detail produk Anda..."
              textarea
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
              {/* Field: Price */}
              <Input
                label="Harga"
                name="price"
                value={formData.price}
                onChange={handleChange}
                error={errors.price}
                placeholder="e.g., 290000 (tanpa titik/koma)"
                required
              />

              {/* Field: Category (Select) */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Kategori <span className="text-red-500 ml-1">*</span>
                </label>

                {/* Styling elemen SELECT agar seragam dengan Input */}
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  // Kelas Tailwind yang disesuaikan:
                  className={`
                    w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-xl appearance-none pr-8 cursor-pointer 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm
                    ${errors.category ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
                  `}
                  required
                >
                  <option value="" disabled>-- Pilih Kategori --</option>
                  <option value="Serum">Serum</option>
                  <option value="Moisturizer">Moisturizer</option>
                  <option value="Cleanser">Cleanser</option>
                  <option value="Sunscreen">Sunscreen</option>
                  <option value="Toner">Toner</option>
                  <option value="Mask">Mask</option>
                  <option value="Eye Care">Eye Care</option>
                </select>
                
                {/* Tambahkan ikon panah kustom untuk SELECT agar lebih modern */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    {/* Catatan: Untuk menempatkan ikon ini dengan benar, Anda mungkin perlu membungkus SELECT di DIV dan menggunakan posisi relatif/absolut. 
                       Namun, di sini saya fokus pada styling SELECT itu sendiri. */}
                </div>

                {errors.category && (
                  <p className="text-sm text-red-500 mt-1">{errors.category}</p>
                )}
              </div>
            </div>

            {/* Field: Image URL */}
            <Input
              label="URL Gambar"
              name="image"
              value={formData.image}
              onChange={handleChange}
              error={errors.image}
              placeholder="https://example.com/image.jpg"
              required
            />

            {/* Image Preview */}
            {formData.image && (
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-md">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                  }}
                />
                <p className="text-sm text-gray-500 p-3 bg-gray-50 font-medium">
                  Pratinjau Gambar
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={submitting}
                className="flex-1 shadow-blue-500/50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {isEditMode ? "Memperbarui..." : "Membuat..."}
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    {isEditMode ? "Perbarui Produk" : "Buat Produk"}
                  </>
                )}
              </Button>

              <Link to="/admin" className="flex-1">
                <Button 
                    type="button" 
                    variant="secondary" 
                    size="lg" 
                    className="w-full"
                >
                  Batal
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