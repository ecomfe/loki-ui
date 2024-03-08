module.exports = {
  pluginSearchDirs: false,
  plugins: [
    require.resolve('prettier-plugin-organize-imports'),
    require.resolve('prettier-plugin-packagejson'),
  ],
  printWidth: 120,
  proseWrap: 'never',
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 4,
  useTabs: false,
  insertPragma: false,
  bracketSpacing: false,
  overrides: [
    {
      files: '*.md',
      options: {
        proseWrap: 'preserve',
      },
    },
  ],
};
