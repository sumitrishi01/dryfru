import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ChevronRight, Leaf } from 'lucide-react';
import logo from './footlogo.png'

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Products', href: '#' },
    { name: 'Recipes', href: '#' },
    { name: 'Contact', href: '#' }
  ];

  const categories = [
    { name: 'Almonds', href: '#' },
    { name: 'Cashews', href: '#' },
    { name: 'Pistachios', href: '#' },
    { name: 'Mixed Nuts', href: '#' }
  ];

  const support = [
    { name: 'FAQs', href: '#' },
    { name: 'Shipping', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'Track Order', href: '#' }
  ];

  return (
    <footer className="relative bg-[#005D31] px-0 md:px-10">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300"></div>
      
      {/* Wave SVG */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden">
        <svg className="relative block w-full h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>

      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              {/* <Leaf className="h-8 w-8 text-amber-600" strokeWidth={1.5} />
              <span className="text-2xl font-bold text-gray-800">NUTRI<span className="text-amber-600">NUTS</span></span> */}
              <img width={100} src={logo} alt="" />
            </div>
            <p className="text-white text-sm leading-relaxed">
              Premium quality nuts and dry fruits, carefully sourced and delivered fresh to your doorstep.
            </p>
            <div className="space-y-4">
              <a href="tel:+12345678901" className="flex items-center gap-3 text-gray-600 hover:text-amber-600 transition-colors group">
                <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                  <Phone className="h-4 w-4 text-amber-600" strokeWidth={1.5} />
                </div>
                <span className=' text-white'>+1 234 567 890</span>
              </a>
              <a href="mailto:support@dyfru.com" className="flex items-center gap-3 text-gray-600 hover:text-amber-600 transition-colors group">
                <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                  <Mail className="h-4 w-4 text-amber-600" strokeWidth={1.5} />
                </div>
                <span className=' text-white'>support@dyfru.com</span>
              </a>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <MapPin className="h-4 w-4 text-amber-600" strokeWidth={1.5} />
                </div>
                <span className=' text-white'>123 Nut Street, Foodville</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:ml-12">
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="group flex items-center gap-2 text-white hover:text-amber-600 transition-colors">
                    <ChevronRight className="h-4 w-4 text-amber-400 group-hover:text-amber-600 transition-colors" strokeWidth={1.5} />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Categories</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <a href={category.href} className="group flex items-center gap-2 text-white hover:text-amber-600 transition-colors">
                    <ChevronRight className="h-4 w-4 text-amber-400 group-hover:text-amber-600 transition-colors" strokeWidth={1.5} />
                    <span>{category.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Support</h3>
            <ul className="space-y-3">
              {support.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="group flex items-center gap-2 text-white hover:text-amber-600 transition-colors">
                    <ChevronRight className="h-4 w-4 text-amber-400 group-hover:text-amber-600 transition-colors" strokeWidth={1.5} />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 p-8 bg-[#E8F4EC] rounded-2xl shadow-sm border border-amber-100">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Subscribe to Our Newsletter</h3>
            <p className="text-gray-600 mb-6">Stay updated with our latest products and exclusive offers.</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-[#005D31] focus:outline-none focus:border-amber-400"
              />
              <button className="px-6 py-3 bg-[#005D31] text-white rounded-lg hover:bg-[#005D31] transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-16 pt-8 border-t border-amber-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white">
              © {new Date().getFullYear()} Dryfru. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 bg-white rounded-lg hover:bg-amber-50 border border-amber-100 hover:border-amber-200 transition-colors group"
                >
                  <Icon className="h-5 w-5 text-amber-600 group-hover:text-amber-700" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;