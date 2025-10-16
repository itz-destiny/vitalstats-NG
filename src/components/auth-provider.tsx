"use client";

import { useUser } from "@/firebase";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const publicRoutes = ["/login", "/signup"];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isUserLoading) return; // Wait for user state to be determined

    const isPublicRoute = publicRoutes.includes(pathname);

    if (!user && !isPublicRoute) {
      router.replace("/login");
    } else if (user && isPublicRoute) {
      router.replace("/");
    }
  }, [user, isUserLoading, router, pathname]);

  if (isUserLoading) {
    // You can return a loading spinner here
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-lg font-semibold">Loading...</div>
        </div>
    )
  }
  
  if (!user && !publicRoutes.includes(pathname)) {
    return null;
  }
  
  if (user && publicRoutes.includes(pathname)) {
    return null;
  }

  return <>{children}</>;
}
