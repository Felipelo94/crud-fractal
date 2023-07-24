// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// export async function middleware(request) {
//   const jwt = request.cookies.get("userToken");

//   if (!jwt) return NextResponse.redirect(new URL("/login", request.url));

//   if (jwt) {
//     if (!request.nextUrl.pathname.includes("/")) {
//       try {
//         await jwtVerify(jwt, new TextEncoder().encode("secret"));
//         return NextResponse.redirect(new URL("/dashboard", request.url));
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

import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const redirectToHomeIfNoCookie = (handler) => (req, res) => {
  // Obtener las cookies del cliente desde la solicitud
  const cookies = parse(req.headers.cookie || "");

  // Comprueba si la cookie que buscas está presente (cambia 'nombre_cookie' por el nombre de tu cookie)
  if (!cookies.userToken) {
    // Redirige al inicio si no se encuentra la cookie
    res.writeHead(302, { Location: "/login" });
    res.end();
    return;
  }

  // Si la cookie está presente, llama al controlador original
  return NextResponse.redirect(new URL("/", request.url));
};

export default redirectToHomeIfNoCookie;
