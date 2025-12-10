# CareCard 🏥

**Your digital emergency card - Always with you, always ready**

CareCard is a modern emergency contact platform that creates digital emergency cards with smart technology. Generate QR codes, NFC tags, and PDF cards for universal compatibility and instant access to emergency information.

![CareCard Demo](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=CareCard+Demo)

## ✨ Features

### 🚨 **Emergency Ready**
- **Instant Access**: QR codes and NFC tags for immediate contact information
- **Universal Compatibility**: Works on any smartphone without apps
- **Multilingual**: Full support for English and Italian

### 🏷️ **Multiple Formats**
- **Digital Cards**: Share via URL with encrypted data
- **PDF Generation**: Professional printable emergency cards
- **QR Codes**: Downloadable PNG files for physical items
- **NFC Tags**: Optimized data compression for tag storage limits

### 🔐 **Security & Privacy**
- **Server-side Encryption**: AES-256-GCM encryption for shared data
- **Local Storage**: All data stored on your device
- **No Registration**: No accounts or personal data collection
- **URL Safe**: Encrypted links safe for QR codes and NFC tags

### 🎯 **Use Cases**
- **Children**: School cards with parent contacts and medical info
- **Elderly**: Medical conditions, medications, emergency contacts
- **Travelers**: Passport info, embassy contacts, medical conditions
- **Pets**: Owner contact, vet info, medical needs
- **Luggage**: Return contact information for lost items

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Production
```bash
# Build for production
npm run build

# Generate static files
npm run generate

# Preview production build
npm run preview
```

## 🛠️ Technology Stack

- **Framework**: Nuxt 4.1.3
- **UI Library**: Nuxt UI 4.0.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Vitest 3.2.4
- **Encryption**: AES-256-GCM (server-side)
- **PDF Generation**: jsPDF
- **QR Codes**: qrcode library

## 📱 How It Works

### 1. **Create Your Card**
Fill in your emergency information:
- Personal details (name, age, medical conditions)
- Emergency contacts with phone and email
- Medical information (allergies, medications)
- Special instructions

### 2. **Generate & Share**
Choose your format:
- **URL Link**: Encrypted shareable link
- **QR Code**: Download PNG for printing/stickers
- **PDF Card**: Professional emergency card
- **NFC Tag**: Write data to NFC tag

### 3. **Emergency Access**
Anyone can scan your QR code or tap your NFC tag to:
- View your emergency information
- Call your emergency contacts directly (tel: links)
- Email your contacts (mailto: links)
- Access medical information instantly

## 🔒 Privacy & Security

- **No Data Collection**: We don't store or collect personal information
- **Local First**: All data stored on your device using localStorage
- **Encrypted Sharing**: Shared links use AES-256-GCM encryption
- **Temporary**: Encrypted data is only used for sharing, not stored
- **Open Source**: Full transparency - audit the code yourself

## 🌍 Internationalization

Currently supported languages:
- 🇺🇸 **English**
- 🇮🇹 **Italiano**

Translations are stored in `i18n/locales/` and can be easily extended.

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# TypeScript type checking
npm run typecheck

# Lint code
npm run lint
```

## 📁 Project Structure

```
carecard/
├── app/
│   ├── components/           # Vue components
│   │   ├── Form/            # Form components
│   │   └── Card/            # Card display components
│   ├── composables/         # Vue composables
│   │   ├── useIceUrlShare.ts    # Encryption & sharing
│   │   ├── useIcePDF.ts         # PDF generation
│   │   └── useQRCode.ts         # QR code generation
│   ├── pages/               # Nuxt pages
│   ├── stores/              # Pinia stores
│   └── types/               # TypeScript types
├── server/api/              # Server-side encryption APIs
├── i18n/locales/           # Translation files
├── tests/unit/             # Unit tests
└── public/                 # Static assets
```

## 🚀 Deployment

### Netlify/Vercel (Recommended)
```bash
# Build static site
npm run generate

# Deploy the .output/public folder
```

### Traditional Hosting
```bash
# Build for server deployment
npm run build

# Start production server
npm run preview
```

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Run tests (`npm test`)
4. Check types (`npm run typecheck`)
5. Lint code (`npm run lint`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 💡 Inspiration

Born from real-world needs to bridge the gap between modern location tracking devices (AirTags, SmartTags) and emergency contact information. CareCard makes emergency information universally accessible without requiring specific apps or technology.

---

**CareCard** - Your safety, simplified. 🏥❤️