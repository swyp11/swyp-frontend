"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavigation } from "../../contexts/NavigationContext";
import Image from "next/image";
import { getAssetPath } from "@/utils/assetPath";

interface TabItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
}

export const BottomNavigation = () => {
  const { activeTab, setActiveTab } = useNavigation();

  const getIconColor = (isActive: boolean) => (isActive ? "#562699" : "#1F1E1E");

  const tabItems: TabItem[] = [
    {
      id: "home",
      icon: (
        <Image
          className="relative w-full h-full"
          alt=""
          src={activeTab === "home" ? getAssetPath("/img/home-active.svg") : getAssetPath("/img/home.svg")}
          width={28}
          height={28}
        />
      ),
      label: "홈",
      href: "/main",
      isActive: activeTab === "home",
    },
    {
      id: "style",
      icon: (
        <Image
          className="relative w-full h-full"
          alt=""
          src={activeTab === "style" ? getAssetPath("/img/face-retouching-natural-active.svg") : getAssetPath("/img/face-retouching-natural.svg")}
          width={28}
          height={28}
        />
      ),
      label: "스타일",
      href: "/recommend",
      isActive: activeTab === "style",
    },
    {
      id: "schedule",
      icon: (
        <Image
          className="relative w-full h-full"
          alt=""
          src={activeTab === "schedule" ? getAssetPath("/img/calendar-month-active.svg") : getAssetPath("/img/calendar-month.svg")}
          width={28}
          height={28}
        />
      ),
      label: "일정",
      href: "/schedule",
      isActive: activeTab === "schedule",
    },
    {
      id: "my",
      icon: (
        <Image
          className="relative w-full h-full"
          alt=""
          src={activeTab === "my" ? getAssetPath("/img/person-active.svg") : getAssetPath("/img/person.svg")}
          width={28}
          height={28}
        />
      ),
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
          className="flex flex-col items-center justify-center gap-0.5 py-2 px-2 relative flex-1 h-full bg-white"
          aria-label={tab.label}
          aria-current={tab.isActive ? "page" : undefined}
        >
          <div className="relative w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 flex-shrink-0">
            {tab.icon}
          </div>

          <span
            className={`w-fit label-2 font-[number:var(--label-2-font-weight)] ${tab.isActive ? "text-primary" : "text-on-surface"
              } text-[length:var(--label-2-font-size)] md:text-sm lg:text-base tracking-[var(--label-2-letter-spacing)] leading-[var(--label-2-line-height)] whitespace-nowrap relative flex items-center justify-center [font-style:var(--label-2-font-style)]`}
          >
            {tab.label}
          </span>
        </Link>
      ))}
    </nav>
  );
};
