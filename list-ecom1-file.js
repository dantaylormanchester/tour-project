#!/usr/bin/env node
/**
 * List ECOM-1 Figma file structure to find basket icon.
 */
const https = require('https');

const FIGMA_FILE_KEY = 'SENdzNzEvY34jswc3Ghsoi';
const FIGMA_TOKEN = process.env.FIGMA_TOKEN || 'figd_6TAj2qb24EbDJt3A-S-KNUILYum7faVRjRr21KYk';

function getFile() {
  return new Promise((resolve, reject) => {
    const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}`;
    https.get(url, { headers: { 'X-Figma-Token': FIGMA_TOKEN } }, (res) => {
      let data = '';
      res.on('data', (c) => { data += c; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function walk(n, depth = 0, path = '') {
  if (!n) return [];
  const p = path ? `${path} > ` : '';
  const name = (n.name || '').slice(0, 50);
  const type = n.type || '';
  const id = n.id || '';
  let out = [{ depth, name, type, id, path: p + name }];
  (n.children || []).forEach(c => {
    out = out.concat(walk(c, depth + 1, p + name));
  });
  return out;
}

async function main() {
  const file = await getFile();
  if (file.err) { console.error(file.err); process.exit(1); }
  const doc = file.document;
  if (!doc) { console.error('No document'); process.exit(1); }
  const nodes = walk(doc);
  const basket = nodes.filter(n => /basket|bag|cart|shopping/i.test(n.name));
  console.log('Nodes containing basket/bag/cart/shopping:');
  basket.forEach(n => console.log(`  ${n.id}  ${n.name}  (${n.type})`));
}

main().catch(err => { console.error(err); process.exit(1); });
