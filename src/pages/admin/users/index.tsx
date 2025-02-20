import AdminUsersView from "@/components/views/admin/users";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const { data: session } = useSession(); // Ambil sesi autentikasi

  const accessToken =
    (session as any)?.accessToken || (session as any)?.user?.accessToken;

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getAllUsers(accessToken);
      setUsers(data.data);
    };
    getAllUsers();
  }, []);

  return (
    <>
      <AdminUsersView users={users} />
    </>
  );
};

export default AdminUsersPage;
