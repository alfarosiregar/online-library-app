import { deleteUser, retrieveData, updateUser } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { error } from "console";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const token = req.headers.authorization?.split(" ")[1] || "";
    if (!token) {
      res
        .status(401)
        .json({ status: false, statusCode: 401, message: "Unauthorized" });
    }
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (error: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          const users = await retrieveData("users");
          const data = users.map((user: any) => {
            delete user.password;
            return user;
          });
          return res
            .status(200)
            .json({ status: true, statusCode: 200, message: "success", data });
        } else {
          return res
            .status(403)
            .json({ status: false, statusCode: 403, message: "Access Denied" });
        }
      },
    );
  }

  if (req.method === "PUT") {
    const { data } = req.body;
    const { user }: any = req.query;
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (error: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await updateUser("users", user[1], data, (result: boolean) => {
            if (result) {
              res
                .status(200)
                .json({ status: true, statusCode: 200, message: "success" });
            } else {
              res
                .status(400)
                .json({ status: false, statusCode: 400, message: "failed" });
            }
          });
        } else {
          res
            .status(403)
            .json({ status: false, statusCode: 403, message: "Access Denied" });
        }
      },
    );
  }

  if (req.method === "DELETE") {
    const { user }: any = req.query;
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (error: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await deleteUser("users", user[1], (result: boolean) => {
            if (result) {
              res
                .status(200)
                .json({ status: true, statusCode: 200, message: "success" });
            } else {
              res
                .status(400)
                .json({ status: false, statusCode: 400, message: "failed" });
            }
          });
        } else {
          res
            .status(403)
            .json({ status: false, statusCode: 403, message: "Access Denied" });
        }
      },
    );
  }
}
