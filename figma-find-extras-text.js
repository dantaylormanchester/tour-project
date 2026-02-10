#!/usr/bin/env node
/**
 * Fetch Figma file and find text nodes that might be Extras hero (name or characters containing "Extras" or "extra").
 */
const https = require('https');
const FIGMA_FILE_KEY = '4blV8cueIOXSVyVE2l4gDB';
const FIGMA_TOKEN = process.env.FIGMA_TOKEN || 'figd_6TAj2qb24EbDJt3A-S-KNUILYum7faVRjRr21KYk';

function getFile() {
  return new Promise((resolve, reject) => {
    const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}?depth=10`;
    https.get(url, { headers: { 'X-Figma-Token': FIGMA_TOKEN } }, (res) => {
      let data = '';
      res.on('data', (c) => { data += c; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function walk(node, path, out) {
  if (!node) return;
  const name = (node.name || '').toLowerCase();
  const chars = (node.characters || '').toLowerCase();
  const isExtras = name.includes('extra') || chars.includes('extra') || path.some(p => (p.name || '').toLowerCase().includes('extra'));
  if (node.type === 'TEXT' && node.characters && (isExtras || path.some(p => (p.name || '').toLowerCase() === 'hero'))) {
    out.push({ path: path.map(p => p.name).join(' > '), name: node.name, characters: node.characters });
  }
  (node.children || []).forEach(c => walk(c, [...path, node], out));
}

async function main() {
  const file = await getFile();
  if (file.err) {
    console.error(file.err);
    process.exit(1);
  }
  const out = [];
  const doc = file.document;
  (doc.children || []).forEach(page => {
    walk(page, [page], out);
  });
  console.log(JSON.stringify(out, null, 2));
}

main().catch(err => { console.error(err); process.exit(1); });
