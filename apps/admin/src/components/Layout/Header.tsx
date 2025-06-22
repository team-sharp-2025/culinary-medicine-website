"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import logoImage from "../../../public/Logo.jpeg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(localStorage.getItem("userId"));
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/blog", label: "Blog" },
    { path: "/reels", label: "Reels" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-emerald-50 shadow-md py-2" : "bg-emerald-100 py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/dashboard"
            onClick={closeMenu}
            className="flex items-center gap-2 text-emerald-700 hover:text-emerald-600 transition-colors"
          >
            <Image
              src={logoImage}
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-serif text-xl md:text-2xl font-semibold">
              Admin Dashboard
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                href={path}
                className={`font-medium transition-colors ${
                  isActive(path)
                    ? "text-emerald-700 border-b-2 border-emerald-700"
                    : "text-gray-700 hover:text-emerald-600"
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setShowDropdown((prev) => !prev)}
                className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <FaUserCircle className="text-2xl text-gray-700" />
                <span className="text-gray-800 font-medium">
                  {userId || "User"}
                </span>
                <FaChevronDown className="text-sm mt-1" />
              </div>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg py-2 z-50 border">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-emerald-600 focus:outline-none"
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
              {navItems.map(({ path, label }) => (
                <Link
                  key={path}
                  href={path}
                  onClick={closeMenu}
                  className={`px-4 py-2 font-medium transition-colors ${
                    isActive(path)
                      ? "text-emerald-700 bg-emerald-50"
                      : "text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <button
                onClick={() => {
                  closeMenu();
                  handleLogout();
                }}
                className="text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
              >
                Logout
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
