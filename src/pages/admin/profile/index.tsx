import AdminLayout from "@/components/layouts/AdminLayout";

const AdminProfilePage = () => {
  return (
    <div className="flex h-screen">
      <AdminLayout>
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold">Profile Admin</h1>
          <p>Selamat datang di halaman Profile Admin!</p>
        </div>
      </AdminLayout>
    </div>
  );
};

export default AdminProfilePage;
