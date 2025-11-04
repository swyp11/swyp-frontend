"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavigation } from "../../contexts/NavigationContext";

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
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z"
            fill={getIconColor(activeTab === "home")}
          />
        </svg>
      ),
      label: "홈",
      href: "/main",
      isActive: activeTab === "home",
    },
    {
      id: "style",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 11.75C8.31 11.75 7.75 11.19 7.75 10.5C7.75 9.81 8.31 9.25 9 9.25C9.69 9.25 10.25 9.81 10.25 10.5C10.25 11.19 9.69 11.75 9 11.75ZM15 11.75C14.31 11.75 13.75 11.19 13.75 10.5C13.75 9.81 14.31 9.25 15 9.25C15.69 9.25 16.25 9.81 16.25 10.5C16.25 11.19 15.69 11.75 15 11.75ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 11.71 4.02 11.42 4.05 11.14C6.41 10.09 8.28 8.16 9.26 5.77C11.07 8.33 14.05 10 17.42 10C18.2 10 18.95 9.91 19.67 9.74C19.88 10.45 20 11.21 20 12C20 16.41 16.41 20 12 20Z"
            fill={getIconColor(activeTab === "style")}
          />
        </svg>
      ),
      label: "스타일",
      href: "/recommend",
      isActive: activeTab === "style",
    },
    {
      id: "schedule",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM19 8H5V6H19V8ZM12 13H17V18H12V13Z"
            fill={getIconColor(activeTab === "schedule")}
          />
        </svg>
      ),
      label: "일정",
      href: "/schedule",
      isActive: activeTab === "schedule",
    },
    {
      id: "my",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
            fill={getIconColor(activeTab === "my")}
          />
        </svg>
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
          <div className="relative w-5 h-5 flex-shrink-0">
            {tab.icon}
          </div>

          <span
            className={`w-fit label-2 font-[number:var(--label-2-font-weight)] ${
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
