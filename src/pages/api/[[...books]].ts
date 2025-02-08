import { getData, getDataById } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
  statusCode: number;
  data: any;
  message?: string;
};

export default async function handlerGetBooks(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { product } = req.query;

  if (Array.isArray(product) && product.length > 1) {
    const bookId = product[1];
    const data = await getDataById("books", bookId);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Response untuk detail buku",
      data,
    });
  }

  const data = await getData("books");
  return res.status(200).json({
    status: true,
    statusCode: 200,
    message: "Response untuk semua buku",
    data,
  });
}
