import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Heart, Loader2 } from 'lucide-react';

// Pastikan path ke api, Button, Navbar, dan Footer sudah benar
import { getProduct } from '../services/api';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// --- PALET WARNA APLIKASI (untuk referensi Tailwind) ---
// Base: #FAF9F6, #F5F1EC, #FDEFE8
// Primary/Brand Accent (Gold/Champagne): #D4AF7F
// CTA/Highlight (Soft Gold): #E0C097
// Secondary/Support (Taupe): #8E8D8A
// Text: #2C2C2C, #555555

// Utility untuk format harga
const formatPrice = (price) => {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(numericPrice)) return 'Harga tidak tersedia';
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR', 
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0 
  }).format(numericPrice);
};


const ProductDetailPage = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); 

  // Handler untuk pengambilan data
  useEffect(() => {
    // Gunakan id untuk memuat data
    if (!id) {
        setLoading(false);
        return;
    }
    
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProduct(id); 
        setProduct(data);
      } catch (error) {
        console.error('Gagal memuat detail produk:', error);
        setProduct(null); // Set ke null jika error
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // --- RENDERING KONDISIONAL ---
  
  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center pt-32">
        <Loader2 className="w-8 h-8 text-[#D4AF7F] animate-spin" />
        <p className="ml-3 text-[#555555]">Memuat detail produk...</p>
      </div>
    );
  }

  // Not Found State
  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center pt-32 text-center">
        <h1 className="text-3xl font-bold text-[#4A4A48] mb-4">404 - Produk Tidak Ditemukan</h1>
        <p className="text-lg text-[#555555]">ID produk "{id}" mungkin tidak valid atau data gagal dimuat dari server.</p>
      </div>
    );
  }

  // Komponen utama setelah data berhasil dimuat
  return (
    <>
      <Navbar /> {/* Asumsi Navbar sudah mengadopsi palet */}
      <div className="min-h-screen bg-[#FAF9F6] pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

          {/* Grid Layout (Gambar & Detail) */}
          {/* Base: #F5F1EC (sedikit lebih gelap dari #FAF9F6) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-[#F5F1EC] p-8 rounded-2xl shadow-xl border border-[#FDEFE8]">
            
            {/* 1. Kontainer Gambar */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-[#FDEFE8] shadow-lg">
              <img
                src={product.image}
                alt={product.title || product.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* 2. Detail Produk & Aksi */}
            <div className="space-y-6">
              {/* Category Tag: Menggunakan Blush Pink (#E6C6C6) dan Text Charcoal (#4A4A48) */}
              <span className="px-3 py-1 bg-[#E6C6C6] text-[#4A4A48] text-sm font-semibold rounded-full">
                {product.category}
              </span>
              
              <h1 className="text-4xl font-extrabold text-[#2C2C2C]">{product.title || product.name}</h1>
              
              <p className="text-[#555555] leading-relaxed">{product.description}</p>

              {/* Price: Menggunakan Primary Accent Gold/Champagne (#D4AF7F) */}
              <div className="text-5xl font-extrabold text-[#D4AF7F] py-4 border-t border-b border-[#FDEFE8]">
                {formatPrice(product.price)}
              </div>
              
              {/* Kontrol Kuantitas */}
              <div className="flex items-center space-x-4">
                <label htmlFor="quantity-input" className="text-[#4A4A48] font-medium">Kuantitas:</label>
                <input
                  id="quantity-input"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  // Border Taupe (#8E8D8A), Focus Ring Gold (#D4AF7F)
                  className="w-20 px-3 py-2 border border-[#C9B6C1] rounded-xl text-center focus:ring-1 focus:ring-[#D4AF7F] focus:border-[#D4AF7F]"
                />
              </div>

              {/* Tombol Aksi Utama */}
              <div className="flex space-x-4 pt-4">
                {/* CTA Primary: Soft Gold (#E0C097), Shadow menggunakan Soft Gold/Taupe */}
                <Button 
                    variant="primary" 
                    size="lg" 
                    className="flex-1 bg-[#E0C097] text-[#2C2C2C] hover:bg-[#D4AF7F] transition-colors shadow-lg shadow-[#E0C097]/40"
                    onClick={() => alert(`Menambahkan ${quantity} unit ${product.title || product.name} ke keranjang.`)}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Tambah ke Keranjang
                </Button>
                {/* Secondary Button: Taupe (#8E8D8A) */}
                <Button 
                    variant="secondary" 
                    size="lg" 
                    className="px-4 border border-[#D4AF7F] text-[#D4AF7F] hover:bg-[#FDEFE8]"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
              
              {/* Checkout Button: Primary Accent Gold (#D4AF7F) */}
              <Button 
                variant="accent" 
                size="lg" 
                className="w-full bg-[#D4AF7F] text-[#F8F8F8] hover:bg-[#E0C097] transition-colors"
                onClick={() => alert(`Berhasil checkout ${quantity} unit ${product.title || product.name}.`)}
              >
                Checkout Sekarang
              </Button>
              
              {/* Info Stok */}
              {product.stock && product.stock > 0 ? (
                <p className="text-sm text-[#B7C5B6] font-medium pt-3">Stok Tersedia: {product.stock} unit</p>
              ) : (
                <p className="text-sm text-[#C9B6C1] font-medium pt-3">Stok Habis</p>
              )}
            </div>
          </div>
          
          {/* Section Komentar (Simulasi) */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-6 border-b border-[#FDEFE8] pb-2">Ulasan Pelanggan</h2>
            <div className="bg-[#F5F1EC] p-6 rounded-xl shadow-md border border-[#FDEFE8] space-y-4">
              <p className="text-[#8E8D8A] italic">"Sangat suka dengan produk ini! Pengiriman cepat." - Sarah J.</p>
              <p className="text-[#8E8D8A] italic">"Kualitasnya melebihi ekspektasi. Pasti akan membeli lagi." - David L.</p>
              <p className="text-[#8E8D8A] italic">"Detailnya bagus, hanya saja harganya sedikit mahal." - Michael B.</p>
            </div>
          </div>

        </div>
      </div>
      <Footer /> {/* Asumsi Footer sudah mengadopsi palet */}
    </>
  );
};

export default ProductDetailPage;