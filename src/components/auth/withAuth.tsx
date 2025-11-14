"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { LoginRequiredModal } from "@/components/common/LoginRequiredModal";

export function withAuth<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  return function ProtectedRoute(props: P) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        setShowLoginModal(true);
      }
    }, [isAuthenticated, isLoading]);

    const handleLoginConfirm = () => {
      setShowLoginModal(false);
      router.push("/login");
    };

    const handleLoginCancel = () => {
      setShowLoginModal(false);
      router.back();
    };

    // 로딩 중인 경우 로딩 표시
    if (isLoading) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-white">
          <div className="text-on-surface-subtle">로딩 중...</div>
        </div>
      );
    }

    // 인증되지 않은 경우 로딩 화면과 모달 표시
    if (!isAuthenticated) {
      return (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-white">
            <div className="text-on-surface-subtle">로딩 중...</div>
          </div>
          <LoginRequiredModal
            isOpen={showLoginModal}
            onConfirm={handleLoginConfirm}
            onCancel={handleLoginCancel}
          />
        </>
      );
    }

    return <Component {...props} />;
  };
}
