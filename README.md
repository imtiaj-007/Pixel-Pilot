# Admin Dashboard

A modern, customizable admin dashboard built with Next.js and `shadcn/ui` to showcase frontend development skills. Features include a tree-view navigation, reusable components, multiple dashboards, forms, and more.

![Preview](public/window.svg)

## Features

- **Modern UI**: Built with `shadcn/ui` for reusable, customizable components.
- **Tree-View Navigation**: Collapsible sidebar for easy navigation.
- **Multiple Dashboards**: Analytics, settings, and other sub-pages.
- **Responsive Design**: Works on all screen sizes.
- **Dark Mode**: Toggle between light and dark themes.
- **Forms & Tables**: Built with React Hook Form and `shadcn/ui` components.
- **Data Visualization**: Integrated charts for analytics.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **UI Library**: [`shadcn/ui`](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Forms**: [React Hook Form](https://react-hook-form.com/)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm/yarn/pnpm/bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/admin-dashboard.git
   cd admin-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```plaintext
src/
  app/                  # Next.js app router
    layout.tsx          # Root layout (header + sidebar)
    page.tsx            # Homepage
    dashboard/          # Sub-pages
      analytics/
        page.tsx
      settings/
        page.tsx
  components/           # Reusable components
    ui/                 # shadcn/ui components
    sidebar/            # Tree-view navigation
    header/             # Modern header
  lib/                  # Utilities and constants
```

## Customization

- **Themes**: Edit `tailwind.config.js` to customize colors.
- **Components**: Use `shadcn/ui` CLI to add or modify components:
  ```bash
  npx shadcn-ui@latest add button
  ```

## Screenshots

<!-- Add screenshots of your dashboards here later -->

## License

MIT

---

**Showcase your work!** Deploy this project on [Vercel](https://vercel.com/) and share it with your network.