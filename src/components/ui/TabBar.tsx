"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface TabItem {
  id: string;
  icon: string;
  label: string;
  href: string;
}

export interface TabBarProps {
  /** Array of tab items */
  items: TabItem[];
  /** Currently active tab id */
  activeTab: string;
  /** Callback when tab is clicked */
  onTabChange?: (tabId: string) => void;
  /** Additional className */
  className?: string;
}

export const TabBar = React.forwardRef<HTMLElement, TabBarProps>(
  ({ items, activeTab, onTabChange, className = "" }, ref) => {
    const handleTabClick = (tabId: string) => {
      if (onTabChange) {
        onTabChange(tabId);
      }
    };

    return (
      <nav
        ref={ref}
        className={`tab-bar ${className}`}
        role="navigation"
        aria-label="Tab navigation"
      >
        {items.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <Link
              key={tab.id}
              href={tab.href}
              onClick={() => handleTabClick(tab.id)}
              className={`tab-item ${isActive ? "tab-item-active" : ""}`}
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
            >
              <Image
                className="tab-item-icon"
                alt=""
                src={tab.icon}
                width={17}
                height={17}
              />
              <span className="tab-item-label">{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    );
  }
);

TabBar.displayName = "TabBar";
