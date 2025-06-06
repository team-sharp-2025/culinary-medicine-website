import React from "react";
import Link from "next/link";

export const Navbar = ({
  links,
}: {
  links: { label: string; href: string }[];
}) => (
  <nav className="bg-gray-100 px-6 py-4 flex gap-4">
    {links.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className="text-blue-700 hover:underline"
      >
        {link.label}
      </Link>
    ))}
  </nav>
);
