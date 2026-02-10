#!/usr/bin/env node
/**
 * Fetch ECOM-1 node and output style/fills.
 * Usage: node fetch-ecom1-node-style.js "8245:50821"
 */
const https = require('https');

const FIGMA_FILE_KEY = 'SENdzNzEvY34jswc3Ghsoi';
const FIGMA_TOKEN = process.env.FIGMA_TOKEN || 'figd_6TAj2qb24EbDJt3A-S-KNUILYum7faVRjRr21KYk';

function getFile(nodeId) {
  return new Promise((resolve, reject) => {
    const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/nodes?ids=${encodeURIComponent(nodeId)}&depth=2`;
    https.get(url, { headers: { 'X-Figma-Token': FIGMA_TOKEN } }, (res) => {
      let data = '';
      res.on('data', (c) => { data += c; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function findNode(node, id) {
  if (!node) return null;
  if (node.id === id) return node;
  for (const c of node.children || []) {
    const found = findNode(c, id);
    if (found) return found;
  }
  return null;
}

async function main() {
  const nodeId = (process.argv[2] || '8245:50821').replace(/-/g, ':');
  const file = await getFile(nodeId);
  if (file.err) { console.error(file.err); process.exit(1); }
  const nodes = file.nodes || {};
  const data = Object.values(nodes)[0];
  const doc = data?.document;
  const target = doc?.id === nodeId ? doc : findNode(doc, nodeId);
  if (!target) { console.error('Node not found'); process.exit(1); }
  const fills = target.fills;
  const style = target.style;
  console.log('fills:', JSON.stringify(fills, null, 2));
  console.log('style:', style ? { fontFamily: style.fontFamily, fontSize: style.fontSize, fontWeight: style.fontWeight } : 'n/a');
  if (fills && fills[0]?.color) {
    const c = fills[0].color;
    const r = Math.round((c.r || 0) * 255);
    const g = Math.round((c.g || 0) * 255);
    const b = Math.round((c.b || 0) * 255);
    const a = (c.a != null ? c.a : 1);
    console.log('CSS:', a < 1 ? `rgba(${r},${g},${b},${a})` : `rgb(${r},${g},${b})`);
    console.log('HEX:', '#' + [r,g,b].map(x => x.toString(16).padStart(2,'0')).join(''));
  }
}

main().catch(err => { console.error(err); process.exit(1); });
