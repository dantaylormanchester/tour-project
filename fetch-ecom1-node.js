#!/usr/bin/env node
/**
 * Fetch a Figma node from ECOM-1 Dev file.
 * Usage: node fetch-ecom1-node.js "8245:50730" or "8245-50730"
 */
const https = require('https');

const FIGMA_FILE_KEY = 'SENdzNzEvY34jswc3Ghsoi'; // ECOM-1 Dev
const FIGMA_TOKEN = process.env.FIGMA_TOKEN || 'figd_6TAj2qb24EbDJt3A-S-KNUILYum7faVRjRr21KYk';

function extractNodeId(input) {
  if (input.includes('figma.com')) {
    const m = input.match(/[?&]node-id=([^&]+)/);
    if (m) return m[1].replace(/-/g, ':');
  }
  return (input || '').replace(/-/g, ':');
}

function getFile(nodeId) {
  return new Promise((resolve, reject) => {
    const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/nodes?ids=${encodeURIComponent(nodeId)}&depth=10`;
    https.get(url, { headers: { 'X-Figma-Token': FIGMA_TOKEN } }, (res) => {
      let data = '';
      res.on('data', (c) => { data += c; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function summarize(n, depth = 0) {
  if (!n) return '';
  const pad = '  '.repeat(depth);
  const type = n.type || 'UNKNOWN';
  const name = (n.name || '').slice(0, 60);
  const id = n.id || '';
  const w = n.absoluteBoundingBox?.width;
  const h = n.absoluteBoundingBox?.height;
  const size = (w != null && h != null) ? ` ${w}×${h}` : '';
  let out = `${pad}${type} "${name}" id=${id}${size}\n`;
  (n.children || []).forEach(c => { out += summarize(c, depth + 1); });
  return out;
}

async function main() {
  const nodeId = extractNodeId(process.argv[2] || '8245-50730');
  const file = await getFile(nodeId);
  if (file.err) {
    console.error('Figma API Error:', file.err);
    process.exit(1);
  }
  const nodes = file.nodes || {};
  const nodeData = nodes[nodeId];
  const node = nodeData ? nodeData.document : null;
  if (!node) {
    console.error('Node not found:', nodeId);
    process.exit(1);
  }
  console.log(summarize(node));
}

main().catch(err => { console.error(err); process.exit(1); });
