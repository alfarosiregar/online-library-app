import { useState, useEffect } from "react";
import Head from "next/head";
import ProfileForm from "@/components/fragments/ProfileForm";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import AdminLayout from "@/components/layouts/AdminLayout";

const AdminProfileView = ({ userData }: { userData: any }) => {
  const { data: session }: any = useSession();
  const accessToken = session?.accessToken || session?.user?.accessToken;
  const userId = session?.user?.id || session?.sub || session?.user?.sub;

  const [userDataDefault, setUserDataDefault] = useState<{
    fullname: string;
    email: string;
    phone: string;
    avatarUrl: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUserDataDefault({
      fullname: userData?.fullname || "User",
      email: userData?.email || "john.doe@example.com",
      phone: userData?.phone || "+62 ",
      avatarUrl: userData?.avatarUrl || "/placeholder.svg?height=200&width=200",
    });
  }, [userData]);

  const handleProfileUpdate = async (newData: any) => {
    if (!userId || !accessToken) {
      setError("Token atau User ID tidak ditemukan.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await userServices.updateUser(
        userId,
        newData,
        accessToken,
      );

      if (result.status === 200) {
        setUserDataDefault((prevData) =>
          prevData ? { ...prevData, ...newData } : newData,
        );
        setIsLoading(false);
      } else {
        setError("Gagal memperbarui profil. Silakan coba lagi.");
      }
    } catch (error) {
      setError("Terjadi kesalahan saat memperbarui profil.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Manage your user profile" />
      </Head>
      <div className="w-full flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-md sm:max-w-lg w-full bg-white shadow-2xl border-t border-gray-200 rounded-lg p-6 sm:p-10 animate-fade-in">
          <div className="flex flex-col items-center text-center">
            <img
              className="h-48 w-auto border-4 rounded-lg shadow-lg"
              src={userDataDefault?.avatarUrl || "/placeholder.svg"}
              alt="User"
            />
            <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900">
              {userDataDefault?.fullname || "User"}
            </h1>
          </div>
          <div className="mt-6 sm:mt-10 w-full animate-slide-up">
            {userDataDefault && (
              <ProfileForm
                userData={userDataDefault}
                onSubmit={handleProfileUpdate}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfileView;
