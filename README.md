# ICE Generator

A web application built with Nuxt 4 and Nuxt UI that allows users to create, edit, and share emergency contact information (ICE - In Case of Emergency) via shareable links and QR codes.

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)

## Live Demo

**[Try ICE Generator](https://pglongo.github.io/ice-generator/)**

## Features

### Form Management
- **Create ICE Forms** - User-friendly interface to input emergency contact information and critical medical details
- **Edit & Persist Data** - Modify ICE data with persistent storage (localStorage)
- **Delete Confirmation** - Safe deletion with confirmation modal for emergency contacts
- **Multi-language Support** - Available in English and Italian

### Sharing & Export
- **QR Code Generation** - Generate printable QR codes (1024x1024 PNG) with shareable links
- **Compressed Links** - Share data via compact URLs using gzip compression
- **Mobile-First Preview** - Modern, touch-friendly preview page optimized for emergency situations
- **Large Call Buttons** - Extra-large tap targets for quick emergency calls

### Privacy & Design
- **Privacy First** - All data stored locally, no server storage
- **Dark Mode** - Full dark mode support via Nuxt UI
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Emergency-Ready UI** - High contrast, clear hierarchy, and quick access to critical information

## Tech Stack

- **Framework**: Nuxt 4.1.3
- **UI Library**: Nuxt UI 4.0.1
- **Language**: TypeScript
- **Runtime**: Vue 3.5.22
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **QR Code**: qrcode.js
- **Compression**: pako (gzip)
- **Internationalization**: @nuxtjs/i18n

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
