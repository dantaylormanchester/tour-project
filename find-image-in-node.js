#!/usr/bin/env node

/**
 * Script to find image nodes within a specific Figma node
 */

const https = require('https');
const fs = require('fs');

const FIGMA_FILE_KEY = '4blV8cueIOXSVyVE2l4gDB';
const FIGMA_TOKEN = process.env.FIGMA_TOKEN || 'figd_6TAj2qb24EbDJt3A-S-KNUILYum7faVRjRr21KYk';
const PARENT_NODE_ID = '6192:170731'; // The card node

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

function findImageNodes(node, imageNodes = [], depth = 0, path = '') {
  const currentPath = path ? `${path} > ${node.name || node.type}` : (node.name || node.type);
  
  // Look for IMAGE type nodes
  if (node.type === 'IMAGE') {
    imageNodes.push({ 
      id: node.id, 
      name: node.name || 'Unnamed Image', 
      type: node.type,
      depth: depth,
      path: currentPath
    });
  }
  
  // Look for nodes with image fills (like rectangles with image backgrounds)
  if (node.fills && Array.isArray(node.fills)) {
    const hasImageFill = node.fills.some(fill => fill.type === 'IMAGE');
    if (hasImageFill && node.type !== 'IMAGE') {
      imageNodes.push({ 
        id: node.id, 
        name: node.name || `Image Fill (${node.type})`, 
        type: node.type,
        hasImageFill: true,
        depth: depth,
        path: currentPath
      });
    }
  }
  
  if (node.children) {
    node.children.forEach(child => {
      findImageNodes(child, imageNodes, depth + 1, currentPath);
    });
  }
  
  return imageNodes;
}

async function main() {
  try {
    console.log('Fetching Figma file structure...');
    const fileData = await getFigmaFile();
    
    if (fileData.err) {
      console.error('Error:', fileData.err);
      process.exit(1);
    }

    // Find the parent node (the card)
    const parentNode = findNodeById(fileData.document, PARENT_NODE_ID);
    if (!parentNode) {
      console.error(`Could not find node ${PARENT_NODE_ID}`);
      process.exit(1);
    }

    console.log(`\nFound parent node: ${parentNode.name || parentNode.type} (${PARENT_NODE_ID})`);
    console.log('\nSearching for image nodes within this card...\n');

    // Find all image nodes within the parent
    const imageNodes = findImageNodes(parentNode);
    
    if (imageNodes.length === 0) {
      console.log('No image nodes found within this card.');
      process.exit(1);
    }

    console.log(`Found ${imageNodes.length} image node(s):\n`);
    imageNodes.forEach((img, i) => {
      console.log(`${i + 1}. ${img.name}`);
      console.log(`   Node ID: ${img.id}`);
      console.log(`   Type: ${img.type}${img.hasImageFill ? ' (with image fill)' : ''}`);
      console.log(`   Path: ${img.path}`);
      console.log('');
    });

    // The first image node is likely the card image
    if (imageNodes.length > 0) {
      console.log(`\nMost likely image node: ${imageNodes[0].id}`);
      console.log(`\nTo download this image, run:`);
      console.log(`node get-selected-image.js "${imageNodes[0].id}" "ba620563e50bd248d76fc152b1368f045ee5795e.png"`);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
