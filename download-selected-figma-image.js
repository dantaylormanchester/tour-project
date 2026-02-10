#!/usr/bin/env node

/**
 * Script to download a selected image from Figma and replace the Manchester City Stadium tour image
 * 
 * Usage:
 * node download-selected-figma-image.js <node-id>
 * 
 * Or set FIGMA_TOKEN and NODE_ID as environment variables
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const FIGMA_FILE_KEY = '4blV8cueIOXSVyVE2l4gDB';
let FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const NODE_ID = process.argv[2] || process.env.NODE_ID;
const TARGET_FILENAME = 'cc35a8a3508d9424d41cb8ade8e761cb5020deb2.png'; // Manchester City Stadium tour
const ASSETS_DIR = path.join(__dirname, 'public', 'assets');

function promptForToken() {
  return new Promise((resolve) => {
    if (FIGMA_TOKEN) {
      resolve();
      return;
    }
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Enter your Figma API token: ', (token) => {
      FIGMA_TOKEN = token.trim();
      rl.close();
      resolve();
    });
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
          console.log(`✓ Downloaded: ${path.basename(filepath)}`);
          resolve();
        });
      } else {
        fs.unlinkSync(filepath);
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlinkSync(filepath);
      reject(err);
    });
  });
}

async function getFigmaImageExport(nodeId) {
  return new Promise((resolve, reject) => {
    const url = `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}?ids=${nodeId}&format=png&scale=2`;
    
    const options = {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
      },
    };

    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  try {
    if (!NODE_ID) {
      console.error('Error: Node ID is required.');
      console.error('Usage: node download-selected-figma-image.js <node-id>');
      console.error('Or set NODE_ID environment variable');
      console.error('\nTo get the node ID:');
      console.error('1. Select the image in Figma');
      console.error('2. Look at the URL - it will have ?node-id=XXXX:YYYY');
      console.error('3. Use that node ID (e.g., "6188:143875")');
      process.exit(1);
    }

    await promptForToken();
    
    if (!FIGMA_TOKEN) {
      console.error('Error: No Figma API token provided.');
      process.exit(1);
    }

    // Ensure assets directory exists
    if (!fs.existsSync(ASSETS_DIR)) {
      fs.mkdirSync(ASSETS_DIR, { recursive: true });
    }

    console.log(`Fetching image export URL for node ${NODE_ID}...`);
    const response = await getFigmaImageExport(NODE_ID);
    
    if (response.err) {
      console.error('Figma API Error:', response.err);
      process.exit(1);
    }

    const images = response.images;
    if (!images || Object.keys(images).length === 0) {
      console.error('No images found in Figma response.');
      console.log('Response:', JSON.stringify(response, null, 2));
      process.exit(1);
    }

    const imageUrl = images[NODE_ID];
    if (!imageUrl) {
      console.error(`No image URL found for node ${NODE_ID}`);
      console.log('Available nodes:', Object.keys(images));
      process.exit(1);
    }

    const filepath = path.join(ASSETS_DIR, TARGET_FILENAME);
    console.log(`Downloading image to ${TARGET_FILENAME}...`);
    await downloadImage(imageUrl, filepath);

    console.log(`\n✓ Successfully replaced ${TARGET_FILENAME} with the selected Figma image!`);
  } catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
