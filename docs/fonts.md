# Font Setup Guide

This document explains how to set up self-hosted fonts for the website. All fonts are stored locally in `/public/fonts/` to avoid runtime Google Fonts downloads.

## Font Structure

Each font family has its own folder under `/public/fonts/`:

```
/public/fonts/
  ├── Inter/
  ├── SpaceGrotesk/
  ├── Bungee/
  ├── Fredoka/
  ├── Righteous/
  ├── PermanentMarker/
  ├── PlayfairDisplay/
  ├── Cinzel/
  ├── BebasNeue/
  ├── Oswald/
  ├── BlackOpsOne/
  ├── DancingScript/
  ├── GreatVibes/
  ├── Caveat/
  ├── Kalam/
  ├── NotoSansJP/
  ├── NotoSansSC/
  ├── NotoSansDevanagari/
  └── NotoSansArabic/
```

## Required Font Files

### Core Fonts (Required)

#### Inter
- **Folder**: `/public/fonts/Inter/`
- **Files needed**:
  - `Inter-Regular.woff2` (weight 400)
  - `Inter-SemiBold.woff2` (weight 600)
  - `Inter-Bold.woff2` (weight 700)
- **Download**: https://fonts.google.com/specimen/Inter
- **Subset**: Latin

#### Space Grotesk
- **Folder**: `/public/fonts/SpaceGrotesk/`
- **Files needed**:
  - `SpaceGrotesk-Regular.woff2` (weight 400)
  - `SpaceGrotesk-Medium.woff2` (weight 500)
  - `SpaceGrotesk-SemiBold.woff2` (weight 600)
- **Download**: https://fonts.google.com/specimen/Space+Grotesk
- **Subset**: Latin

### Accent/Fun Fonts

#### Bungee
- **Folder**: `/public/fonts/Bungee/`
- **Files needed**:
  - `Bungee-Regular.woff2` (weight 400)
- **Download**: https://fonts.google.com/specimen/Bungee
- **Subset**: Latin

#### Fredoka
- **Folder**: `/public/fonts/Fredoka/`
- **Files needed**:
  - `Fredoka-Regular.woff2` (weight 400)
- **Download**: https://fonts.google.com/specimen/Fredoka
- **Subset**: Latin

#### Righteous
- **Folder**: `/public/fonts/Righteous/`
- **Files needed**:
  - `Righteous-Regular.woff2` (weight 400)
- **Download**: https://fonts.google.com/specimen/Righteous
- **Subset**: Latin

#### Permanent Marker
- **Folder**: `/public/fonts/PermanentMarker/`
- **Files needed**:
  - `PermanentMarker-Regular.woff2` (weight 400)
- **Download**: https://fonts.google.com/specimen/Permanent+Marker
- **Subset**: Latin

### Display Fonts

#### Playfair Display
- **Folder**: `/public/fonts/PlayfairDisplay/`
- **Files needed**:
  - `PlayfairDisplay-Regular.woff2` (weight 400)
  - `PlayfairDisplay-SemiBold.woff2` (weight 600)
  - `PlayfairDisplay-Bold.woff2` (weight 700)
- **Download**: https://fonts.google.com/specimen/Playfair+Display
- **Subset**: Latin

#### Cinzel
- **Folder**: `/public/fonts/Cinzel/`
- **Files needed**:
  - `Cinzel-Regular.woff2` (weight 400)
  - `Cinzel-SemiBold.woff2` (weight 600)
  - `Cinzel-Bold.woff2` (weight 700)
- **Download**: https://fonts.google.com/specimen/Cinzel
- **Subset**: Latin

#### Bebas Neue
- **Folder**: `/public/fonts/BebasNeue/`
- **Files needed**:
  - `BebasNeue-Regular.woff2` (weight 400)
- **Download**: https://fonts.google.com/specimen/Bebas+Neue
- **Subset**: Latin

#### Oswald
- **Folder**: `/public/fonts/Oswald/`
- **Files needed**:
  - `Oswald-Regular.woff2` (weight 400)
  - `Oswald-SemiBold.woff2` (weight 600)
  - `Oswald-Bold.woff2` (weight 700)
- **Download**: https://fonts.google.com/specimen/Oswald
- **Subset**: Latin

#### Black Ops One
- **Folder**: `/public/fonts/BlackOpsOne/`
- **Files needed**:
  - `BlackOpsOne-Regular.woff2` (weight 400)
- **Download**: https://fonts.google.com/specimen/Black+Ops+One
- **Subset**: Latin

### Script Fonts

#### Dancing Script
- **Folder**: `/public/fonts/DancingScript/`
- **Files needed**:
  - `DancingScript-Regular.woff2` (weight 400)
  - `DancingScript-SemiBold.woff2` (weight 600)
- **Download**: https://fonts.google.com/specimen/Dancing+Script
- **Subset**: Latin

#### Great Vibes
- **Folder**: `/public/fonts/GreatVibes/`
- **Files needed**:
  - `GreatVibes-Regular.woff2` (weight 400)
- **Download**: https://fonts.google.com/specimen/Great+Vibes
- **Subset**: Latin

#### Caveat
- **Folder**: `/public/fonts/Caveat/`
- **Files needed**:
  - `Caveat-Regular.woff2` (weight 400)
  - `Caveat-SemiBold.woff2` (weight 600)
- **Download**: https://fonts.google.com/specimen/Caveat
- **Subset**: Latin

#### Kalam
- **Folder**: `/public/fonts/Kalam/`
- **Files needed**:
  - `Kalam-Regular.woff2` (weight 400)
  - `Kalam-Bold.woff2` (weight 700)
- **Download**: https://fonts.google.com/specimen/Kalam
- **Subset**: Latin

### International Fonts

#### Noto Sans JP (Japanese)
- **Folder**: `/public/fonts/NotoSansJP/`
- **Files needed**:
  - `NotoSansJP-Regular.woff2` (weight 400)
  - `NotoSansJP-SemiBold.woff2` (weight 600)
- **Download**: https://fonts.google.com/specimen/Noto+Sans+JP
- **Subset**: Latin, Japanese (or just Japanese if available)

#### Noto Sans SC (Simplified Chinese)
- **Folder**: `/public/fonts/NotoSansSC/`
- **Files needed**:
  - `NotoSansSC-Regular.woff2` (weight 400)
  - `NotoSansSC-SemiBold.woff2` (weight 600)
- **Download**: https://fonts.google.com/specimen/Noto+Sans+SC
- **Subset**: Latin, Simplified Chinese (or just Simplified Chinese if available)

#### Noto Sans Devanagari
- **Folder**: `/public/fonts/NotoSansDevanagari/`
- **Files needed**:
  - `NotoSansDevanagari-Regular.woff2` (weight 400)
  - `NotoSansDevanagari-SemiBold.woff2` (weight 600)
- **Download**: https://fonts.google.com/specimen/Noto+Sans+Devanagari
- **Subset**: Latin, Devanagari (or just Devanagari if available)

#### Noto Sans Arabic
- **Folder**: `/public/fonts/NotoSansArabic/`
- **Files needed**:
  - `NotoSansArabic-Regular.woff2` (weight 400)
  - `NotoSansArabic-SemiBold.woff2` (weight 600)
- **Download**: https://fonts.google.com/specimen/Noto+Sans+Arabic
- **Subset**: Latin, Arabic (or just Arabic if available)

## How to Download Fonts

1. Visit the Google Fonts page for each font (links provided above)
2. Click "Download family" button
3. Extract the ZIP file
4. Navigate to the extracted folder
5. Find the `.woff2` files for the weights you need
6. Rename them to match the exact file names listed above
7. Place them in the corresponding folder under `/public/fonts/`

### Example: Downloading Inter

1. Go to https://fonts.google.com/specimen/Inter
2. Click "Download family"
3. Extract `Inter.zip`
4. In the extracted folder, find:
   - `static/Inter-Regular.ttf` → Convert to `.woff2` or find if `.woff2` exists
   - `static/Inter-SemiBold.ttf` → Convert to `.woff2` or find if `.woff2` exists
   - `static/Inter-Bold.ttf` → Convert to `.woff2` or find if `.woff2` exists
5. Rename to match exact names: `Inter-Regular.woff2`, `Inter-SemiBold.woff2`, `Inter-Bold.woff2`
6. Place in `/public/fonts/Inter/`

**Note**: Google Fonts downloads may include `.ttf` files. You can:
- Use an online converter (e.g., https://cloudconvert.com/ttf-to-woff2)
- Or use the `.woff2` files if they're included in the download
- Or use a tool like `woff2_compress` from the woff2 package

## File Naming Convention

Font files must follow this exact naming pattern:
- `{FontName}-{WeightName}.woff2`

Where:
- `FontName` matches the folder name (e.g., `Inter`, `SpaceGrotesk`)
- `WeightName` is: `Regular` (400), `Medium` (500), `SemiBold` (600), `Bold` (700)

Examples:
- `Inter-Regular.woff2` (weight 400)
- `SpaceGrotesk-SemiBold.woff2` (weight 600)
- `Bungee-Regular.woff2` (weight 400)

## Verification

After adding fonts, run the verification script:

```bash
npm run verify-fonts
# or
npx tsx scripts/verify-fonts.ts
```

This will check that all expected font files exist and report any missing ones.

## Adding New Fonts

1. Add the font folder under `/public/fonts/`
2. Add the font definition to `lib/fonts.ts` using `next/font/local`
3. Export the font variable
4. Add it to `fontVariables` array if it should be globally available
5. Update this documentation
6. Run `verify-fonts.ts` to ensure files are in place

## Removing Fonts

1. Remove the font folder from `/public/fonts/`
2. Remove the font definition from `lib/fonts.ts`
3. Remove any references to the font variable in components
4. Update this documentation
5. Run `verify-fonts.ts` to confirm removal

## Fallback Strategy

If a font file is missing, the system will fall back to:
1. System fonts (sans-serif, serif, monospace)
2. Next available font in the CSS stack

This ensures the site remains functional even if some font files are missing.

