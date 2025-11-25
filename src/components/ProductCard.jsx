import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./Button"; // Assumes Button exists in src/components/Button.jsx

// Utility function to format price in Indonesian Rupiah
const formatPrice = (price) => {
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(numericPrice)) return "Harga tidak tersedia";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericPrice);
};

// Palet Warna yang Disesuaikan untuk Tailwind:
// Primary Accent: #D4AF7F (Gold/Champagne)
// Base: #FAF9F6
// Shadow/Highlight: #E0C097 (Soft Gold)
// Text Dark: #2C2C2C
// Text Secondary: #555555

const ProductCard = ({ product }) => {
  // Placeholder image menggunakan salah satu warna base (misalnya #F5F1EC)
  const defaultImage = "https://placehold.co/400x400/F5F1EC/4A4A48?text=Produk+Premium";

  if (!product?.id) {
    console.error("ProductCard requires a product object with an 'id'.");
    return (
      // Background base 3 (#FDEFE8) dengan teks charcoal (#4A4A48)
      <div className="p-3 bg-[#FDEFE8] text-[#4A4A48] rounded-lg text-sm">
        Error: Produk tidak memiliki ID.
      </div>
    );
  }

  return (
    <Link
      to={`/products/${product.id}`}
      className="group relative bg-[#FAF9F6] rounded-xl overflow-hidden 
      // Shadow awal lembut, hover menggunakan soft gold/peach (#E0C097)
      shadow-lg hover:shadow-xl hover:shadow-[#E0C097]/60 
      transition-all duration-300 border border-[#F5F1EC] 
      flex flex-col h-full cursor-pointer"
      aria-label={`Lihat detail produk: ${product.title || product.name}`}
    >
      {/* Image Section */}
      {/* Background image placeholder menggunakan base 2 (#F5F1EC) */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F1EC] flex-shrink-0">
        <img
          src={product.image || defaultImage}
          alt={product.title || product.name || "Produk"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
        />

        {/* Category Badge */}
        {product.category && (
          <div className="absolute top-2 right-2">
            {/* Badge menggunakan Primary/Gold (#D4AF7F) dengan teks gelap (#2C2C2C) atau putih (#F8F8F8) */}
            <span className="px-2 py-0.5 bg-[#D4AF7F] text-[#2C2C2C] text-xs font-medium rounded-lg shadow-md">
              {product.category}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3 flex flex-col flex-grow space-y-1">
        {/* Product Title */}
        {/* Teks utama menggunakan #2C2C2C. Hover menggunakan Primary/Gold (#D4AF7F) */}
        <h3 className="text-base font-bold text-[#2C2C2C] group-hover:text-[#D4AF7F] transition-colors line-clamp-1">
          {product.title || product.name || "Nama Produk"}
        </h3>

        {/* Product Description */}
        {/* Teks sekunder menggunakan #555555 (atau #8E8D8A taupe) */}
        <p className="text-[#555555] text-xs line-clamp-2 flex-grow">
          {product.description || "Tidak ada deskripsi tersedia."}
        </p>

        {/* Price & Add to Cart Button */}
        <div className="flex items-center justify-between pt-2">
          {/* Harga menggunakan Primary/Gold (#D4AF7F) */}
          <span className="text-lg font-extrabold text-[#D4AF7F]">
            {formatPrice(product.price)}
          </span>

          {/* Tombol Add to Cart - Asumsi komponen Button akan di-style menggunakan CTA/Soft Gold (#E0C097) 
              Untuk saat ini, kita akan fokus pada styling wrapper dan Button.jsx perlu disesuaikan. */}
          <Button
            variant="primary" // Asumsi variant="primary" di Button.jsx akan menggunakan warna #E0C097 atau #D4AF7F
            size="xs"
            className="flex-shrink-0 p-5"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              alert(`Produk ${product.title || product.name} ditambahkan ke keranjang!`);
            }}
            aria-label={`Tambahkan ${product.title || product.name} ke keranjang`}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;