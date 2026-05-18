import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));

const firebaseConfig = JSON.parse(readFileSync(join(root, 'firebase.json'), 'utf8'));
const webappPackage = JSON.parse(readFileSync(join(root, 'webapp/package.json'), 'utf8'));
const appSource = readFileSync(join(root, 'webapp/src/App.tsx'), 'utf8');
const dataSource = readFileSync(join(root, 'webapp/src/data/restiooData.ts'), 'utf8');

assert.equal(firebaseConfig.hosting.public, 'webapp/dist');
assert.deepEqual(firebaseConfig.hosting.rewrites, [{ source: '**', destination: '/index.html' }]);
assert.equal(webappPackage.scripts.build, 'tsc --noEmit && vite build');
assert.match(appSource, /path="\/app"/);
assert.match(appSource, /path="\/admin"/);
assert.match(appSource, /path="\/app\/bookings\/:bookingId\/qr"/);
assert.match(dataSource, /CÔNG TY TRÁCH NHIỆM HỮU HẠN RESTIOO/);
assert.match(dataSource, /RESTIOO CO\., LTD\./);
assert.match(dataSource, /info@restioo\.vn/);
