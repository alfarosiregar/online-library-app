import { useState, useEffect } from "react";
import Head from "next/head";
import ProfileForm from "@/components/fragments/ProfileForm";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";

const UserProfileView = ({ userData }: { userData: any }) => {
  {
    const { data: session }: any = useSession();
    const accessToken = session?.accessToken || session?.user?.accessToken; // Ambil token
    const userId = session?.user?.id || session?.sub || session?.user?.sub; // ID user

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
        avatarUrl:
          userData?.avatarUrl || "/placeholder.svg?height=200&width=200",
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
          console.log("Profile updated successfully");
          setUserDataDefault((prevData) =>
            prevData ? { ...prevData, ...newData } : newData,
          );
          setIsLoading(false);
        } else {
          setError("Gagal memperbarui profil. Silakan coba lagi.");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        setError("Terjadi kesalahan saat memperbarui profil.");
      } finally {
        setIsLoading(false);
      }
    };
    return (
      <div>
        <Head>
          <title>Profile</title>
          <meta name="description" content="Manage your user profile" />
        </Head>
        <div className="flex items-center justify-center p-8 bg-gradient-to-r from-sky-500 via-sky-400 to-sky-300">
          <div className="w-full flex items-center justify-center">
            <div className="max-w-3xl w-full h-full p-6 sm:p-10 bg-white shadow-2xl border-t border-gray-300 rounded-lg overflow-hidden animate-fade-in">
              <div className="flex flex-col items-center text-center">
                <img
                  className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
                  src={userDataDefault?.avatarUrl || "/placeholder.svg"}
                  alt={"User"}
                />
                <h1 className="mt-4 text-3xl font-bold text-gray-900">
                  {userDataDefault?.fullname || "User"}
                </h1>
              </div>
              <div className="mt-10 w-full animate-slide-up">
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
        </div>
      </div>
    );
  }
};

export default UserProfileView;
