import AdminLayout from "@/components/layouts/AdminLayout";

const AdminUsersPage = () => {
  return (
    <div className="flex h-screen">
      <AdminLayout>
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold">Users Page</h1>
          <p>Selamat datang di halaman Users Page!</p>
        </div>
      </AdminLayout>
    </div>
  );
};

export default AdminUsersPage;
