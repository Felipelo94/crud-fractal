import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const jwt = req.cookies.get("userToken");

  if (!jwt) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (jwt) {
    if (req.nextUrl.pathname.includes("/login")) {
      try {
        await jwtVerify(jwt, new TextEncoder().encode("secret"));
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } catch (error) {
        return NextResponse.next();
      }
    }
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
