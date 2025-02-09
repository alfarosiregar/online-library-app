import AdminLayout from "@/components/layouts/AdminLayout";

export default function AdminHome() {
  return (
    <div className="flex h-screen">
      <AdminLayout>
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold">Admin Home</h1>
          <p>Selamat datang di halaman Admin Home!</p>
        </div>
      </AdminLayout>
    </div>
  );
}
