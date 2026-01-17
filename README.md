# Aba Digital Marketplace - Government Presentation Demo

A research-backed interactive demo for presenting to the Governor of Abia State.

## Quick Start

### Option 1: Run Locally (Recommended for Presentation)

```bash
# Navigate to the project folder
cd "/Users/oretayofatokun/Development/Abia State Marketplace"

# Install dependencies (one time only)
npm install

# Start the development server
npm run dev
```

Then open http://localhost:5173 in your browser.

### Option 2: Build for Sharing

```bash
# Build the static files
npm run build

# Preview the build
npm run preview
```

The built files will be in the `dist/` folder. You can:
- Host on any web server
- Upload to Vercel, Netlify, or GitHub Pages
- Share as a zip file

## Presentation Flow

The demo is organized into a logical presentation flow:

1. **Research** - Shows you've done your homework (real statistics)
2. **Why Aba** - The opportunity (₦144B market, 37,000 shops)
3. **Quick Wins** - 30/90 day targets with announcement-ready messaging
4. **Pilot Ask** - ₦35-50M for 90-day pilot
5. **Sustainability** - Operating model and revenue path
6. **Next Steps** - Clear CTA and risk mitigation
7. **Platform Demo** - Interactive marketplace demo

## Key Statistics (From Research)

All numbers are sourced from your research document:

| Statistic | Value | Source |
|-----------|-------|--------|
| Ariaria Shops | 37,000 | Techpoint Africa |
| Annual Trade Volume | ₦144 Billion | Industry Reports |
| Shoemakers in Aba | 110,000+ | Wikipedia/ICIR |
| Garment Makers | 50,000+ | Wikipedia |
| Generator Spend | ₦1 Billion/year | ICIR Investigation |
| Abia Literacy Rate | 90%+ | Kingmakers Database |

## Deployment Options

### Vercel (Easiest - Free)
1. Push to GitHub
2. Connect to Vercel
3. Auto-deploys on every push
4. Get a shareable URL like: `aba-marketplace.vercel.app`

### Netlify (Also Free)
1. Drag and drop the `dist/` folder
2. Get instant shareable URL

### GitHub Pages
1. Push to GitHub
2. Enable Pages in settings
3. Point to `dist/` folder

## After the Presentation

If the Governor wants to explore further:
- Share the URL (if deployed)
- The demo works on mobile devices
- All screens are accessible via the navigation

## Files Structure

```
/Abia State Marketplace/
├── index.html          # Entry point
├── package.json        # Dependencies
├── vite.config.js      # Build config
├── src/
│   ├── main.jsx        # React entry
│   └── App.jsx         # Main application (all screens)
├── README.md           # This file
└── Research PDF        # Your research document
```

## Contact

For technical support or modifications, the codebase is self-contained in `src/App.jsx`.
