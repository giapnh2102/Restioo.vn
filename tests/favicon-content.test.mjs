import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const html = readFileSync(join(root, 'index.html'), 'utf8');

function pngSize(path) {
  const bytes = readFileSync(path);
  assert.equal(bytes.toString('ascii', 1, 4), 'PNG', `${path} is not a PNG`);
  return {
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
  };
}

[
  'image/favicon-16x16.png',
  'image/favicon-32x32.png',
  'image/apple-touch-icon.png',
  'image/icon-192x192.png',
  'image/icon-512x512.png',
  'site.webmanifest',
].forEach((path) => assert.ok(existsSync(join(root, path)), `Missing favicon asset: ${path}`));

assert.match(html, /rel="icon"[^>]+image\/favicon-32x32\.png/);
assert.match(html, /rel="icon"[^>]+image\/favicon-16x16\.png/);
assert.match(html, /rel="apple-touch-icon"[^>]+image\/apple-touch-icon\.png/);
assert.match(html, /rel="manifest"[^>]+site\.webmanifest/);
assert.match(html, /name="theme-color" content="#ffffff"/);

assert.deepEqual(pngSize(join(root, 'image/favicon-16x16.png')), { width: 16, height: 16 });
assert.deepEqual(pngSize(join(root, 'image/favicon-32x32.png')), { width: 32, height: 32 });
assert.deepEqual(pngSize(join(root, 'image/apple-touch-icon.png')), { width: 180, height: 180 });
assert.deepEqual(pngSize(join(root, 'image/icon-192x192.png')), { width: 192, height: 192 });
assert.deepEqual(pngSize(join(root, 'image/icon-512x512.png')), { width: 512, height: 512 });

const manifest = JSON.parse(readFileSync(join(root, 'site.webmanifest'), 'utf8'));
assert.equal(manifest.name, 'Restioo');
assert.equal(manifest.short_name, 'Restioo');
assert.equal(manifest.theme_color, '#ffffff');
assert.equal(manifest.background_color, '#ffffff');
assert.ok(manifest.icons.some((icon) => icon.src === 'image/icon-192x192.png' && icon.sizes === '192x192'));
assert.ok(manifest.icons.some((icon) => icon.src === 'image/icon-512x512.png' && icon.sizes === '512x512'));
