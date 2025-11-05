import type { Preview } from "@storybook/nextjs-vite";
import React from "react";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import "../src/styles/globals.css";
import { NavigationProvider } from "../src/contexts/NavigationContext";

// 폰트 설정 (layout.tsx와 동일)
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const pretendard = localFont({
  src: [
    {
      path: "../node_modules/pretendard/dist/web/static/woff2/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../node_modules/pretendard/dist/web/static/woff2/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../node_modules/pretendard/dist/web/static/woff2/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
});

// Next.js navigation 모킹
const mockRouter = {
    push: () => Promise.resolve(true),
    replace: () => Promise.resolve(true),
    prefetch: () => Promise.resolve(),
    back: () => { },
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
    basePath: "",
    isLocaleDomain: false,
    isReady: true,
    isPreview: false,
};

// 환경 변수 확인용 로그
console.log('🔧 Storybook Preview - NEXT_PUBLIC_BASE_PATH:', process.env.NEXT_PUBLIC_BASE_PATH);

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },

        nextjs: {
            appDirectory: true,
            navigation: {
                pathname: "/",
                query: {},
            },
            router: {
                basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
            },
        },

        a11y: {
            // 'todo' - show a11y violations in the test UI only
            // 'error' - fail CI on a11y violations
            // 'off' - skip a11y checks entirely
            test: "todo"
        },

        viewport: {
            viewports: {
                mobile320: {
                    name: 'Mobile 320px',
                    styles: {
                        width: '320px',
                        height: '667px',
                    },
                },
                mobile360: {
                    name: 'Mobile 360px',
                    styles: {
                        width: '360px',
                        height: '640px',
                    },
                },
                mobile375: {
                    name: 'Mobile 375px (iPhone SE)',
                    styles: {
                        width: '375px',
                        height: '667px',
                    },
                },
                mobile390: {
                    name: 'Mobile 390px (iPhone 12 Pro)',
                    styles: {
                        width: '390px',
                        height: '844px',
                    },
                },
                mobile414: {
                    name: 'Mobile 414px (iPhone Pro Max)',
                    styles: {
                        width: '414px',
                        height: '896px',
                    },
                },
                tablet768: {
                    name: 'Tablet 768px (iPad)',
                    styles: {
                        width: '768px',
                        height: '1024px',
                    },
                },
                desktop1024: {
                    name: 'Desktop 1024px',
                    styles: {
                        width: '1024px',
                        height: '768px',
                    },
                },
                desktop1440: {
                    name: 'Desktop 1440px',
                    styles: {
                        width: '1440px',
                        height: '900px',
                    },
                },
                desktop1920: {
                    name: 'Desktop 1920px (Full HD)',
                    styles: {
                        width: '1920px',
                        height: '1080px',
                    },
                },
            },
            defaultViewport: 'mobile390',
        },
    },

    globalTypes: {
        appWidth: {
            name: 'App Width',
            description: 'CSS variable --app-width (앱 콘텐츠의 최대 너비)',
            defaultValue: '390px',
            toolbar: {
                title: 'App Width',
                icon: 'mobile',
                items: [
                    { value: '320px', title: '320px' },
                    { value: '360px', title: '360px' },
                    { value: '375px', title: '375px' },
                    { value: '390px', title: '390px (Default)' },
                    { value: '414px', title: '414px' },
                    { value: '768px', title: '768px (Tablet)' },
                    { value: '1024px', title: '1024px (Desktop)' },
                    { value: '1440px', title: '1440px (Desktop)' },
                    { value: '1920px', title: '1920px (Full HD)' },
                ],
                dynamicTitle: true,
            },
        },
    },

    decorators: [
        (Story, context) => {
            const appWidth = context.globals.appWidth || '390px';

            return (
                <div 
                    className={`${roboto.variable} ${pretendard.variable} antialiased`}
                    style={{
                        '--app-width': appWidth,
                        '--header-height': '64px',
                        '--footer-height': '64px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        minHeight: '100vh',
                        backgroundColor: '#f5f5f5',
                    } as React.CSSProperties}
                >
                    <div style={{ width: appWidth, maxWidth: '100%' }}>
                        <NavigationProvider>
                            <Story />
                        </NavigationProvider>
                    </div>
                </div>
            );
        },
    ],
};

export default preview;
