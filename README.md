# Writespace landing page

A pre-launch waitlist site built with Next.js App Router, TypeScript, Tailwind CSS, and the Writespace design tokens.

## About the Platform

Writespace is a social blogging platform designed around developers and technical communities.

The idea is to bring content creation and social interaction together in one platform. Instead of limiting users to traditional blog publishing, Writespace aims to provide an environment where developers can share short-form thoughts, publish detailed articles, connect with other developers, and participate in technical discussions.

The platform supports two primary content types:

- **Posts:** For sharing thoughts, updates, ideas, and shorter-form content.
- **Articles:** For publishing structured, long-form technical content.

Both content types are built around a shared content identity, allowing common platform features such as reactions, comments, saves, and shares to work consistently.

### Platform Features

- Create and manage Posts and long-form Articles.
- Draft, scheduled, and published content states.
- Multiple reaction types, threaded comments, and comment reactions.
- Save content for later and share across platforms.
- User follow relationships.
- User authentication with OTP-based verification and password recovery.
- Notifications and background processing.

## About This Repository

This repository contains the public-facing landing page for Writespace — the site that introduces the platform before launch and collects the early-access waitlist.

The landing page covers:

- The marketing site and its page sections.
- The waitlist capture experience.
- Illustrative product UI mocks of the platform.
- The shared Writespace design token system.
- Responsive layout, typography, and visual identity.

The application backend lives in a separate repository.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — run the production server
- `npm run lint` — run ESLint

## Project structure

- `src/app` — App Router entry points and global styles
- `src/components/ui` — small reusable interface components
- `src/components/sections` — page sections
- `src/components/mocks` — illustrative product UI mocks
- `src/lib` — shared helpers and utilities
- `public/images` — static image assets
- `public/video` — static video assets
