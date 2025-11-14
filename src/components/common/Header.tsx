"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  return (
    <header className="flex items-center relative self-stretch w-full flex-[0_0_auto] bg-surface-1">
      <div className="flex items-center gap-2.5 p-4 relative flex-1 grow bg-white">
        <Link href="/">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/Logo.svg`}
            alt="로고"
            width={47}
            height={30}
            className="cursor-pointer"
          />
        </Link>
      </div>

      {isAuthenticated && (
        <div className="inline-flex items-start gap-2.5 pl-4 pr-[17px] py-4 relative flex-[0_0_auto] bg-white">
          <button
            type="button"
            aria-label="Notifications"
            className="relative w-6 h-6"
            onClick={() => router.push("/notifications")}
          >
            <Image
              className="relative w-6 h-6"
              alt=""
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/notifications.svg`}
              width={24}
              height={24}
            />
            <span
              className="absolute top-3 left-[calc(50.00%_+_8px)] w-2 h-2 bg-alert rounded-[999px]"
              aria-label="Unread notifications"
            />
          </button>
        </div>
      )}
    </header>
  );
};
