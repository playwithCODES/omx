
import Header from "@/Components/Customer/Header";
import Footer from "@/Components/Customer/Footer";

export default function CustomerLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
