import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgDir = path.join(__dirname, 'public', 'img');

async function processImages() {
  try {
    const files = fs.readdirSync(imgDir);
    const pngFiles = files.filter(f => f.toLowerCase().endsWith('.png'));
    
    console.log(`Found ${pngFiles.length} PNG files. Starting conversion to WebP...`);
    
    for (const file of pngFiles) {
      const filePath = path.join(imgDir, file);
      const webpPath = path.join(imgDir, file.replace(/\.png$/i, '.webp'));
      
      await sharp(filePath)
        .webp({ quality: 80 })
        .toFile(webpPath);
        
      console.log(`Converted ${file} to WebP -> ${path.basename(webpPath)}`);
      
      // Remove original PNG to save space
      fs.unlinkSync(filePath);
      console.log(`Deleted original: ${file}`);
    }
    
    console.log('All images converted successfully!');
  } catch (err) {
    console.error('Error processing images:', err);
  }
}

processImages();
