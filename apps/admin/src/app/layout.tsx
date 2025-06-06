import "./globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 max-w-4xl mx-auto">
        {children}
      </body>
    </html>
  );
}
