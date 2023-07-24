// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// export async function middleware(request) {
//   const jwt = request.cookies.get("userToken");

//   if (!jwt) return NextResponse.redirect(new URL("/login", request.url));

//   if (jwt) {
//     if (!request.nextUrl.pathname.includes("/")) {
//       try {
//         await jwtVerify(jwt, new TextEncoder().encode("secret"));
//         return NextResponse.redirect(new URL("/", request.url));
//       } catch (error) {
//         return NextResponse.next();
//       }
//     }
//   }

//   try {
//     const { payload } = await jwtVerify(
//       jwt,
//       new TextEncoder().encode("secret")
//     );
//     console.log({ payload });
//     return NextResponse.next();
//   } catch (error) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }
// }

// export const config = {
//   matcher: ["//:path*"],
// };
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const jwt = request.cookies.get("userToken");

  if (!jwt) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode("secret");
    const { payload } = await jwtVerify(jwt, secret);

    if (!request.nextUrl.pathname.includes("/")) {
      // Redirect to the home page if the path doesn't include "/"
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      console.log({ payload });
      return NextResponse.next();
    }
  } catch (error) {
    // Redirect to the login page if JWT verification fails
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["//:path*"],
};
