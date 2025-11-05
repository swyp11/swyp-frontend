import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {}
  },
  staticDirs: ['../public'],
  viteFinal: async (config) => {
    // GitHub Pages 배포를 위한 base path 설정
    if (process.env.GITHUB_PAGES === 'true') {
      config.base = '/swyp-frontend/';
    }
    
    // public 폴더의 정적 파일 처리
    if (!config.publicDir) {
      config.publicDir = '../public';
    }
    
    return config;
  }
};

export default config;