<div align="center">

# 🚨 ICE Generator

### Emergency Contact Information Made Easy

*Create, share, and carry your emergency information with printable QR codes*

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy](https://github.com/PGLongo/ice-generator/actions/workflows/deploy.yml/badge.svg)](https://github.com/PGLongo/ice-generator/actions)

[🌐 Live Demo](https://pglongo.github.io/ice-generator/) • [📖 Documentation](#features) • [🚀 Quick Start](#setup)

</div>

---

## 📱 About

**ICE Generator** is a modern web application that helps you create and share your emergency contact information. Built with Nuxt 4 and Nuxt UI, it generates printable QR codes and shareable links that emergency responders can access instantly.

> **ICE (In Case of Emergency)** - Critical medical and contact information that can save lives in emergencies.

### Why ICE Generator?

- 🏥 **Emergency Ready** - Quick access to vital medical information
- 📱 **Mobile First** - Large buttons optimized for touch in stressful situations
- 🖨️ **Print & Carry** - Generate QR codes to keep in your wallet or phone case
- 🔒 **Privacy Focused** - All data stored locally, nothing sent to servers
- 🌍 **Share Anywhere** - Compressed links work offline after first load

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 📝 Form Management
- ✏️ **Easy Input** - Clean interface for all your info
- 💾 **Auto-Save** - Data persists automatically
- 🗑️ **Safe Delete** - Confirmation before removing contacts
- 🌐 **Multi-Language** - English & Italian support

</td>
<td width="50%">

### 📤 Sharing & Export
- 📲 **QR Code** - High-res (1024x1024) printable codes
- 🔗 **Smart Links** - Gzip-compressed shareable URLs
- 👆 **Touch Optimized** - Extra-large tap targets
- 📱 **Mobile Preview** - Emergency-ready display

</td>
</tr>
<tr>
<td width="50%">

### 🎨 Design
- 🌓 **Dark Mode** - Full theme support
- 📱 **Responsive** - Perfect on any device
- ♿ **Accessible** - WCAG compliant
- ⚡ **Fast** - Static site, instant load

</td>
<td width="50%">

### 🔐 Privacy
- 💻 **Local Storage** - No server uploads
- 🔒 **No Tracking** - Zero analytics
- 🏠 **Self-Hosted** - Deploy anywhere
- 🔓 **Open Source** - Fully transparent

</td>
</tr>
</table>

---

## 🚀 Quick Start

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/PGLongo/ice-generator.git
cd ice-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` 🎉

### 🏗️ Build for Production

```bash
# Build the application
npm run build

# Generate static site (for GitHub Pages, Netlify, etc.)
npm run generate

# Preview production build locally
npm run preview
```

---

## 🎯 How It Works

1. **📝 Fill the Form** - Enter your personal, medical, and emergency contact information
2. **📲 Generate QR** - Click "Generate QR Code" to create a printable image
3. **🖨️ Print & Carry** - Print the QR code and keep it in your wallet/phone case
4. **🚨 Emergency Access** - Anyone can scan the code to see your info instantly

### 💡 Pro Tips

- 🔄 **Update Regularly** - Keep medical info current
- 🖨️ **Multiple Copies** - Print several, keep in wallet, car, gym bag
- 👨‍👩‍👧 **Family Sharing** - Create codes for every family member
- 📱 **Save to Phone** - Keep as a lock screen wallpaper

---

## 🛠️ Tech Stack

<table>
<tr>
<td align="center" width="96">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nuxtjs/nuxtjs-original.svg" width="48" height="48" alt="Nuxt" />
<br>Nuxt 4
</td>
<td align="center" width="96">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg" width="48" height="48" alt="Vue" />
<br>Vue 3
</td>
<td align="center" width="96">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" width="48" height="48" alt="TypeScript" />
<br>TypeScript
</td>
<td align="center" width="96">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" width="48" height="48" alt="Tailwind" />
<br>Tailwind
</td>
</tr>
</table>

**Core Technologies:**
- 🎨 **[Nuxt UI](https://ui.nuxt.com)** - Beautiful UI components
- 🗃️ **[Pinia](https://pinia.vuejs.org/)** - State management
- 📲 **[qrcode.js](https://github.com/soldair/node-qrcode)** - QR code generation
- 🗜️ **[pako](https://github.com/nodeca/pako)** - Gzip compression
- 🌍 **[@nuxtjs/i18n](https://i18n.nuxtjs.org/)** - Internationalization

---

## 📸 Screenshots

### Desktop View
*Clean, modern interface for entering emergency information*

### Mobile Preview
*Large, touch-friendly buttons for quick emergency access*

### QR Code Output
*High-resolution printable QR codes*

---

## 🌍 Deployment

### GitHub Pages (Default)

This project auto-deploys to GitHub Pages on every push to `main`:

```bash
git push origin main
```

### Other Platforms

Deploy to any static hosting:

- **Netlify**: Drag & drop the `dist` folder
- **Vercel**: Connect your GitHub repo
- **Cloudflare Pages**: Connect and deploy
- **Self-Hosted**: Serve the `dist` folder

Check the [Nuxt deployment docs](https://nuxt.com/docs/getting-started/deployment) for more options.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🎉 Open a Pull Request

### Development Guidelines

- ✅ Use conventional commits
- 🧪 Test on mobile devices
- 📝 Update documentation
- 🌐 Add translations (EN/IT)

---

## 📋 Roadmap

- [ ] 📸 Photo upload for medical cards
- [ ] 🔔 Emergency alert system
- [ ] 🩺 Medical condition templates
- [ ] 🐕 Pet emergency profiles
- [ ] 📊 Export to PDF
- [ ] 🔐 Optional encryption
- [ ] ☁️ Cloud backup (optional)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Nuxt UI](https://ui.nuxt.com) by the Nuxt team
- Inspired by the ICE (In Case of Emergency) initiative
- Icons by [Heroicons](https://heroicons.com/)

---

<div align="center">

Made with ❤️ by [PGLongo](https://github.com/PGLongo)

⭐ Star this repo if it helped you!

[Report Bug](https://github.com/PGLongo/ice-generator/issues) • [Request Feature](https://github.com/PGLongo/ice-generator/issues) • [View Demo](https://pglongo.github.io/ice-generator/)

</div>
