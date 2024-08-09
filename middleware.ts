import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/"]);
const publicRoutes = ["/", "/api/webhooks(.*)"];

const isPublicRoute = (request: Request) => {
  const url = new URL(request.url);
  return publicRoutes.includes(url.pathname);
};

export default clerkMiddleware((auth, request) => {
  if (isProtectedRoute(request) && !isPublicRoute(request)) {
    auth().protect();
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
