import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const script = readFileSync(join(root, 'script.js'), 'utf8');
const styles = readFileSync(join(root, 'styles.css'), 'utf8');

[
  'function openServiceJourney',
  'function openB2BMockup',
  'function openNewsletterMockup',
  'function openBookingMockup',
  'function createMockupOverlay',
  'function handleMockupSubmit',
  'Thong tin se duoc gui ve phia Restioo',
].forEach((expected) => assert.ok(script.includes(expected), `Missing interaction code: ${expected}`));

[
  '.service-journey-overlay',
  '.journey-stage',
  '.pod-corridor',
  '.mockup-dialog',
  '.mockup-form',
  '.mockup-success',
].forEach((expected) => assert.ok(styles.includes(expected), `Missing interaction style: ${expected}`));

assert.doesNotMatch(script, /eval\(/, 'Modal actions must not use eval');
