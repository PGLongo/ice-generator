<div align="center">

# 🚨 SmICE
### ICE + NFC + QR + Tags

*Smart Emergency Contact Information - Bridge the gap between location tracking and emergency contacts*

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy](https://github.com/PGLongo/ice-generator/actions/workflows/deploy.yml/badge.svg)](https://github.com/PGLongo/ice-generator/actions)

[🌐 Live Demo](https://pglongo.github.io/ice-generator/) • [📖 Documentation](#features) • [🚀 Quick Start](#setup)

</div>

---

## 📱 About

**SmICE** is a smart emergency contact platform that unifies ICE (In Case of Emergency) information with modern technology. Built with Nuxt 4 and Nuxt UI, it bridges the gap between location tracking devices (AirTag, Samsung SmartTag, Tile) and emergency contact information through QR codes, NFC tags, and PDF generation.

> **ICE (In Case of Emergency)** - Critical medical and contact information that can save lives in emergencies.

### Why SmICE?

- 🏷️ **Smart Integration** - Works with AirTag, Samsung SmartTag2, and Tile trackers
- 📱 **Universal Use Cases** - Children, pets, luggage, valuables, elderly care
- 📄 **PDF Generation** - Print emergency cards with embedded QR codes
- 🔗 **NFC Compatible** - Generate links optimized for NFC tag storage
- 🔒 **Privacy First** - All data stored locally, no cloud uploads
- 🚨 **Emergency Ready** - Bridge the gap between "finding" and "contacting"

---

## 🆕 What's New in v0.1.3 - SmICE Launch

### 🚀 Complete Rebranding to SmICE
- **Smart Integration** - ICE + NFC + QR + Tags unified platform
- **New Landing Page** - Animated hero section showing technology unity
- **Nicolò's Story** - Real-world inspiration for the platform
- **Universal Applications** - Beyond children: pets, luggage, valuables

### 📄 Enhanced Export System
- **PDF Generation** - Professional emergency cards with embedded QR codes
- **NFC Optimization** - Links designed for NFC tag storage limits
- **Location Tracker Integration** - AirTag, Samsung SmartTag2, Tile compatibility
- **Removed HTML Export** - Replaced with more practical PDF + QR solution

### 🏫 School Cards Enhanced
- **Improved Design** - Better print optimization
- **QR Integration** - Direct call functionality for emergency referents
- **Professional Layout** - A4 landscape format

### 🌐 Complete Internationalization
- **Landing Page Translations** - Full EN/IT support for new content
- **Story Integration** - Nicolò's case study in both languages
- **Use Case Examples** - Translated scenarios for universal appeal

[View Full Changelog →](CHANGELOG.md)

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
- 🏫 **School Cards** - Printable student ID cards with QR codes

</td>
<td width="50%">

### 📤 Smart Export & Sharing
- 📄 **PDF Generation** - Professional emergency cards with QR codes
- 📲 **QR Codes** - Phone/email optimized with tel: and mailto: protocols
- 🔗 **NFC Links** - Compressed URLs for NFC tag storage
- 🏷️ **Tag Integration** - Works with AirTag, SmartTag2, Tile trackers
- 📱 **Universal Access** - Direct call/email functionality from QR scan

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

## 🎯 How SmICE Works

### 🏷️ The SmICE Concept
**The Problem**: Location trackers (AirTag, SmartTag) help you *find* lost items, but what if someone finds them and wants to *contact* you?

**The Solution**: SmICE bridges this gap by providing emergency contact information through QR codes, NFC tags, and PDF cards.

### Personal Emergency Cards
1. **📝 Complete Profile** - Personal, medical, and emergency contact information
2. **📄 Generate PDF** - Professional emergency card with embedded QR codes
3. **🖨️ Print & Attach** - Attach to luggage, pet collars, or valuable items
4. **📱 Instant Contact** - Finders can call/email directly from QR scan

### Smart Tag Integration
1. **🏷️ Choose Your Tracker** - AirTag, Samsung SmartTag2, or Tile
2. **🔗 Generate NFC Link** - Create compressed URL for tag storage
3. **📲 Program Tag** - Write SmICE link to your NFC-enabled tracker
4. **🔄 Dual Functionality** - Track location AND provide contact info

### School Safety Cards
1. **📋 School Information** - Student details and school data
2. **👨‍👩‍👧 Emergency Referent** - Direct contact with QR code
3. **🖨️ Professional Cards** - A4 landscape student ID cards
4. **📱 One-Tap Calling** - Emergency contacts accessible via QR scan

### 💡 SmICE Pro Tips

#### For Parents (Nicolò's Story)
- 🧒 **Child Safety** - "Dad, you can find me, but how do I call you when found?"
- 🎒 **School Bags** - Attach SmICE tags to backpacks with emergency contacts
- 🏫 **School Cards** - Print professional ID cards with direct parent contact

#### Universal Applications
- 🐕 **Pet Safety** - Collar tags with vet and owner contact information
- ✈️ **Travel Luggage** - International contact info for lost baggage
- 👴 **Elderly Care** - Medical information and family emergency contacts
- 💎 **Valuables** - Camera gear, laptops, equipment with owner contact

#### Technical Tips
- 🏷️ **NFC Programming** - Use apps like "NFC Tools" to write SmICE links
- 📱 **QR Testing** - Test QR codes with different scanner apps
- 🔄 **Regular Updates** - Keep medical and contact information current
- 📄 **Backup Copies** - Print multiple PDF cards for different locations

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
- 📄 **[jsPDF](https://github.com/parallax/jsPDF)** - PDF generation
- 🗜️ **[pako](https://github.com/nodeca/pako)** - URL compression for NFC
- 🌍 **[@nuxtjs/i18n](https://i18n.nuxtjs.org/)** - Full internationalization

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

### ✅ Completed (v0.1.3 - SmICE Launch)
- [x] 🚀 Complete rebranding to SmICE platform
- [x] 📄 PDF generation with embedded QR codes
- [x] 🏷️ NFC tag integration with compressed URLs
- [x] 🔗 Location tracker compatibility (AirTag, SmartTag2, Tile)
- [x] 🌐 Animated landing page with technology unity
- [x] 📱 Enhanced QR system with tel:/mailto: protocols
- [x] 🏫 Professional school cards with emergency contacts
- [x] 🌍 Complete internationalization (EN/IT)

### 🚧 Coming Soon
- [ ] 📸 Photo integration for medical/ID cards
- [ ] 🔔 Emergency notification system
- [ ] 🩺 Medical condition templates
- [ ] 🐕 Dedicated pet profile templates
- [ ] 🔐 Optional data encryption
- [ ] ☁️ Cloud backup (privacy-focused)
- [ ] 📊 Usage analytics and insights
- [ ] 🌐 Additional language support

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