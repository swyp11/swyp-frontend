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
    // GitHub Pages 상대 경로 배포 설정
    config.base = './';
    
    if (!config.publicDir) {
      config.publicDir = '../public';
    }
    
    if (!config.define) {
      config.define = {};
    }
    config.define['process.env.NEXT_PUBLIC_BASE_PATH'] = JSON.stringify('');
    
    console.log('🔧 Storybook build config:');
    console.log('   - config.base:', config.base);
    console.log('   - config.publicDir:', config.publicDir);
    
    return config;
  }
};

export default config;