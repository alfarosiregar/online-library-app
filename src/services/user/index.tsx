import instance from "@/lib/axios/instance";

const userServices = {
  getAllUsers: async (token: string) => {
    return instance.get("/api/user/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getUser: async (id: string, token: string) => {
    return instance.get(`/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  updateUser: (id: string, data: any, token: string) =>
    instance.put(
      `/api/user/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ),

  deleteUser: (id: string, token: string) =>
    instance.delete(`/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default userServices;
