"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface NavigationContextType {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};

interface NavigationProviderProps {
  children: React.ReactNode;
}

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const [activeTab, setActiveTab] = useState<string>("home");
  const pathname = usePathname();

  // 현재 경로에 따라 activeTab 설정
  useEffect(() => {
    if (pathname.startsWith("/main")) {
      setActiveTab("home");
    } else if (pathname.startsWith("/recommend")) {
      setActiveTab("style");
    } else if (pathname.startsWith("/schedule")) {
      setActiveTab("schedule");
    } else if (pathname.startsWith("/my")) {
      setActiveTab("my");
    }
  }, [pathname]);

  return (
    <NavigationContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </NavigationContext.Provider>
  );
};