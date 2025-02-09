import AdminLayout from "@/components/layouts/AdminLayout";

export default function AdminDashboard() {
  return (
    <div className="flex h-screen">
      <AdminLayout>
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p>Selamat datang di halaman Admin Dashboard!</p>
        </div>
      </AdminLayout>
    </div>
  );
}
