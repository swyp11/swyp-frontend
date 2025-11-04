"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useNavigation } from "../../context/NavigationContext";

interface TabItem {
  id: string;
  icon: string;
  label: string;
  href: string;
  isActive: boolean;
}

export const BottomNavigation = () => {
  const { activeTab, setActiveTab } = useNavigation();

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
      label: "추천",
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
      className="flex items-center relative self-stretch w-full bg-white border-t [border-top-style:solid] border-border-subtlest flex-shrink-0"
      style={{ height: "var(--footer-height)", minHeight: "var(--footer-height)" }}
      role="navigation"
      aria-label="Main navigation"
    >
      {tabItems.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          onClick={() => handleTabClick(tab.id)}
          className={`flex flex-col items-center justify-center gap-0.5 py-2 px-2 relative flex-1 h-full bg-white transition-opacity duration-200 ${
            tab.isActive ? "" : "opacity-40 hover:opacity-60"
          }`}
          aria-label={tab.label}
          aria-current={tab.isActive ? "page" : undefined}
        >
          <Image
            className="relative w-5 h-5 flex-shrink-0"
            alt=""
            src={tab.icon}
            width={20}
            height={20}
          />

          <span
            className={`w-fit font-label-2 font-[number:var(--label-2-font-weight)] ${
              tab.isActive ? "text-primary" : "text-on-surface"
            } text-[length:var(--label-2-font-size)] tracking-[var(--label-2-letter-spacing)] leading-[var(--label-2-line-height)] whitespace-nowrap relative flex items-center justify-center [font-style:var(--label-2-font-style)] text-xs`}
          >
            {tab.label}
          </span>
        </Link>
      ))}
    </nav>
  );
};
