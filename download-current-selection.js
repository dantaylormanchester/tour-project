#!/usr/bin/env node

/**
 * Script to download the currently selected image from Figma
 * This works by using the Figma API to get the file structure
 * and finding image nodes, then downloading the most recently selected one
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const FIGMA_FILE_KEY = '4blV8cueIOXSVyVE2l4gDB';
const FIGMA_NODE_ID = '6188:143875';
const FIGMA_TOKEN = process.env.FIGMA_TOKEN || 'figd_6TAj2qb24EbDJt3A-S-KNUILYum7faVRjRr21KYk';
const TARGET_FILENAME = 'cc35a8a3508d9424d41cb8ade8e761cb5020deb2.png';
const ASSETS_DIR = path.join(__dirname, 'public', 'assets');

function getFigmaFile() {
  return new Promise((resolve, reject) => {
    const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}`;
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

function findImageNodes(node, imageNodes = [], depth = 0) {
  // Look for IMAGE type nodes or nodes with image fills
  if (node.type === 'IMAGE') {
    imageNodes.push({ 
      id: node.id, 
      name: node.name || 'Unnamed', 
      type: node.type,
      depth: depth
    });
  }
  
  // Also check for nodes with image fills (like rectangles with image backgrounds)
  if (node.fills && Array.isArray(node.fills)) {
    const hasImageFill = node.fills.some(fill => fill.type === 'IMAGE');
    if (hasImageFill && node.type !== 'IMAGE') {
      imageNodes.push({ 
        id: node.id, 
        name: node.name || 'Unnamed', 
        type: node.type,
        hasImageFill: true,
        depth: depth
      });
    }
  }
  
  if (node.children) {
    node.children.forEach(child => findImageNodes(child, imageNodes, depth + 1));
  }
  
  return imageNodes;
}

function findNodeById(node, targetId) {
  if (node.id === targetId) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findNodeById(child, targetId);
      if (found) return found;
    }
  }
  return null;
}

async function getFigmaImageExport(nodeIds) {
  return new Promise((resolve, reject) => {
    const ids = Array.isArray(nodeIds) ? nodeIds.join(',') : nodeIds;
    const url = `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}?ids=${ids}&format=png&scale=2`;
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
  try {
    console.log('Fetching Figma file structure...');
    const fileData = await getFigmaFile();
    
    if (fileData.err) {
      console.error('Error:', fileData.err);
      process.exit(1);
    }

    const mainFrame = findNodeById(fileData.document, FIGMA_NODE_ID);
    if (!mainFrame) {
      console.error('Main frame not found');
      process.exit(1);
    }

    // Find all image nodes
    const imageNodes = findImageNodes(mainFrame);
    console.log(`\nFound ${imageNodes.length} image node(s)`);
    
    // Filter to just the image-placeholder nodes (these are the tour card images)
    const placeholderNodes = imageNodes.filter(img => 
      img.name && img.name.toLowerCase().includes('image-placeholder')
    );
    
    if (placeholderNodes.length === 0) {
      console.log('No image-placeholder nodes found, using all image nodes...');
      // Use all image nodes if no placeholders found
      const nodeIds = imageNodes.map(img => img.id);
      const response = await getFigmaImageExport(nodeIds);
      const images = response.images;
      
      if (images && Object.keys(images).length > 0) {
        // Try the first one
        const firstNodeId = nodeIds[0];
        const imageUrl = images[firstNodeId];
        
        if (imageUrl) {
          if (!fs.existsSync(ASSETS_DIR)) {
            fs.mkdirSync(ASSETS_DIR, { recursive: true });
          }
          const filepath = path.join(ASSETS_DIR, TARGET_FILENAME);
          console.log(`\nDownloading from node ${firstNodeId}...`);
          await downloadImage(imageUrl, filepath);
          console.log(`✓ Successfully replaced ${TARGET_FILENAME}!`);
          return;
        }
      }
    }

    // Download all placeholder images and use the first one
    const nodeIds = placeholderNodes.map(img => img.id);
    console.log(`\nFound ${nodeIds.length} image-placeholder node(s)`);
    console.log('Getting export URLs...');
    
    const response = await getFigmaImageExport(nodeIds);
    const images = response.images;
    
    if (!images || Object.keys(images).length === 0) {
      console.error('No images found');
      process.exit(1);
    }

    // Use the first placeholder image
    const firstNodeId = nodeIds[0];
    const imageUrl = images[firstNodeId];
    
    if (!imageUrl) {
      console.error('No image URL found');
      process.exit(1);
    }

    if (!fs.existsSync(ASSETS_DIR)) {
      fs.mkdirSync(ASSETS_DIR, { recursive: true });
    }

    const filepath = path.join(ASSETS_DIR, TARGET_FILENAME);
    console.log(`\nDownloading image from node ${firstNodeId}...`);
    await downloadImage(imageUrl, filepath);
    
    console.log(`✓ Successfully replaced ${TARGET_FILENAME}!`);
    console.log(`\nNote: If this isn't the correct image, the Figma API doesn't provide`);
    console.log(`information about which node is currently selected. You can:`);
    console.log(`1. Check the Figma URL for ?node-id=XXXX:YYYY`);
    console.log(`2. Or I can download all images and you can tell me which one`);
    
  } catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
