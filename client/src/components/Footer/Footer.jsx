import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ChevronRight, Leaf } from 'lucide-react';

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
    <footer className="bg-gradient-to-br from-green-800 to-green-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold">NUTRI<span className="text-green-400">NUTS</span></span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Premium quality nuts and dry fruits, carefully sourced and delivered fresh to your doorstep.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="h-5 w-5 text-green-400" />
                <span>+1 234 567 890</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="h-5 w-5 text-green-400" />
                <span>support@nutrinuts.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="h-5 w-5 text-green-400" />
                <span>123 Nut Street, Foodville</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition-colors">
                    <ChevronRight className="h-4 w-4" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Categories</h3>
            <ul className="space-y-4">
              {categories.map((category) => (
                <li key={category.name}>
                  <a href={category.href} className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition-colors">
                    <ChevronRight className="h-4 w-4" />
                    <span>{category.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-4">
              {support.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition-colors">
                    <ChevronRight className="h-4 w-4" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-green-700/50 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} NUTRINUTS. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 bg-green-700/30 rounded-full hover:bg-green-700/50 transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 bg-green-700/30 rounded-full hover:bg-green-700/50 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 bg-green-700/30 rounded-full hover:bg-green-700/50 transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 bg-green-700/30 rounded-full hover:bg-green-700/50 transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;