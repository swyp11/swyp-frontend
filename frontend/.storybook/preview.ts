import type { Preview } from "@storybook/nextjs-vite";
import "../src/styles/globals.css";

// Next.js navigation 모킹
const mockRouter = {
    push: () => Promise.resolve(true),
    replace: () => Promise.resolve(true),
    prefetch: () => Promise.resolve(),
    back: () => {},
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
    basePath: "",
    isLocaleDomain: false,
    isReady: true,
    isPreview: false,
};

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
        },

        a11y: {
            // 'todo' - show a11y violations in the test UI only
            // 'error' - fail CI on a11y violations
            // 'off' - skip a11y checks entirely
            test: "todo"
        }
    },
};

export default preview;
