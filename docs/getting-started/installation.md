# Installation Guide

## Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)
- Git

## Setup Steps

1. Clone the repository:

```bash
git clone https://github.com/ansopedia/creator-studio.git
cd creator-studio
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

### 4. Start the development server

```bash
pnpm dev
```

## Project Structure

```text
creator-studio/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # Reusable components
│   ├── lib/             # Utility functions
│   ├── types/           # TypeScript type definitions
│   └── styles/          # Global styles
├── public/              # Static assets
├── docs/               # Documentation
└── tests/              # Test files
```
