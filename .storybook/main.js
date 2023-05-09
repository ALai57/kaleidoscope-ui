module.exports = {
  stories: ["../resources/public/js/compiled/shareable_stories/*_stories.js"],
  addons: ["@storybook/addon-links", "@storybook/addon-actions", "@storybook/addon-essentials"],
  features: {
    storyStoreV7: false,
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  docs: {
    autodocs: true
  }
};
