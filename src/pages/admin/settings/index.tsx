import AdminLayout from "@/components/layouts/AdminLayout";

export default function AdminSettings() {
  return (
    <div className="flex h-screen">
      <AdminLayout>
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold">Admin Settings</h1>
          <p>Selamat datang di halaman Admin Settings!</p>
        </div>
      </AdminLayout>
    </div>
  );
}
