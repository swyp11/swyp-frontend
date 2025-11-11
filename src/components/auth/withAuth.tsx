"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export function withAuth<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  return function ProtectedRoute(props: P) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated, isLoading, router]);

    // 로딩 중이거나 인증되지 않은 경우 아무것도 렌더링하지 않음
    if (isLoading || !isAuthenticated) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="text-on-surface-subtle">로딩 중...</div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
