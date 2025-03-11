import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { token } = req.body;
    const secretKey = process.env.SECRET_KEY_RECAPTCHA_V2;

    try {
      const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
      );
      if (response.data.success) {
        return res.status(200).json({ success: true });
      } else {
        return res.status(400).json({ success: false });
      }
    } catch (error) {
      return res.status(500).json({ error: "Server Error" });
    }
  }
}
