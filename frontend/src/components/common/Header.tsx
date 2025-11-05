"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  return (
    <header className="flex items-center relative self-stretch w-full flex-[0_0_auto] bg-surface-1">
      <div className="flex items-center gap-2.5 p-4 relative flex-1 grow bg-white">
        <Link href="/">
          <h1 className="relative flex items-center justify-center w-fit mt-[-1.00px] title-1 font-[number:var(--title-1-font-weight)] text-primary text-[length:var(--title-1-font-size)] tracking-[var(--title-1-letter-spacing)] leading-[var(--title-1-line-height)] whitespace-nowrap [font-style:var(--title-1-font-style)] cursor-pointer">
            LOGO
          </h1>
        </Link>
      </div>

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
            src="/img/notifications.svg"
            width={24}
            height={24}
          />
          <span
            className="absolute top-3 left-[calc(50.00%_+_8px)] w-2 h-2 bg-alert rounded-[999px]"
            aria-label="Unread notifications"
          />
        </button>
      </div>
    </header>
  );
};
