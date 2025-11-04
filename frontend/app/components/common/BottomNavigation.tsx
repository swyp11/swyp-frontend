"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface TabItem {
  id: string;
  icon: string;
  label: string;
  href: string;
  isActive: boolean;
}

export const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState<string>("home");

  const tabItems: TabItem[] = [
    {
      id: "home",
      icon: "/img/home.svg",
      label: "홈",
      href: "/main",
      isActive: activeTab === "home",
    },
    {
      id: "style",
      icon: "/img/face-retouching-natural.svg",
      label: "스타일",
      href: "/recommend",
      isActive: activeTab === "style",
    },
    {
      id: "schedule",
      icon: "/img/calendar-month.svg",
      label: "일정",
      href: "/schedule",
      isActive: activeTab === "schedule",
    },
    {
      id: "my",
      icon: "/img/person.svg",
      label: "마이",
      href: "/my",
      isActive: activeTab === "my",
    },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <nav
      className="flex items-start relative self-stretch w-full flex-[0_0_auto] bg-white border-t [border-top-style:solid] border-border-subtlest"
      role="navigation"
      aria-label="Main navigation"
    >
      {tabItems.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          onClick={() => handleTabClick(tab.id)}
          className={`flex flex-col items-center justify-center gap-0.5 py-3 px-4 relative flex-1 self-stretch grow bg-white ${tab.isActive ? "" : "opacity-40"
            }`}
          aria-label={tab.label}
          aria-current={tab.isActive ? "page" : undefined}
        >
          <Image
            className="relative w-5 h-5"
            alt=""
            src={tab.icon}
            width={20}
            height={20}
          />

          <span
            className={`w-fit font-label-2 font-[number:var(--label-2-font-weight)] ${tab.isActive ? "text-primary" : "text-on-surface"
              } text-[length:var(--label-2-font-size)] tracking-[var(--label-2-letter-spacing)] leading-[var(--label-2-line-height)] whitespace-nowrap relative flex items-center justify-center [font-style:var(--label-2-font-style)]`}
          >
            {tab.label}
          </span>
        </Link>
      ))}
    </nav>
  );
};
