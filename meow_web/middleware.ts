import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ req, token }) => {
      console.log("[Middleware] Route:", req.nextUrl.pathname);
      console.log("[Middleware] Token decoded:", token ? "YES" : "NO");
      if (!token) {
        console.log("[Middleware] Missing or invalid token! Rejecting access.");
      }
      return !!token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/tasks/:path*",
    "/api/settings/:path*",
    "/portal/:path*",
    "/disturbance/:path*",
  ],
};
