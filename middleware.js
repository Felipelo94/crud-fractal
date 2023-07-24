import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const jwt = req.cookies.get("userToken");

  if (!jwt) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode("secret")
    );
    console.log({ payload });
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/login/:path*"],
};
