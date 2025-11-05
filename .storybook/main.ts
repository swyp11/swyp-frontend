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
    // GitHub Pages 배포 설정
    const isGithubPages = process.env.STORYBOOK_GITHUB_PAGES === 'true';
    const basePath = isGithubPages ? '/swyp-frontend' : '';

    config.base = isGithubPages ? '/swyp-frontend/' : './';

    if (!config.publicDir) {
      config.publicDir = '../public';
    }

    if (!config.define) {
      config.define = {};
    }
    // 환경변수로 basePath 전달
    config.define['process.env.NEXT_PUBLIC_BASE_PATH'] = JSON.stringify(basePath);

    console.log('🔧 Storybook build config:');
    console.log('   - isGithubPages:', isGithubPages);
    console.log('   - basePath:', basePath);
    console.log('   - config.base:', config.base);
    console.log('   - config.publicDir:', config.publicDir);

    return config;
  }
};

export default config;