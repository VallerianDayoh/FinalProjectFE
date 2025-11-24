import React from 'react';

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Pranata Rumagit",
      role: "Frontend Developer",
      bio: "Specializes in React and UI design with 3 years of experience."
    },
    {
      id: 2,
      name: "Imanuel Walintukan",
      role: "Backend Developer",
      bio: "Expert in API development and database management."
    },
    {
      id: 3,
      name: "Mutiara Makarawung",
      role: "UI/UX Designer",
      bio: "Creates beautiful and user-friendly interfaces for our platform."
    },
    {
      id: 4,
      name: "Vallerian Dayoh",
      role: "Project Manager",
      bio: "Coordinates team efforts and ensures timely delivery of features."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-sky-blue-800 mb-4">About GlowStore</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          GlowStore is a premium skincare marketplace that connects customers with high-quality skincare products.
          Our platform provides an intuitive shopping experience with detailed product information, customer reviews,
          and personalized recommendations.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-semibold text-sky-blue-700 mb-8 text-center">Our Story</h2>
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-4xl mx-auto border border-gray-200">
          <p className="text-gray-700 mb-4 text-lg leading-relaxed">
            Founded in 2023, GlowStore started with a simple mission: to make premium skincare products accessible
            and easy to discover for everyone. We understand that skincare is personal, and finding the right
            products can be challenging in a crowded market.
          </p>
          <p className="text-gray-700 mb-4 text-lg leading-relaxed">
            Our team of skincare enthusiasts and technology experts came together to create a platform that not
            only showcases the best products but also provides detailed information to help customers make
            informed decisions about their skincare routine.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Today, we continue to curate the finest selection of skincare products, partnering with trusted
            brands to deliver results-driven formulations that help our customers feel confident in their skin.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-semibold text-sky-blue-700 mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
            >
              <div className="bg-gradient-to-br from-sky-blue-100 to-indigo-100 h-48 flex items-center justify-center">
                <div className="bg-gradient-to-br from-sky-blue-200 to-indigo-200 border-2 border-dashed border-sky-blue-300 rounded-full w-24 h-24 flex items-center justify-center">
                  <span className="text-sky-blue-600 font-bold text-lg">{member.name.charAt(0)}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sky-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-sky-blue-50 to-indigo-50 rounded-xl p-8 max-w-4xl mx-auto border border-sky-blue-100 shadow-md">
        <h2 className="text-2xl font-semibold text-sky-blue-700 mb-4">Our Commitment</h2>
        <p className="text-gray-700 mb-4 text-lg leading-relaxed">
          At GlowStore, we are committed to providing our customers with the highest quality skincare products
          and an exceptional shopping experience. We carefully vet each brand and product to ensure they meet
          our standards for effectiveness, safety, and sustainability.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          We believe that taking care of your skin is an act of self-care, and we're here to support you on
          your journey to healthy, glowing skin.
        </p>
      </div>
    </div>
  );
};

export default About;