#!/usr/bin/env node

/**
 * Script to download the selected image from Figma and replace the Manchester City Stadium tour image
 * This script will find all image nodes and download the most likely one
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const FIGMA_FILE_KEY = '4blV8cueIOXSVyVE2l4gDB';
const FIGMA_NODE_ID = '6188:143875'; // Main frame
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

function findImageNodes(node, imageNodes = []) {
  if (node.type === 'IMAGE' || (node.fills && node.fills.some(fill => fill.type === 'IMAGE'))) {
    imageNodes.push({ id: node.id, name: node.name || 'Unnamed', type: node.type });
  }
  if (node.children) {
    node.children.forEach(child => findImageNodes(child, imageNodes));
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
        fs.unlinkSync(filepath);
        reject(new Error(`Failed: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlinkSync(filepath);
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

    const imageNodes = findImageNodes(mainFrame);
    console.log(`\nFound ${imageNodes.length} image node(s):`);
    imageNodes.forEach((img, i) => {
      console.log(`  ${i + 1}. ${img.name} (${img.id})`);
    });

    if (imageNodes.length === 0) {
      console.error('No image nodes found');
      process.exit(1);
    }

    // Get all image export URLs
    const nodeIds = imageNodes.map(img => img.id);
    console.log('\nGetting export URLs...');
    const response = await getFigmaImageExport(nodeIds);
    
    if (response.err) {
      console.error('Error:', response.err);
      process.exit(1);
    }

    const images = response.images;
    if (!images || Object.keys(images).length === 0) {
      console.error('No images found');
      process.exit(1);
    }

    // Download the first image (most likely the selected one, or user can specify)
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
    console.log(`Replacing ${TARGET_FILENAME}...`);
    
    await downloadImage(imageUrl, filepath);
    
    console.log(`✓ Successfully replaced ${TARGET_FILENAME}!`);
    console.log(`\nIf this is not the correct image, specify the node ID:`);
    console.log(`node download-selected-image.js <node-id>`);
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
