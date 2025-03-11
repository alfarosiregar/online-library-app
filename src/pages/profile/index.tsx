import { useState, useEffect } from "react";
import UserProfileView from "@/components/views/user/profile";
import { useSession } from "next-auth/react";
import userServices from "@/services/user";
import SkeletonCard from "@/components/fragments/Skeleton";

const UserProfilePage = () => {
  const { data: session, status }: any = useSession();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Hanya ambil token dari session
  const token = session?.accessToken || session?.user?.accessToken;
  const userId = session?.user?.id || session?.sub || session?.user?.sub;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        console.error("Token tidak ditemukan, request dibatalkan");
        return;
      }

      setLoading(true); // Set loading sebelum fetch data

      try {
        // Ambil data user dari API
        const { data } = await userServices.getUser(userId, token);

        setUserData(data?.data || {});
      } catch (error: any) {
        console.error(
          "Error mengambil data user:",
          error.response?.data || error,
        );
      } finally {
        setLoading(false); // Matikan loading setelah fetch data selesai
      }
    };

    if (status === "authenticated" && token) {
      fetchUserData();
    }
  }, [status, token]);

  return loading ? <SkeletonCard /> : <UserProfileView userData={userData} />;
};

export default UserProfilePage;
