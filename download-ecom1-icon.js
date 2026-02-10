#!/usr/bin/env node
/**
 * Download an icon from ECOM-1 Figma file.
 * Usage: node download-ecom1-icon.js <node-id> [output-filename]
 * Example: node download-ecom1-icon.js "I18952:55086;22294:32780" checkout-menu-icon.svg
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const FIGMA_FILE_KEY = 'SENdzNzEvY34jswc3Ghsoi';
const FIGMA_TOKEN = process.env.FIGMA_TOKEN || 'figd_6TAj2qb24EbDJt3A-S-KNUILYum7faVRjRr21KYk';
const ASSETS_DIR = path.join(__dirname, 'public', 'assets');

function getFigmaImageExport(nodeId, format = 'svg') {
  return new Promise((resolve, reject) => {
    const encodedId = encodeURIComponent(nodeId);
    const url = `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}?ids=${encodedId}&format=${format}&scale=2`;
    const options = { headers: { 'X-Figma-Token': FIGMA_TOKEN } };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (c) => { data += c; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
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
  const nodeId = process.argv[2] || 'I18952:55086;22294:32780';
  const filename = process.argv[3] || 'checkout-menu-icon.svg';
  const format = filename.endsWith('.svg') ? 'svg' : 'png';

  try {
    if (!fs.existsSync(ASSETS_DIR)) fs.mkdirSync(ASSETS_DIR, { recursive: true });
    const response = await getFigmaImageExport(nodeId, format);
    if (response.err) {
      console.error('Figma API Error:', response.err);
      process.exit(1);
    }
    const images = response.images || {};
    const imageUrl = images[nodeId] || Object.values(images)[0];
    if (!imageUrl) {
      console.error('No image URL. Keys:', Object.keys(images));
      process.exit(1);
    }
    const filepath = path.join(ASSETS_DIR, filename);
    await downloadFile(imageUrl, filepath);
    console.log(`✓ Downloaded ${filename}`);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();
