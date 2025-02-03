import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const SECRET = process.env.JWT_SECRET;
  if (!SECRET) {
    console.error("JWT_SECRET no está definido");
    return NextResponse.redirect(new URL("/auth/signin?error=server", req.url));
  }

  const jwt = req.cookies.get("authToken");
  if (!jwt)
    return NextResponse.redirect(
      new URL("/auth/signin?error=unauthenticated", req.url)
    );

  try {
    const { payload } = await jwtVerify(
      jwt.value,
      new TextEncoder().encode(SECRET)
    );

    if (!payload || !payload.exp) {
      return NextResponse.redirect(
        new URL("/auth/signin?error=invalid", req.url)
      );
    }

    if (Date.now() >= payload.exp * 1000) {
      return NextResponse.redirect(
        new URL("/auth/signin?error=expired", req.url)
      );
    }

    return NextResponse.next();
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Invalid token";
    return NextResponse.redirect(
      new URL("/auth/signin?error=" + errMessage, req.url)
    );
  }
}

export const config = {
  matcher: [
    /* "/dashboard/:path*" */
  ],
};
