import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AdminUsersView from "@/components/views/admin/users";
import userServices from "@/services/user";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const { data: session, status }: any = useSession();

  const accessToken = session?.accessToken || session?.user?.accessToken;

  useEffect(() => {
    const getAllUsers = async () => {
      if (!accessToken) {
        console.error("Token tidak ditemukan, request dibatalkan");
        return;
      }

      try {
        const { data } = await userServices.getAllUsers(accessToken);
        setUsers(data.data);
      } catch (error: any) {
        console.error(
          "Error mengambil data user:",
          error.response?.data || error,
        );
      }
    };

    if (status === "authenticated" && accessToken) {
      getAllUsers();
    }
  }, [status, accessToken]); // Tambahkan accessToken ke dependency

  return <AdminUsersView users={users} />;
};

export default AdminUsersPage;
