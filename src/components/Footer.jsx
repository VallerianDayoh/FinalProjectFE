// Import ikon dan komponen yang diperlukan
import { ShoppingBag, Instagram, Twitter, Facebook, Mail } from 'lucide-react'; // Added Mail for context
import { Link } from 'react-router-dom';
import Input from './Input';
import Button from './Button';

// Palet Warna yang Digunakan:
// Background/Base: #F5F1EC (Base 2), #FAF9F6 (Base 1)
// Primary/Brand Accent: #D4AF7F (Gold/Champagne)
// Secondary/Support: #8E8D8A (Taupe)
// Text/Foreground: #2C2C2C, #555555
// CTA/Highlight: #E0C097 (Soft Gold)

// Footer (Diperbarui dengan palet Gold/Soft Gold)
const Footer = () => (
  // Latar belakang Base 2 (#F5F1EC) dan border atas Base 3 (#FDEFE8)
  <footer className="bg-[#F5F1EC] border-t border-[#FDEFE8] mt-16">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16">

        {/* Brand & Social */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center space-x-3 group">
            {/* Logo BG: Primary Gold (#D4AF7F) */}
            <div className="w-10 h-10 rounded-full bg-[#D4AF7F] flex items-center justify-center shadow-md shadow-[#E0C097]/40">
              <ShoppingBag className="w-6 h-6 text-[#2C2C2C]" />
            </div>
            <span className="text-2xl font-extrabold text-[#2C2C2C]">GlowCart</span>
          </Link>
          <p className="text-[#555555] text-sm">
            Premium skincare products that work. Science-backed formulations for radiant, healthy skin.
          </p>
          <div className="flex space-x-4 pt-2">
            {[Instagram, Twitter, Facebook].map((Icon, idx) => (
              // Social Icons: Taupe (#8E8D8A) / Hover: Primary Gold (#D4AF7F)
              <a key={idx} href="#"
                 className="text-[#8E8D8A] hover:text-[#D4AF7F] transition-colors bg-[#FAF9F6] p-2 rounded-full border border-[#F5F1EC] hover:shadow-md hover:shadow-[#E0C097]/40">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="font-bold text-lg text-[#2C2C2C] mb-5">Shop</h4>
          <ul className="space-y-3 text-sm">
            {/* Link Hover: Primary Gold (#D4AF7F) */}
            <li><Link to="/products" className="text-[#555555] hover:text-[#D4AF7F] transition-colors">All Products</Link></li>
            <li><Link to="/category/serums" className="text-[#555555] hover:text-[#D4AF7F] transition-colors">Serums</Link></li>
            <li><Link to="/category/moisturizers" className="text-[#555555] hover:text-[#D4AF7F] transition-colors">Moisturizers</Link></li>
            <li><Link to="/category/cleansers" className="text-[#555555] hover:text-[#D4AF7F] transition-colors">Cleansers</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h4 className="font-bold text-lg text-[#2C2C2C] mb-5">Support</h4>
          <ul className="space-y-3 text-sm">
            {/* Link Hover: Primary Gold (#D4AF7F) */}
            <li><Link to="/contact" className="text-[#555555] hover:text-[#D4AF7F] transition-colors">Contact Us</Link></li>
            <li><Link to="/faq" className="text-[#555555] hover:text-[#D4AF7F] transition-colors">FAQ</Link></li>
            <li><Link to="/shipping" className="text-[#555555] hover:text-[#D4AF7F] transition-colors">Shipping Info</Link></li>
            <li><Link to="/returns" className="text-[#555555] hover:text-[#D4AF7F] transition-colors">Returns & Exchanges</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-bold text-lg text-[#2C2C2C] mb-5">Stay Updated</h4>
          <p className="text-[#555555] text-sm mb-5">
            Dapatkan penawaran eksklusif dan tips perawatan kulit langsung ke email Anda.
          </p>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <Mail className="w-5 h-5 text-[#8E8D8A] absolute left-3 top-1/2 transform -translate-y-1/2" />
              {/* Input menggunakan fokus Gold */}
              <Input type="email" placeholder="Masukkan email Anda"
                     className="w-full pl-10 py-3 text-sm rounded-xl bg-[#FAF9F6] focus:ring-[#D4AF7F] focus:border-[#D4AF7F]" />
            </div>
            {/* Button menggunakan Primary Gold theme */}
            <Button variant="primary" size="md" className="w-full shadow-[#E0C097]/50">Subscribe</Button>
          </form>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-[#FDEFE8]">
        <p className="text-center text-xs text-[#555555]">
          © {new Date().getFullYear()} GlowCart. All rights reserved. Skincare that works, powered by science.
        </p>
      </div>
    </div>
  </footer>
);


export default Footer;