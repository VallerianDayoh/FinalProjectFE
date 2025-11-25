// Edit by Imanuel Walintukan
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { ShoppingBag, LayoutDashboard, Code, Palette, User, Briefcase } from 'lucide-react';

// Developer Data
const developers = [
  // Placeholder menggunakan #D4AF7F (Gold/Champagne), #E6C6C6 (Blush Pink), #B7C5B6 (Sage), dan #C9B6C1 (Dusty Mauve)
  { id: 1, name: 'Dayoh, Vallerian Dava', role: 'Lead Developer', icon: Code, image: 'https://placehold.co/150x150/D4AF7F/2C2C2C?text=VD', bio: 'Fokus pada arsitektur React dan memastikan performa UI yang optimal.' },
  { id: 2, name: 'Makarawung, Mutiara', role: 'UI/UX Designer', icon: Palette, image: 'https://placehold.co/150x150/E6C6C6/2C2C2C?text=MM', bio: 'Bertanggung jawab atas desain visual dan pengalaman pengguna GlowCart.' },
  { id: 3, name: 'Rumagit, Pranata Vareliano', role: 'Backend Engineer', icon: Briefcase, image: 'https://placehold.co/150x150/B7C5B6/2C2C2C?text=PR', bio: 'Mengelola integrasi API, database, dan logika sisi server yang kuat.' },
  { id: 4, name: 'Walintukan, Imanuel', role: 'Quality Assurance & Content', icon: User, image: 'https://placehold.co/150x150/C9B6C1/2C2C2C?text=IW', bio: 'Memastikan kualitas produk digital dan mengoptimalkan deskripsi konten.' },
];

//#FAF9F6, #F5F1EC, #FDEFE8
//  #D4AF7F
//  #4A4A48, #8E8D8A
// T #2C2C2C, #555555
// #E0C097 (Soft Gold)

const About = () => (
  <div className="min-h-screen flex flex-col pt-16 bg-[#FAF9F6]"> {/* Base: Soft Off-White */}
    <Navbar />

    <main className="flex-grow">

      {/* Bagian Header / Hero */}
      <section className="pt-12 pb-16 text-center bg-[#F5F1EC] border-b border-[#FDEFE8] shadow-sm"> {/* Base: Warm Off-White */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#2C2C2C] mb-4"> {/* Text: Kontras Tinggi */}
          Kisah di Balik <span className="text-[#D4AF7F]">GlowCart</span> {/* Primary Accent: Gold/Champagne */}
        </h1>
        <p className="text-lg text-[#555555] max-w-4xl mx-auto"> {/* Text: Kontras Sedang */}
          GlowCart lahir dari kebutuhan akan platform e-commerce yang transparan, fokus pada kualitas, dan didukung oleh teknologi yang elegan.
        </p>
      </section>

      {/* Bagian Visi & Nilai */}
      <section className="py-16 bg-[#FAF9F6]"> {/* Base: Soft Off-White */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl grid md:grid-cols-2 gap-12">

          <div className="p-6 bg-[#FAF9F6] rounded-xl shadow-lg border-l-4 border-[#D4AF7F]"> {/* Base: Soft Off-White, Border: Gold/Champagne */}
            <h2 className="text-2xl font-bold text-[#4A4A48] mb-3 flex items-center"> {/* Secondary: Charcoal */}
              <ShoppingBag className="w-6 h-6 text-[#D4AF7F] mr-2" /> Visi {/* Primary Accent: Gold/Champagne */}
            </h2>
            <p className="text-[#555555]"> {/* Text: Kontras Sedang */}
              Menjadi destinasi utama e-commerce kecantikan di Indonesia yang dipercaya karena kurasi produk yang ketat dan pengalaman pengguna yang luar biasa.
            </p>
          </div>

          <div className="p-6 bg-[#FAF9F6] rounded-xl shadow-lg border-l-4 border-[#D4AF7F]"> {/* Base: Soft Off-White, Border: Gold/Champagne */}
            <h2 className="text-2xl font-bold text-[#4A4A48] mb-3 flex items-center"> {/* Secondary: Charcoal */}
              <LayoutDashboard className="w-6 h-6 text-[#D4AF7F] mr-2" /> Nilai Kami {/* Primary Accent: Gold/Champagne */}
            </h2>
            <ul className="text-[#555555] list-disc list-inside space-y-1"> {/* Text: Kontras Sedang */}
              <li>Hanya menyediakan produk yang teruji.</li>
              <li>Informasi bahan dan harga yang jujur.</li>
              <li>Selalu mengadopsi teknologi terbaru untuk layanan.</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Bagian Tim Kami */}
      <section className="py-16 bg-[#FDEFE8]"> {/* Base: Blush Cream (Untuk kontras lembut) */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2C2C2C] mb-4">Tim Kami</h2> {/* Text: Kontras Tinggi */}
            <p className="text-[#555555] max-w-3xl mx-auto"> {/* Text: Kontras Sedang */}
              Kami adalah empat individu yang berdedikasi untuk menciptakan platform e-commerce terbaik.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {developers.map(dev => (
              <div
                key={dev.id}
                className="bg-[#FAF9F6] p-6 rounded-2xl shadow-xl text-center transition-all duration-300 transform hover:scale-[1.03] border border-[#F5F1EC]" // Base: Soft Off-White, Border: Warm Off-White
              >
                <img
                  src={dev.image}
                  alt={dev.name}
                  className="w-32 h-32 rounded-full mx-auto mb-5 object-cover ring-4 ring-[#E6C6C6] shadow-md" // Primary Accent: Blush Pink (ring)
                  onError={e => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/8E8D8A/F8F8F8?text=DEV'; }} // Secondary: Taupe
                />
                <h3 className="text-xl font-extrabold text-[#2C2C2C]">{dev.name}</h3> {/* Text: Kontras Tinggi */}
                <p className="text-[#D4AF7F] font-semibold text-sm mb-3">{dev.role}</p> {/* Primary Accent: Gold/Champagne */}
                <p className="text-sm text-[#555555] min-h-[40px]">{dev.bio}</p> {/* Text: Kontras Sedang */}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Bagian CTA */}
      <div className="text-center py-12 bg-[#FAF9F6]"> {/* Base: Soft Off-White */}
        {/* Catatan: Komponen Button harus mendukung warna kustom, namun saya mengasumsikan 'primary' akan di-map ke CTA/Highlight: #E0C097 */}
        <Button variant="primary" size="lg" className="bg-[#E0C097] text-[#2C2C2C] hover:bg-[#F7BFA1] transition duration-300"> {/* CTA: Soft Gold, Hover: Peach */}
          Explore Our Products
        </Button>
      </div>

    </main>

    <Footer />
  </div>
);

export default About;