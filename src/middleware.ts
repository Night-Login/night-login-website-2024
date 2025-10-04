import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected dashboard routes
  const protectedRoutes = [
    "/dashboard",
    "/dashboard/request",
    "/dashboard/history",
    "/dashboard/guide",
    "/dashboard/faq",
  ];

  // Public routes that don't need auth
  const publicRoutes = ["/", "/about", "/projects", "/wallpapers", "/coming-soon", "/talent-pool"];
  
  // Auth routes
  const authRoutes = ["/requests/login", "/requests/register"];
  
  // Onboarding route
  const onboardingRoute = "/onboarding";

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Use NextAuth's getToken to verify the JWT token
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      // No valid session found - redirect to login page
      const loginUrl = new URL("/requests/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check if user has completed onboarding
    if (!token.onboardingCompleted && pathname !== onboardingRoute) {
      // Redirect to onboarding if not completed
      const onboardingUrl = new URL(onboardingRoute, request.url);
      return NextResponse.redirect(onboardingUrl);
    }

    // Token is valid and onboarding complete, allow the request to proceed
    return NextResponse.next();
  }

  // If user is authenticated and tries to access onboarding but already completed it
  if (pathname === onboardingRoute) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (token && token.onboardingCompleted) {
      // Already completed onboarding, redirect to dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // If user is authenticated and tries to access auth routes
  if (authRoutes.includes(pathname)) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (token) {
      // User is authenticated, check onboarding status
      if (!token.onboardingCompleted) {
        return NextResponse.redirect(new URL(onboardingRoute, request.url));
      } else {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/dashboard/:path*",
  ],
};
