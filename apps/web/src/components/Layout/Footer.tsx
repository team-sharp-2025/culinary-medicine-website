import React from "react";
import { Mail, Instagram, Facebook, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-serif font-semibold mb-2">
              <span>Culinary Medicine</span>
              <span className="text-teal-100"> – Where food meets health.</span>
            </h2>
            <p className="text-teal-100 font-serif font-semibold text-xl">
              Empowering you to take control of your health !
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <Mail size={18} className="mr-2 text-teal-200" />
              <a
                href="mailto:sunitha.bala@gmail.com"
                className="text-teal-100 hover:text-white transition-colors"
              >
                sunitha.bala@gmail.com
              </a>
            </div>
            <div className="flex items-center">
              <Instagram size={18} className="mr-2 text-teal-200" />
              <a
                href="https://www.instagram.com/sunithabalaa?igsh=MXcycG93ZWVkMnJkMw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-100 hover:text-white transition-colors"
              >
                Instagram
              </a>
            </div>
            {/* <div className="flex items-center">
              <Facebook size={18} className="mr-2 text-teal-200" />
              <a
                href="https://www.facebook.com/share/1ZP4DFRhYz/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-100 hover:text-white transition-colors"
              >
                Facebook
              </a>
            </div> */}
            <div className="flex items-center">
              <Linkedin size={18} className="mr-2 text-teal-200" />
              <a
                href="https://www.linkedin.com/in/sunitha-bala-0667b218?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-100 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-teal-700 text-center text-teal-300 text-sm">
          <p>
            © {new Date().getFullYear()} suncommunity.in - All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
