import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 max-w-4xl mx-auto">
        {children}
      </body>
    </html>
  );
}
