import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-serif font-semibold mb-2">Culinary Medicine</h2>
            <p className="text-teal-100 max-w-md">
              Where nutrition meets healing. Empowering you to take control of your health through food.
            </p>
          </div>
          
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <Mail size={18} className="mr-2 text-teal-200" />
              <a href="mailto:contact@culinarymedicine.com" className="text-teal-100 hover:text-white transition-colors">
                contact@culinarymedicine.com
              </a>
            </div>
            <div className="flex items-center">
              <Phone size={18} className="mr-2 text-teal-200" />
              <a href="tel:+1-800-555-1234" className="text-teal-100 hover:text-white transition-colors">
                +1-800-555-1234
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-teal-700 text-center text-teal-300 text-sm">
          <p>© {new Date().getFullYear()} Culinary Medicine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;