#!/usr/bin/env node
/**
 * Font Verification Script
 * 
 * Checks that all expected font files exist in /public/fonts/
 * Reports missing files and provides guidance on where to download them.
 * 
 * Usage:
 *   npm run verify-fonts
 *   npx tsx scripts/verify-fonts.ts
 */

import { existsSync, readdirSync, statSync } from "fs";
import { join } from "path";

// Font configuration: folder name -> expected files
const fontConfig: Record<string, { files: string[]; url: string; description: string }> = {
  Inter: {
    files: ["Inter-Regular.woff2", "Inter-SemiBold.woff2", "Inter-Bold.woff2"],
    url: "https://fonts.google.com/specimen/Inter",
    description: "Core body font",
  },
  SpaceGrotesk: {
    files: ["SpaceGrotesk-Regular.woff2", "SpaceGrotesk-Medium.woff2", "SpaceGrotesk-SemiBold.woff2"],
    url: "https://fonts.google.com/specimen/Space+Grotesk",
    description: "Core header font",
  },
  Bungee: {
    files: ["Bungee-Regular.woff2"],
    url: "https://fonts.google.com/specimen/Bungee",
    description: "Accent/fun font",
  },
  Fredoka: {
    files: ["Fredoka-Regular.woff2"],
    url: "https://fonts.google.com/specimen/Fredoka",
    description: "Accent/fun font",
  },
  Righteous: {
    files: ["Righteous-Regular.woff2"],
    url: "https://fonts.google.com/specimen/Righteous",
    description: "Accent/fun font",
  },
  PermanentMarker: {
    files: ["PermanentMarker-Regular.woff2"],
    url: "https://fonts.google.com/specimen/Permanent+Marker",
    description: "Accent/fun font",
  },
  PlayfairDisplay: {
    files: ["PlayfairDisplay-Regular.woff2", "PlayfairDisplay-SemiBold.woff2", "PlayfairDisplay-Bold.woff2"],
    url: "https://fonts.google.com/specimen/Playfair+Display",
    description: "Display font",
  },
  Cinzel: {
    files: ["Cinzel-Regular.woff2", "Cinzel-SemiBold.woff2", "Cinzel-Bold.woff2"],
    url: "https://fonts.google.com/specimen/Cinzel",
    description: "Display font",
  },
  BebasNeue: {
    files: ["BebasNeue-Regular.woff2"],
    url: "https://fonts.google.com/specimen/Bebas+Neue",
    description: "Display font",
  },
  Oswald: {
    files: ["Oswald-Regular.woff2", "Oswald-SemiBold.woff2", "Oswald-Bold.woff2"],
    url: "https://fonts.google.com/specimen/Oswald",
    description: "Display font",
  },
  BlackOpsOne: {
    files: ["BlackOpsOne-Regular.woff2"],
    url: "https://fonts.google.com/specimen/Black+Ops+One",
    description: "Display font",
  },
  DancingScript: {
    files: ["DancingScript-Regular.woff2", "DancingScript-SemiBold.woff2"],
    url: "https://fonts.google.com/specimen/Dancing+Script",
    description: "Script font",
  },
  GreatVibes: {
    files: ["GreatVibes-Regular.woff2"],
    url: "https://fonts.google.com/specimen/Great+Vibes",
    description: "Script font",
  },
  Caveat: {
    files: ["Caveat-Regular.woff2", "Caveat-SemiBold.woff2"],
    url: "https://fonts.google.com/specimen/Caveat",
    description: "Script font",
  },
  Kalam: {
    files: ["Kalam-Regular.woff2", "Kalam-Bold.woff2"],
    url: "https://fonts.google.com/specimen/Kalam",
    description: "Script font",
  },
  NotoSansJP: {
    files: ["NotoSansJP-Regular.woff2", "NotoSansJP-SemiBold.woff2"],
    url: "https://fonts.google.com/specimen/Noto+Sans+JP",
    description: "International font (Japanese)",
  },
  NotoSansSC: {
    files: ["NotoSansSC-Regular.woff2", "NotoSansSC-SemiBold.woff2"],
    url: "https://fonts.google.com/specimen/Noto+Sans+SC",
    description: "International font (Simplified Chinese)",
  },
  NotoSansDevanagari: {
    files: ["NotoSansDevanagari-Regular.woff2", "NotoSansDevanagari-SemiBold.woff2"],
    url: "https://fonts.google.com/specimen/Noto+Sans+Devanagari",
    description: "International font (Devanagari)",
  },
  NotoSansArabic: {
    files: ["NotoSansArabic-Regular.woff2", "NotoSansArabic-SemiBold.woff2"],
    url: "https://fonts.google.com/specimen/Noto+Sans+Arabic",
    description: "International font (Arabic)",
  },
};

const fontsDir = join(process.cwd(), "public", "fonts");

interface FontStatus {
  fontName: string;
  folderExists: boolean;
  missingFiles: string[];
  extraFiles: string[];
  config: typeof fontConfig[string];
}

function verifyFonts(): FontStatus[] {
  const results: FontStatus[] = [];

  // Check if fonts directory exists
  if (!existsSync(fontsDir)) {
    console.error(`❌ Fonts directory not found: ${fontsDir}`);
    console.error(`   Create it and add font folders as described in docs/fonts.md`);
    return results;
  }

  // Check each font
  for (const [fontName, config] of Object.entries(fontConfig)) {
    const fontFolder = join(fontsDir, fontName);
    const folderExists = existsSync(fontFolder);

    let missingFiles: string[] = [];
    let extraFiles: string[] = [];

    if (folderExists) {
      // Check which files exist
      const existingFiles = readdirSync(fontFolder).filter((file) =>
        statSync(join(fontFolder, file)).isFile()
      );

      // Find missing files
      missingFiles = config.files.filter((file) => !existingFiles.includes(file));

      // Find extra files (not in config)
      extraFiles = existingFiles.filter((file) => !config.files.includes(file));
    } else {
      // All files are missing if folder doesn't exist
      missingFiles = [...config.files];
    }

    results.push({
      fontName,
      folderExists,
      missingFiles,
      extraFiles,
      config,
    });
  }

  return results;
}

function printResults(results: FontStatus[]): void {
  console.log("\n🔍 Font Verification Report\n");
  console.log("=" .repeat(60));

  const allGood = results.every((r) => r.folderExists && r.missingFiles.length === 0);
  const hasMissing = results.some((r) => !r.folderExists || r.missingFiles.length > 0);
  const hasExtra = results.some((r) => r.extraFiles.length > 0);

  // Summary
  const complete = results.filter((r) => r.folderExists && r.missingFiles.length === 0).length;
  const total = results.length;

  console.log(`\n📊 Summary: ${complete}/${total} fonts complete\n`);

  if (allGood) {
    console.log("✅ All fonts are properly configured!\n");
  }

  // Missing fonts
  if (hasMissing) {
    console.log("❌ Missing Fonts:\n");
    for (const result of results) {
      if (!result.folderExists || result.missingFiles.length > 0) {
        console.log(`  ${result.fontName} (${result.config.description})`);
        if (!result.folderExists) {
          console.log(`    📁 Folder missing: /public/fonts/${result.fontName}/`);
        }
        if (result.missingFiles.length > 0) {
          console.log(`    📄 Missing files:`);
          result.missingFiles.forEach((file) => {
            console.log(`       - ${file}`);
          });
        }
        console.log(`    🔗 Download: ${result.config.url}`);
        console.log(`    📖 See docs/fonts.md for detailed instructions\n`);
      }
    }
  }

  // Extra files (warnings)
  if (hasExtra) {
    console.log("\n⚠️  Extra Files (not in config, may be unused):\n");
    for (const result of results) {
      if (result.extraFiles.length > 0) {
        console.log(`  ${result.fontName}:`);
        result.extraFiles.forEach((file) => {
          console.log(`    - ${file}`);
        });
        console.log();
      }
    }
  }

  // Complete fonts
  if (!allGood) {
    console.log("\n✅ Complete Fonts:\n");
    for (const result of results) {
      if (result.folderExists && result.missingFiles.length === 0) {
        console.log(`  ✓ ${result.fontName}`);
      }
    }
    console.log();
  }

  console.log("=" .repeat(60));
  console.log("\n💡 Tip: Run this script after adding fonts to verify everything is set up correctly.\n");

  // Exit code
  if (hasMissing) {
    process.exit(1);
  }
}

// Main execution
try {
  const results = verifyFonts();
  printResults(results);
} catch (error) {
  console.error("❌ Error verifying fonts:", error);
  process.exit(1);
}

