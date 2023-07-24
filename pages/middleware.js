import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const jwt = request.cookies.get("userToken");

  if (!jwt) return NextResponse.redirect(new URL("/login", request.url));

  if (jwt) {
    if (!request.nextUrl.pathname.includes("/")) {
      try {
        await jwtVerify(jwt, new TextEncoder().encode("secret"));
        return NextResponse.redirect(new URL("/dashboard", request.url));
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
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["//:path*"],
};