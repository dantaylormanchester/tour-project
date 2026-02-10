#!/usr/bin/env node

/**
 * Script to download tour card images from Figma
 * 
 * Usage:
 * 1. Get your Figma API token from: https://www.figma.com/developers/api#access-tokens
 * 2. Set it as an environment variable: export FIGMA_TOKEN="your-token-here"
 * 3. Run: node download-figma-images.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const readline = require('readline');

const FIGMA_FILE_KEY = '4blV8cueIOXSVyVE2l4gDB';
const FIGMA_NODE_ID = '6188:143875';
let FIGMA_TOKEN = process.env.FIGMA_TOKEN;

function promptForToken() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    if (!FIGMA_TOKEN) {
      rl.question('Enter your Figma API token: ', (token) => {
        FIGMA_TOKEN = token.trim();
        rl.close();
        resolve();
      });
    } else {
      rl.close();
      resolve();
    }
  });
}

const ASSETS_DIR = path.join(__dirname, 'public', 'assets');

// Ensure assets directory exists
if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

// Tour card image mappings - these are the filenames we need
const TOUR_CARD_IMAGES = [
  'cc35a8a3508d9424d41cb8ade8e761cb5020deb2.png', // Manchester City Stadium tour
  '436d6bbb5240ebc5b8d0840c69442239eb776013.png', // Stadium and Academy Tour
  'ba620563e50bd248d76fc152b1368f045ee5795e.png', // VIP Stadium Tour
  '97b3e948bc5c2acead1250510c7c48f4081e632a.png', // Walk with a Legend Tour
  'd12bb9f28d7d8d1213c2434c0d0e0d5800efb02d.png', // Matchday Pitch-side Walking Tour
];

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

async function getFigmaFile() {
  return new Promise((resolve, reject) => {
    const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}`;
    
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

function findImageNodes(node, imageNodes = []) {
  // Look for nodes that are images or contain images
  if (node.type === 'IMAGE' || (node.fills && node.fills.some(fill => fill.type === 'IMAGE'))) {
    imageNodes.push(node.id);
  }
  
  if (node.children) {
    node.children.forEach(child => findImageNodes(child, imageNodes));
  }
  
  return imageNodes;
}

async function getFigmaImageExport(nodeIds) {
  return new Promise((resolve, reject) => {
    const ids = Array.isArray(nodeIds) ? nodeIds.join(',') : nodeIds;
    const url = `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}?ids=${ids}&format=png&scale=2`;
    
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
    await promptForToken();
    
    if (!FIGMA_TOKEN) {
      console.error('Error: No Figma API token provided.');
      console.error('Get your token from: https://www.figma.com/developers/api#access-tokens');
      process.exit(1);
    }

    console.log('Fetching Figma file structure to find tour card images...');
    const fileData = await getFigmaFile();
    
    if (fileData.err) {
      console.error('Figma API Error:', fileData.err);
      process.exit(1);
    }

    // Recursively search for the node
    function findNodeById(node, targetId) {
      if (node.id === targetId) {
        return node;
      }
      if (node.children) {
        for (const child of node.children) {
          const found = findNodeById(child, targetId);
          if (found) return found;
        }
      }
      return null;
    }

    const mainFrame = findNodeById(fileData.document, FIGMA_NODE_ID);
    if (!mainFrame) {
      console.log('Node not found, searching entire document for image nodes...');
      // If we can't find the specific node, search the whole document
      const allImageNodes = findImageNodes(fileData.document);
      if (allImageNodes.length > 0) {
        console.log(`Found ${allImageNodes.length} image node(s) in document.`);
        const response = await getFigmaImageExport(allImageNodes.slice(0, 5)); // Get first 5
        const images = response.images;
        if (images && Object.keys(images).length > 0) {
          let imageIndex = 0;
          for (const [nodeId, imageUrl] of Object.entries(images)) {
            const filename = TOUR_CARD_IMAGES[imageIndex] || `figma-${nodeId}.png`;
            const filepath = path.join(ASSETS_DIR, filename);
            console.log(`Downloading ${filename}...`);
            await downloadImage(imageUrl, filepath);
            imageIndex++;
          }
          console.log('\n✓ All images downloaded successfully!');
          return;
        }
      }
      console.error(`Could not find node ${FIGMA_NODE_ID} in Figma file.`);
      process.exit(1);
    }

    // Find all image nodes within the frame
    const imageNodes = findImageNodes(mainFrame);
    console.log(`Found ${imageNodes.length} image node(s) in the frame.`);

    if (imageNodes.length === 0) {
      console.log('No image nodes found. Trying to export the frame itself...');
      imageNodes.push(FIGMA_NODE_ID);
    }

    // Get export URLs for all image nodes
    console.log('Getting export URLs from Figma...');
    const response = await getFigmaImageExport(imageNodes);
    
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

    console.log(`Found ${Object.keys(images).length} image(s) to download.\n`);

    // Download each image
    let imageIndex = 0;
    for (const [nodeId, imageUrl] of Object.entries(images)) {
      // Use the next available filename, or generate one
      const filename = TOUR_CARD_IMAGES[imageIndex] || `figma-${nodeId}.png`;
      const filepath = path.join(ASSETS_DIR, filename);
      
      console.log(`Downloading ${filename}...`);
      await downloadImage(imageUrl, filepath);
      imageIndex++;
    }

    console.log('\n✓ All images downloaded successfully!');
  } catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
