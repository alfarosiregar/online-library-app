import {
  deleteUser,
  retrieveData,
  retrieveDataById,
  updateUser,
} from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = req.headers.authorization?.split(" ")[1] || "";

  //Hanya user yang terautentikasi yang dapat mengakses
  if (!token) {
    return res.status(401).json({
      status: false,
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  let decoded: any;

  try {
    decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
    if (!decoded) {
      return res.status(403).json({
        status: false,
        statusCode: 403,
        message: "Invalid Token",
      });
    }
  } catch (error: any) {
    console.error("JWT Error:", error.message);
    return res.status(401).json({
      status: false,
      statusCode: 401,
      message: "Invalid or Expired Token",
    });
  }

  if (req.method === "GET") {
    try {
      const { user }: any = req.query;
      const userId = user?.[1];

      if (userId) {
        // Jika user meminta data dirinya sendiri di izinkan
        if (decoded.sub === userId || decoded.role === "admin") {
          const userData = await retrieveDataById("users", userId);
          if (!userData) {
            return res.status(404).json({
              status: false,
              statusCode: 404,
              message: "User not found",
            });
          }
          delete userData.password;
          return res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Success",
            data: userData,
          });
        } else {
          return res.status(403).json({
            status: false,
            statusCode: 403,
            message: "Access Denied",
          });
        }
      }

      // Jika tidak ada userId dan user bukan admin, larang akses
      if (decoded.role !== "admin") {
        return res.status(403).json({
          status: false,
          statusCode: 403,
          message: "Access Denied",
        });
      }

      // Jika admin, bisa ambil semua data user
      const users = await retrieveData("users");
      const sanitizedUsers = users.map((user: any) => {
        delete user.password;
        return user;
      });

      return res.status(200).json({
        status: true,
        statusCode: 200,
        message: "Success",
        data: sanitizedUsers,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  }
  if (req.method === "PUT") {
    try {
      const { data } = req.body;
      const { user }: any = req.query;
      const userId = Array.isArray(user) ? user[1] : user;

      if (!userId) {
        return res.status(400).json({
          status: false,
          statusCode: 400,
          message: "User ID is required",
        });
      }

      if (decoded.sub !== userId && decoded.role !== "admin") {
        return res.status(403).json({
          status: false,
          statusCode: 403,
          message: "Access Denied",
        });
      }

      const result = await updateUser("users", userId, data); // Sekarang `updateUser` mengembalikan nilai

      if (result) {
        return res.status(200).json({
          status: true,
          statusCode: 200,
          message: "User updated successfully",
        });
      } else {
        return res.status(400).json({
          status: false,
          statusCode: 400,
          message: "Failed to update user",
        });
      }
    } catch (error) {
      console.error("PUT API Error:", error);
      return res.status(500).json({
        status: false,
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { user }: any = req.query;
      const userId = user?.[1];

      if (!userId) {
        return res.status(400).json({
          status: false,
          statusCode: 400,
          message: "User ID is required",
        });
      }

      // Hanya admin yang boleh menghapus user
      if (decoded.role !== "admin") {
        return res.status(403).json({
          status: false,
          statusCode: 403,
          message: "Access Denied",
        });
      }

      const result: any = await deleteUser("users", userId, () => {});
      if (result) {
        return res.status(200).json({
          status: true,
          statusCode: 200,
          message: "User deleted successfully",
        });
      } else {
        return res.status(400).json({
          status: false,
          statusCode: 400,
          message: "Failed to delete user",
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: false,
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  }

  return res.status(405).json({
    status: false,
    statusCode: 405,
    message: "Method Not Allowed",
  });
}
