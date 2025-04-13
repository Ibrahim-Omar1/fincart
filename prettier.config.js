/** @type {import('prettier').Config} */
module.exports = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'all',
  printWidth: 80,
  endOfLine: 'lf',
  arrowParens: 'avoid',
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxSingleQuote: true,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  requirePragma: false,
  plugins: ['prettier-plugin-tailwindcss'], // Auto-sorts Tailwind CSS classes
};
