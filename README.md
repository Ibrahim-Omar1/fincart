# Next.js Project Template

A modern Next.js 15 project template with TypeScript, ESLint, Prettier, and Tailwind CSS.

## Features

- ⚡️ [Next.js 15](https://nextjs.org/) with App Router
- 🔥 [TypeScript](https://www.typescriptlang.org/) for type safety
- 💅 [Tailwind CSS](https://tailwindcss.com/) for styling
- 📏 [ESLint](https://eslint.org/) for code linting
- 💖 [Prettier](https://prettier.io/) for code formatting
- 🎯 Pre-configured with:
  - React 19 with Server Components
  - TypeScript strict mode
  - Import sorting and organization
  - Accessibility (a11y) rules
  - Tailwind CSS class sorting

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd [project-name]
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Workflow

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Check for linting errors
- `npm run lint:fix` - Fix linting errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Code Style

This project uses ESLint and Prettier for code style and formatting. The configuration enforces:

- TypeScript strict mode
- React best practices
- Accessibility standards
- Import organization
- Consistent code style

#### VS Code Setup

For the best development experience, install these VS Code extensions:

- ESLint
- Prettier
- Tailwind CSS IntelliSense

Add this to your VS Code settings:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Project Structure

```
├── app/                # Next.js App Router
│   ├── components/     # React components
│   ├── lib/           # Utility functions
│   └── page.tsx       # Home page
├── public/            # Static files
├── styles/           # Global styles
├── .eslintrc.js      # ESLint configuration
├── .prettierrc.js    # Prettier configuration
├── next.config.js    # Next.js configuration
└── tsconfig.json     # TypeScript configuration
```

### Best Practices

1. **Components**

   - Use functional components with TypeScript
   - Follow single responsibility principle
   - Implement proper error boundaries
   - Use proper prop typing

2. **State Management**

   - Use React hooks for local state
   - Implement proper data fetching strategies
   - Follow Server Components patterns

3. **Performance**

   - Implement proper code splitting
   - Use Image component for images
   - Follow Core Web Vitals guidelines

4. **Accessibility**
   - Ensure proper ARIA attributes
   - Maintain keyboard navigation
   - Provide proper alt texts
   - Follow semantic HTML structure

## Deployment

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# fincart
