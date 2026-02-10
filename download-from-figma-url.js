#!/usr/bin/env node

/**
 * Script to download an image from Figma using a Figma URL with node-id parameter
 * Usage: node download-from-figma-url.js "https://www.figma.com/design/...?node-id=XXXX-YYYY"
 * Or: node download-from-figma-url.js "XXXX-YYYY" or "XXXX:YYYY"
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const FIGMA_FILE_KEY = '4blV8cueIOXSVyVE2l4gDB';
const FIGMA_TOKEN = process.env.FIGMA_TOKEN || 'figd_6TAj2qb24EbDJt3A-S-KNUILYum7faVRjRr21KYk';
const TARGET_FILENAME = 'cc35a8a3508d9424d41cb8ade8e761cb5020deb2.png';
const ASSETS_DIR = path.join(__dirname, 'public', 'assets');

function extractNodeId(input) {
  // If it's a URL, extract node-id parameter
  if (input.includes('figma.com')) {
    const urlMatch = input.match(/[?&]node-id=([^&]+)/);
    if (urlMatch) {
      return urlMatch[1].replace(/-/g, ':'); // Convert hyphens to colons
    }
  }
  
  // If it's already a node ID, normalize it
  if (input.includes(':') || input.includes('-')) {
    return input.replace(/-/g, ':'); // Convert hyphens to colons
  }
  
  return input;
}

function getFigmaImageExport(nodeId) {
  return new Promise((resolve, reject) => {
    // Figma API expects node IDs in format with colons
    const url = `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}?ids=${nodeId}&format=png&scale=2`;
    const options = {
      headers: { 'X-Figma-Token': FIGMA_TOKEN },
    };
    
    console.log(`Fetching image export for node: ${nodeId}`);
    
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
        reject(new Error(`Failed: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      reject(err);
    });
  });
}

async function main() {
  const input = process.argv[2];
  
  if (!input) {
    console.error('Usage: node download-from-figma-url.js <figma-url-or-node-id>');
    console.error('Example: node download-from-figma-url.js "https://www.figma.com/design/...?node-id=6192-170731"');
    console.error('Or: node download-from-figma-url.js "6192-170731"');
    process.exit(1);
  }

  try {
    const nodeId = extractNodeId(input);
    console.log(`Extracted node ID: ${nodeId}\n`);

    if (!fs.existsSync(ASSETS_DIR)) {
      fs.mkdirSync(ASSETS_DIR, { recursive: true });
    }

    const response = await getFigmaImageExport(nodeId);
    
    if (response.err) {
      console.error('Figma API Error:', response.err);
      process.exit(1);
    }

    const images = response.images;
    if (!images || Object.keys(images).length === 0) {
      console.error('No images found in response');
      console.log('Response:', JSON.stringify(response, null, 2));
      process.exit(1);
    }

    const imageUrl = images[nodeId];
    if (!imageUrl) {
      // Try with different node ID formats
      const keys = Object.keys(images);
      if (keys.length > 0) {
        console.log(`Node ID ${nodeId} not found, but found ${keys.length} image(s)`);
        console.log('Using first available image...');
        const firstKey = keys[0];
        const filepath = path.join(ASSETS_DIR, TARGET_FILENAME);
        console.log(`Downloading from node ${firstKey}...`);
        await downloadImage(images[firstKey], filepath);
        console.log(`✓ Successfully replaced ${TARGET_FILENAME}!`);
        return;
      }
      console.error(`No image URL found for node ${nodeId}`);
      process.exit(1);
    }

    const filepath = path.join(ASSETS_DIR, TARGET_FILENAME);
    console.log(`Downloading image...`);
    await downloadImage(imageUrl, filepath);
    
    console.log(`✓ Successfully replaced ${TARGET_FILENAME}!`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
