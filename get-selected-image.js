#!/usr/bin/env node

/**
 * Script to automatically download the selected image from Figma
 * This reads the node ID from the Figma URL in the browser
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const FIGMA_FILE_KEY = '4blV8cueIOXSVyVE2l4gDB';
const FIGMA_TOKEN = process.env.FIGMA_TOKEN || 'figd_6TAj2qb24EbDJt3A-S-KNUILYum7faVRjRr21KYk';
// Target filename - can be overridden via command line
const TARGET_FILENAME = process.argv[3] || 'ba620563e50bd248d76fc152b1368f045ee5795e.png'; // VIP Stadium Tour
const ASSETS_DIR = path.join(__dirname, 'public', 'assets');

// You can pass the node ID directly, or a Figma URL
const input = process.argv[2];

function extractNodeId(input) {
  if (!input) return null;
  
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
    const url = `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}?ids=${nodeId}&format=png&scale=2`;
    const options = {
      headers: { 'X-Figma-Token': FIGMA_TOKEN },
    };
    
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
  if (!input) {
    console.log('To download the selected image from Figma:');
    console.log('1. Select the image in Figma');
    console.log('2. Copy the URL from your browser (it will have ?node-id=XXXX-YYYY)');
    console.log('3. Run: node get-selected-image.js "<paste-url-here>" "<target-filename>"');
    console.log('\nOr provide just the node ID:');
    console.log('   node get-selected-image.js "6192-170731" "ba620563e50bd248d76fc152b1368f045ee5795e.png"');
    console.log('\nTarget filename defaults to VIP Stadium Tour image.');
    process.exit(1);
  }

  try {
    const nodeId = extractNodeId(input);
    if (!nodeId) {
      console.error('Could not extract node ID from input');
      process.exit(1);
    }

    console.log(`Extracted node ID: ${nodeId}\n`);

    if (!fs.existsSync(ASSETS_DIR)) {
      fs.mkdirSync(ASSETS_DIR, { recursive: true });
    }

    console.log('Fetching image export from Figma...');
    const response = await getFigmaImageExport(nodeId);
    
    if (response.err) {
      console.error('Figma API Error:', response.err);
      process.exit(1);
    }

    const images = response.images;
    if (!images || Object.keys(images).length === 0) {
      console.error('No images found');
      process.exit(1);
    }

    const imageUrl = images[nodeId];
    if (!imageUrl) {
      // Try alternative formats
      const keys = Object.keys(images);
      if (keys.length > 0) {
        console.log(`Using first available image from node ${keys[0]}...`);
        const filepath = path.join(ASSETS_DIR, TARGET_FILENAME);
        await downloadImage(images[keys[0]], filepath);
        console.log(`✓ Successfully replaced ${TARGET_FILENAME}!`);
        return;
      }
      console.error(`No image URL found for node ${nodeId}`);
      process.exit(1);
    }

    const filepath = path.join(ASSETS_DIR, TARGET_FILENAME);
    console.log('Downloading image...');
    await downloadImage(imageUrl, filepath);
    
    console.log(`✓ Successfully replaced ${TARGET_FILENAME} with the selected Figma image!`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
