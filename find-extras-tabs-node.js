#!/usr/bin/env node
/**
 * Find Extras tabs (or any node with "tab" in name) in Figma file and output node id + summary.
 * Usage: node find-extras-tabs-node.js
 */
const https = require('https');
const FIGMA_FILE_KEY = '4blV8cueIOXSVyVE2l4gDB';
const FIGMA_TOKEN = process.env.FIGMA_TOKEN || 'figd_6TAj2qb24EbDJt3A-S-KNUILYum7faVRjRr21KYk';

function getFile(depth = 4) {
  return new Promise((resolve, reject) => {
    const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}?depth=${depth}`;
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
  const id = node.id;
  const pathStr = path.concat(node.name || '').join(' > ');
  if (name.includes('tab') || (pathStr.toLowerCase().includes('extras') && (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE') && (node.children || []).length >= 2)) {
    const w = node.absoluteBoundingBox?.width;
    const h = node.absoluteBoundingBox?.height;
    const r = node.cornerRadius ?? node.rectangleCornerRadii;
    out.push({ id, name: node.name, path: pathStr, width: w, height: h, cornerRadius: r, type: node.type });
  }
  (node.children || []).forEach(c => walk(c, [...path, node.name || ''], out));
}

async function main() {
  const file = await getFile(5);
  if (file.err) {
    console.error(file.err);
    process.exit(1);
  }
  const out = [];
  (file.document?.children || []).forEach(page => {
    walk(page, [page.name], out);
  });
  console.log(JSON.stringify(out, null, 2));
}

main().catch(err => { console.error(err); process.exit(1); });
