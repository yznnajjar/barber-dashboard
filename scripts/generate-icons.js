#!/usr/bin/env node
// Run: node scripts/generate-icons.js
// Generates all required PWA icon sizes
// Requires: npm install sharp

const fs = require('fs')
const path = require('path')

const SIZES = [72, 96, 128, 144, 152, 192, 384, 512]
const OUTPUT_DIR = path.join(__dirname, '../public/icons')

// SVG source — scissors icon with dark background
const SVG = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="#1A1A18"/>
  <text
    x="50%"
    y="54%"
    dominant-baseline="middle"
    text-anchor="middle"
    font-size="${size * 0.52}"
    font-family="Apple Color Emoji, Segoe UI Emoji, sans-serif"
  >✂️</text>
</svg>
`

async function generateIcons() {
  // Try to use sharp if available, otherwise save SVGs
  let sharp
  try {
    sharp = require('sharp')
  } catch {
    console.log('sharp not installed — saving SVGs instead')
    console.log('Run: npm install sharp && node scripts/generate-icons.js')
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  for (const size of SIZES) {
    const svgContent = SVG(size)
    const outputPath = path.join(OUTPUT_DIR, `icon-${size}x${size}.png`)

    if (sharp) {
      await sharp(Buffer.from(svgContent))
        .png()
        .toFile(outputPath)
      console.log(`✅ Generated ${size}x${size}`)
    } else {
      // Save as SVG fallback
      fs.writeFileSync(outputPath.replace('.png', '.svg'), svgContent)
      console.log(`✅ Saved SVG for ${size}x${size}`)
    }
  }

  console.log('\n🎉 Icons generated in public/icons/')
}

generateIcons().catch(console.error)
