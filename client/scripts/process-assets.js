import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { execSync } from 'child_process';

const rootDir = path.resolve('..');
const srcDir = path.join(rootDir, 'pic');
const targetPicDir = path.resolve('public/assets/pic');
const targetOptimizedDir = path.resolve('public/assets/optimized');

if (!fs.existsSync(targetPicDir)) fs.mkdirSync(targetPicDir, { recursive: true });
if (!fs.existsSync(targetOptimizedDir)) fs.mkdirSync(targetOptimizedDir, { recursive: true });

// 1. Copy all files from src to targetPicDir
const allFiles = fs.readdirSync(srcDir);
for (const file of allFiles) {
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(targetPicDir, file);
  fs.copyFileSync(srcPath, destPath);
}
console.log(`Copied ${allFiles.length} files to ${targetPicDir}`);

// 2. Identify key images and convert to WebP + responsive srcset
const imageMap = [
  { file: 'WhatsApp Image 2026-10-14 at 14.56.22 (1).jpeg', slug: 'poolside-cocktails' },
  { file: 'WhatsApp Image 2026-10-14 at 14.56.22 (2).jpeg', slug: 'poolside-canopy' },
  { file: 'WhatsApp Image 2026-10-14 at 14.56.22.jpeg', slug: 'truffle-tagliolini' },
  { file: 'WhatsApp Image 2026-10-14 at 14.56.20.jpeg', slug: 'coffee-terrace' },
  { file: 'WhatsApp Image 2026-10-14 at 14.56.20 (1).jpeg', slug: 'glasshouse-coffee' },
  { file: 'WhatsApp Image 2026-10-14 at 14.56.21.jpeg', slug: 'squid-ink-pasta' },
  { file: 'WhatsApp Image 2026-10-14 at 14.56.21 (1).jpeg', slug: 'artisan-pasta-bowl' },
  { file: 'WhatsApp Image 2026-10-14 at 14.56.23.jpeg', slug: 'poolside-daybeds' },
  { file: 'WhatsApp Image 2026-10-14 at 14.56.23 (1).jpeg', slug: 'glass-pavilion-pool' },
  { file: 'WhatsApp Image 2026-10-14 at 14.56.24.jpeg', slug: 'pool-reflection' },
  { file: 'WhatsApp Image 2026-10-14 at 14.56.24 (2).jpeg', slug: 'pool-yellow-loungers' },
  { file: 'WhatsApp Image 2026-10-14 at 14.56.25.jpeg', slug: 'lemon-house-facade' },
  { file: 'WhatsApp Image 2026-10-14 at 14.56.25 (1).jpeg', slug: 'sunset-pool-reflection' },
  { file: 'WhatsApp Image 2026-10-14 at 14.56.25 (2).jpeg', slug: 'menu-poster-tomorrow-special' },
  { file: 'WhatsApp Image 2026-10-14 at 14.56.26.jpeg', slug: 'menu-poster-beverages' },
  { file: 'WhatsApp Image 2026-10-14 at 14.56.26 (1).jpeg', slug: 'masala-chai-sunset' },
  { file: 'WhatsApp Image 2026-10-14 at 14.56.27.jpeg', slug: 'iced-americano-poster' },
  { file: 'WhatsApp Image 2026-10-14 at 14.56.27 (1).jpeg', slug: 'iced-americano-terrace' },
  { file: 'WhatsApp Image 2026-10-14 at 14.56.27 (2).jpeg', slug: 'menu-poster-must-try' },
  { file: 'WhatsApp Image 2026-10-14 at 14.56.28.jpeg', slug: 'menu-poster-beverages-alt' },
  { file: 'WhatsApp Image 2026-10-14 at 14.56.28 (1).jpeg', slug: 'angel-statue-entrance' },
  { file: 'WhatsApp Image 2026-10-14 at 14.56.28 (2).jpeg', slug: 'angel-statue-detail' },
  { file: 'WhatsApp Image 2026-10-14 at 14.56.29.jpeg', slug: 'terrace-seating-panorama' },
  { file: 'WhatsApp Image 2026-10-14 at 14.56.29 (1).jpeg', slug: 'lawn-and-terrace' },
  { file: 'WhatsApp Image 2026-10-14 at 14.56.32.jpeg', slug: 'glass-curved-pavilion' },
  { file: 'WhatsApp Image 2026-10-14 at 14.56.32 (1).jpeg', slug: 'cabana-lemon-tents' },
];

async function processImages() {
  const metadata = {};
  for (const item of imageMap) {
    const inputPath = path.join(targetPicDir, item.file);
    if (!fs.existsSync(inputPath)) continue;

    const img = sharp(inputPath);
    const meta = await img.metadata();

    // 1. Full webp
    const fullWebpName = `${item.slug}.webp`;
    const fullWebpPath = path.join(targetOptimizedDir, fullWebpName);
    await sharp(inputPath)
      .webp({ quality: 84 })
      .toFile(fullWebpPath);

    // 2. Responsive sizes: 480, 800, 1200
    const sizes = [480, 800, 1200];
    const srcSetList = [];

    for (const width of sizes) {
      if (meta.width && meta.width >= width) {
        const resizeName = `${item.slug}-${width}w.webp`;
        const resizePath = path.join(targetOptimizedDir, resizeName);
        await sharp(inputPath)
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(resizePath);
        srcSetList.push(`/assets/optimized/${resizeName} ${width}w`);
      }
    }

    metadata[item.slug] = {
      src: `/assets/optimized/${fullWebpName}`,
      srcset: srcSetList.join(', '),
      width: meta.width,
      height: meta.height,
      original: `/assets/pic/${item.file}`,
    };
  }

  // Write image index
  const indexJs = `// Auto-generated asset map for Lemon showcase
export const assetMap = ${JSON.stringify(metadata, null, 2)};
export default assetMap;
`;
  fs.writeFileSync(path.resolve('src/config/assets.js'), indexJs);
  console.log('Successfully generated WebP assets and src/config/assets.js');
}

// 3. Process best video for hero background
async function processVideos() {
  const heroVideoSrc = path.join(targetPicDir, 'WhatsApp Video 2026-10-14 at 14.56.30.mp4');
  const heroOut = path.join(targetOptimizedDir, 'hero-video.mp4');
  const heroPoster = path.join(targetOptimizedDir, 'hero-poster.webp');

  try {
    execSync(`ffmpeg -y -i "${heroVideoSrc}" -an -c:v libx264 -crf 26 -preset fast -movflags +faststart "${heroOut}"`);
    console.log('Generated compressed hero-video.mp4');
    
    const tempJpg = path.join(targetOptimizedDir, 'hero-poster.jpg');
    execSync(`ffmpeg -y -ss 00:00:01 -i "${heroOut}" -vframes 1 "${tempJpg}"`);
    await sharp(tempJpg)
      .webp({ quality: 85 })
      .toFile(heroPoster);
    if (fs.existsSync(tempJpg)) fs.unlinkSync(tempJpg);
    console.log('Generated hero-poster.webp');
  } catch (err) {
    console.warn('Video transcoding warning:', err.message);
  }
}

async function run() {
  fs.mkdirSync(path.resolve('src/config'), { recursive: true });
  await processImages();
  await processVideos();
  console.log('Asset processing complete!');
}

run();
