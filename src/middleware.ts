import withAuth from "./middlewares/withAuth";
import { NextResponse } from "next/server";

export function mainMiddleware() {
  const res = NextResponse.next();
  console.log(res);
  res.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload",
  );

  return res;
}

export default withAuth(mainMiddleware, ["admin", "auth"]);
