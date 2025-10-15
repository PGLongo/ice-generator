# ICE Generator

A web application built with Nuxt 4 and Nuxt UI that allows users to create, edit, and export emergency contact information (ICE - In Case of Emergency) as standalone HTML pages designed to be stored on NFC tags.

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)

## Live Demo

**[Try ICE Generator](https://pglongo.github.io/ice-generator/)**

## Features

- **Create ICE Forms** - User-friendly interface to input emergency contact information and critical medical details
- **Edit & Persist Data** - Modify ICE data with persistent storage (localStorage)
- **Export to HTML** - Generate standalone, optimized HTML pages for NFC tags
- **Multi-language Support** - Available in English and Italian
- **Dark Mode** - Full dark mode support via Nuxt UI
- **Privacy First** - All data stored locally, no server storage

## Tech Stack

- **Framework**: Nuxt 4.1.3
- **UI Library**: Nuxt UI 4.0.1
- **Language**: TypeScript
- **Runtime**: Vue 3.5.22
- **Styling**: Tailwind CSS
- **State Management**: Pinia

## Setup

Make sure to install the dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Generate static site:

```bash
npm run generate
```

Locally preview production build:

```bash
npm run preview
```

## Deployment

This project is configured to deploy automatically to GitHub Pages via GitHub Actions whenever changes are pushed to the main branch.

Check out the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## License

MIT
