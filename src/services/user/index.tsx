import instance from "@/lib/axios/instance";

const userServices = {
  getAllUsers: () => instance.get("/api/user"),
  updateAccount: (id: string, data: any) =>
    instance.put("/api/user/register", data),
};

export default userServices;
