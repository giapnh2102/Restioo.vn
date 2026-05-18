import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const html = readFileSync(join(root, 'index.html'), 'utf8');
const script = readFileSync(join(root, 'script.js'), 'utf8');

function assertIncludes(source, expected) {
  const normalizedSource = source.replace(/\s+/g, ' ');
  const normalizedExpected = expected.replace(/\s+/g, ' ');
  assert.ok(
    normalizedSource.toLowerCase().includes(normalizedExpected.toLowerCase()),
    `Missing required website content: ${expected}`,
  );
}

[
  '<section id="company"',
  'CÔNG TY TRÁCH NHIỆM HỮU HẠN RESTIOO',
  'RESTIOO CO., LTD.',
  'TP. Hà Nội',
  'info@restioo.vn',
  'Mã số doanh nghiệp',
  'Đang hoàn tất đăng ký',
  'Số điện thoại',
  'Đang cập nhật',
  'Sứ mệnh',
  'Cung cấp không gian nghỉ ngắn hạn riêng tư, hiện đại',
  'Tầm nhìn',
  'mô hình nghỉ ngắn hạn thông minh tại đô thị',
  'Giá trị cốt lõi',
  'Không gian tiêu chuẩn',
  'Cá nhân hóa trải nghiệm',
  'Công nghệ đặt chỗ ưu việt',
  'Hỗ trợ sức khỏe tối ưu',
  'Vị trí và giá cả linh hoạt',
  'Nguyễn Thế Hoàng Nam',
  '200.000.000 VNĐ',
  '40%',
  'Đoàn Ngọc Đức',
  '150.000.000 VNĐ',
  '30%',
  'Đỗ Thị Thu Trang',
  'href="#company"',
].forEach((text) => assertIncludes(html, text));

assert.doesNotMatch(html, /contact@restioo\.vn|partner@restioo\.vn/);
assert.doesNotMatch(script, /contact@restioo\.vn|partner@restioo\.vn/);
assertIncludes(script, 'info@restioo.vn');
