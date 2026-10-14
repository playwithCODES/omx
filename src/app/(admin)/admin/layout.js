import AdminSidebar from "@/Components/Admin/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-60 min-w-0 p-6">
        {children}
      </main>
    </div>
  );
}