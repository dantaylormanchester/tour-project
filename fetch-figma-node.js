#!/usr/bin/env node
/**
 * Fetch a Figma node's structure (layout, styles, children) via API.
 * Usage: node fetch-figma-node.js "6321:1162141"
 *    or: node fetch-figma-node.js "6321-1162141"
 */
const https = require('https');
const FIGMA_FILE_KEY = '4blV8cueIOXSVyVE2l4gDB';
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
    const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/nodes?ids=${encodeURIComponent(nodeId)}&depth=5`;
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
  const children = node.children || [];
  for (const c of children) {
    const found = findNode(c, id);
    if (found) return found;
  }
  return null;
}

function summarize(n, depth = 0) {
  if (!n) return '';
  const pad = '  '.repeat(depth);
  const type = n.type || 'UNKNOWN';
  const name = (n.name || '').slice(0, 60);
  const w = n.absoluteBoundingBox?.width;
  const h = n.absoluteBoundingBox?.height;
  const size = (w != null && h != null) ? ` ${w}×${h}` : '';
  const fills = n.fills;
  const fillStr = Array.isArray(fills) && fills.length
    ? fills.map(f => (f.color ? `rgba(${Math.round((f.color.r||0)*255)},${Math.round((f.color.g||0)*255)},${Math.round((f.color.b||0)*255)},${(f.color.a != null ? f.color.a : 1)})` : f.type)).join(', ')
    : '';
  const strokes = n.strokes;
  const strokeStr = Array.isArray(strokes) && strokes.length
    ? strokes.map(s => s.color ? `rgba(${Math.round((s.color.r||0)*255)},${Math.round((s.color.g||0)*255)},${Math.round((s.color.b||0)*255)},${(s.color.a != null ? s.color.a : 1)})` : '').join(', ')
    : '';
  const effects = n.effects;
  const effectStr = Array.isArray(effects) && effects.length ? JSON.stringify(effects.map(e => ({ type: e.type, radius: e.radius, color: e.color }))) : '';
  const layout = n.layoutMode || n.primaryAxisAlignItems || n.counterAxisAlignItems ? ` layout:${n.layoutMode || ''} align:${n.primaryAxisAlignItems || ''}/${n.counterAxisAlignItems || ''} gap:${n.itemSpacing ?? ''} padding:${n.paddingLeft ?? ''} ${n.paddingRight ?? ''} ${n.paddingTop ?? ''} ${n.paddingBottom ?? ''}` : '';
  const cornerRadius = n.cornerRadius ?? n.rectangleCornerRadii;
  const radiusStr = cornerRadius != null ? ` radius:${Array.isArray(cornerRadius) ? cornerRadius.join(',') : cornerRadius}` : '';
  let out = `${pad}${type} "${name}"${size}${radiusStr}${layout}\n`;
  if (fillStr) out += `${pad}  fills: ${fillStr}\n`;
  if (strokeStr) out += `${pad}  strokes: ${strokeStr}\n`;
  if (effectStr) out += `${pad}  effects: ${effectStr}\n`;
  if (n.style) {
    const font = n.style.fontFamily || n.style.fontSize;
    if (font) out += `${pad}  style: fontFamily=${n.style.fontFamily} fontSize=${n.style.fontSize} fontWeight=${n.style.fontWeight} lineHeight=${JSON.stringify(n.style.lineHeightPx ?? n.style.lineHeightUnit)}\n`;
  }
  if (n.characters) out += `${pad}  text: "${(n.characters || '').slice(0, 80)}${(n.characters || '').length > 80 ? '...' : ''}"\n`;
  (n.children || []).forEach(c => { out += summarize(c, depth + 1); });
  return out;
}

async function main() {
  const nodeId = extractNodeId(process.argv[2] || '');
  if (!nodeId) {
    console.error('Usage: node fetch-figma-node.js <node-id>');
    process.exit(1);
  }
  const file = await getFile(nodeId);
  if (file.err) {
    console.error(file.err);
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
  console.log('\n--- Full node JSON (key props) ---');
  const strip = (o, depth = 0) => {
    if (depth > 6) return '[max depth]';
    if (!o || typeof o !== 'object') return o;
    const copy = {};
    for (const k of Object.keys(o)) {
      if (k === 'children') copy[k] = (o[k] || []).map(c => strip(c, depth + 1));
      else if (['absoluteBoundingBox', 'fills', 'strokes', 'effects', 'style', 'layoutMode', 'primaryAxisAlignItems', 'counterAxisAlignItems', 'itemSpacing', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'cornerRadius', 'rectangleCornerRadii', 'name', 'type', 'id', 'characters', 'lineHeightPx', 'fontFamily', 'fontSize', 'fontWeight'].includes(k))
        copy[k] = o[k];
    }
    return copy;
  };
  console.log(JSON.stringify(strip(node), null, 2));
}

main().catch(err => { console.error(err); process.exit(1); });
