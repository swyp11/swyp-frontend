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
      console.log('🔧 Storybook build config: GitHub Pages mode');
      console.log('   - config.base:', config.base);
    }
    
    // public 폴더의 정적 파일 처리
    if (!config.publicDir) {
      config.publicDir = '../public';
    }
    
    console.log('🔧 Environment variables:');
    console.log('   - GITHUB_PAGES:', process.env.GITHUB_PAGES);
    console.log('   - NEXT_PUBLIC_BASE_PATH:', process.env.NEXT_PUBLIC_BASE_PATH);
    console.log('   - config.publicDir:', config.publicDir);
    
    return config;
  }
};

export default config;