import { type NextRequest } from "next/server";
import { createSupabaseMiddleware } from "@/lib/supabase/middleware";

/**
 * Next.js Middleware — proteksi route /admin/*.
 * Redirect ke /admin/login jika tidak ada sesi aktif.
 * Halaman /admin/login sendiri bisa diakses tanpa sesi.
 */
export async function middleware(request: NextRequest) {
  const { supabase, supabaseResponse } = createSupabaseMiddleware(request);

  // Refresh sesi (penting agar token tidak expired)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Jika mengakses /admin/* (kecuali /admin/login) tanpa sesi → redirect ke login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return Response.redirect(loginUrl);
    }
  }

  // Jika sudah login dan mengakses /admin/login → redirect ke dashboard
  if (pathname === "/admin/login" && user) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/admin";
    return Response.redirect(dashboardUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*"],
};
