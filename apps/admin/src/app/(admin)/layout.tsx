import Header from '../../components/Layout/Header';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-white">
      <Header />
      <main className="pt-20 p-8">{children}</main> {/* <-- added pt-20 */}
    </div>
  );
}
