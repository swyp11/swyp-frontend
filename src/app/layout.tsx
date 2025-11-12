"use client";

import { Roboto } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import "../styles/globals.css";
import { NavigationProvider } from "../contexts/NavigationContext";
import { AuthProvider } from "../contexts/AuthContext";
import { QueryProvider } from "../providers/QueryProvider";
import { Header } from "../components/common/Header";
import { BottomNavigation } from "../components/common/BottomNavigation";
import { usePathname } from "next/navigation";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const pretendard = localFont({
  src: [
    {
      path: "../../node_modules/pretendard/dist/web/static/woff2/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/pretendard/dist/web/static/woff2/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../node_modules/pretendard/dist/web/static/woff2/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  
  // Header와 Bottom Navigation을 숨길 페이지 목록
  const hideNavigationPaths = [
    '/login',
    '/signup',
    '/signup/step2',
    '/signup/step3',
    '/signup/complete',
    '/schedule/add',
    '/search',
    '/forgot-password',
    '/my/profile',
    '/my/profile/edit',
  ];

  // 동적 경로를 체크하는 함수
  const isDynamicPathHidden = (path: string) => {
    // /detail/[id] 형태의 경로 체크
    if (path.startsWith('/detail/')) {
      return true;
    }
    // /forgot-password/[step] 형태의 경로 체크
    if (path.startsWith('/forgot-password/')) {
      return true;
    }
    return false;
  };
  
  // Header만 숨길 페이지 목록 (BackHeader를 사용하는 페이지)
  const hideHeaderOnlyPaths = [
    '/my/settings',
    '/my/favorites',
    '/my/reviews'
  ];
  
  const shouldHideHeader = hideNavigationPaths.includes(pathname) || hideHeaderOnlyPaths.includes(pathname) || isDynamicPathHidden(pathname);
  const shouldHideBottomNav = hideNavigationPaths.includes(pathname) || isDynamicPathHidden(pathname);
  
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${roboto.variable} ${pretendard.variable} antialiased`}
      >
        <QueryProvider>
          <AuthProvider>
            <NavigationProvider>
              <div
                className="flex flex-col h-screen items-start relative bg-white mx-auto"
                style={{ width: "var(--app-width)", maxWidth: "100vw" }}
              >
              {/* Fixed Header */}
              {!shouldHideHeader && (
                <div
                  className="fixed top-0 left-1/2 -translate-x-1/2 z-50"
                  style={{ width: "var(--app-width)" }}
                >
                  <Header />
                </div>
              )}

              {/* Scrollable Content */}
              <div
                className="flex-1 w-full overflow-y-auto"
                style={{
                  paddingTop: shouldHideHeader ? "0" : "var(--header-height)",
                  paddingBottom: shouldHideBottomNav ? "0" : "var(--footer-height)"
                }}
              >
                {children}
              </div>

              {/* Fixed Bottom Navigation */}
              {!shouldHideBottomNav && (
                <div
                  className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50"
                  style={{ width: "var(--app-width)" }}
                >
                  <BottomNavigation />
                </div>
              )}
              </div>
            </NavigationProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
