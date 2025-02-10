import AdminLayout from "@/components/layouts/AdminLayout";
import DataTable from "@/components/fragments/Table";

const AdminUsersView = () => {
  return (
    <AdminLayout>
      <div className="p-10 w-full">
        <h1 className="text-2xl font-bold">User Management</h1>
        <DataTable />
      </div>
    </AdminLayout>
  );
};

export default AdminUsersView;
