"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import logoImage from "../../../public/Logo.jpeg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-teal-700 hover:text-teal-500 transition-colors"
              onClick={closeMenu}
            >
              <Image
                src={logoImage}
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-serif text-xl md:text-3xl font-semibold">
                Sun Community
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {["/", "/blog", "/reels"].map((path, index) => (
              <Link
                key={index}
                href={path}
                className={`font-medium transition-colors ${
                  isActive(path)
                    ? "text-teal-700 border-b-2 border-teal-700"
                    : "text-gray-700 hover:text-teal-600"
                }`}
              >
                {path === "/" ? "Home" : path === "/blog" ? "Blogs" : "Reels"}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-teal-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg animate-fadeIn">
            <nav className="flex flex-col space-y-3">
              {["/", "/blog", "/reels"].map((path, index) => (
                <Link
                  key={index}
                  href={path}
                  className={`px-4 py-2 font-medium transition-colors ${
                    isActive(path)
                      ? "text-teal-700 bg-teal-50"
                      : "text-gray-700 hover:bg-gray-50 hover:text-teal-600"
                  }`}
                  onClick={closeMenu}
                >
                  {path === "/" ? "Home" : path === "/blog" ? "Blogs" : "Reels"}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
