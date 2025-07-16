# Vibe

Vibe lets you create apps and websites by chatting with AI. Instantly generate, deploy, and manage your projects with ease. Powered by Next.js, Prisma, Clerk authentication, TRPC, and a modern UI built with Shadcn and Tailwind CSS.

## Features

- **AI-powered app builder:** Describe what you want to build, and Vibe generates a working project for you.
- **Project dashboard:** View, manage, and revisit all your generated projects.
- **Live code preview:** Instantly see and explore the code for your generated apps.
- **Authentication:** Secure sign-in and sign-up with Clerk.
- **Modern UI:** Responsive, accessible design using Shadcn UI and Tailwind CSS.
- **Project templates:** Quickly start with templates like Netflix, Kanban, Admin Dashboard, and more.
- **Usage tracking:** Free and Pro plans with usage limits.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Hamza-69/vibe
cd vibe
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following variables:

```env
# Database
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# (Optional) Clerk redirect URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# (Optional) App URL for TRPC
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> You can find your Clerk keys in the [Clerk Dashboard](https://dashboard.clerk.com/). For more Clerk environment variables, see the [Clerk docs](https://clerk.com/docs/deployments/clerk-environment-variables).

### 4. Set up the database

Run Prisma migrations to set up your database schema:

```bash
npx prisma migrate deploy
# or, for development:
npx prisma migrate dev
```

### 5. Start the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to use Vibe.

## Usage

1. **Sign up or sign in** with Clerk.
2. **Describe what you want to build** (e.g., "Build a kanban board with drag-and-drop").
3. **Explore your generated project**: preview the app, view the code, and manage your projects from the dashboard.
4. **Upgrade to Pro** for higher usage limits.

## Tech Stack
- Next.js 15+
- Prisma ORM & PostgreSQL
- Clerk (authentication)
- TRPC (API)
- Shadcn UI & Tailwind CSS
- React Query
- Inngest (background jobs)

## Project Structure
- `src/app/` — Next.js app directory (pages, layouts, API routes)
- `src/modules/` — Feature modules (home, projects, messages, usage)
- `src/components/` — Shared UI components
- `prisma/` — Prisma schema and migrations

## Deployment
Vibe is ready to deploy on [Vercel](https://vercel.com/) or any platform supporting Next.js and PostgreSQL. Set all required environment variables in your deployment dashboard.

## License
MIT
