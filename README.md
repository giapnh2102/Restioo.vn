# Restioo – Ngủ Trưa Thông Minh 🌙

Restioo là một **landing page web hiện đại** để giới thiệu dịch vụ Sleep Pod - không gian nghỉ trưa thông minh với công nghệ IoT tích hợp đầy đủ. Ứng dụng cung cấp giao diện chuyên nghiệp, tương tác cao và trải nghiệm người dùng tuyệt vời.

## ✨ Tính Năng Chính

- **🎬 Video Review Modal**: Xem 3 video review dạng 9:16 với mockup điện thoại thực tế, hỗ trợ navigation prev/next
- **📸 Gallery + Lightbox**: Xem 6 hình ảnh pod với zoom toàn màn hình, navigation bằng keyboard (arrow keys)
- **💬 Testimonials Section**: 6 đánh giá tích cực từ khách hàng thực tế với rating 5 sao
- **📱 Interview Section**: Phần triển khai tại các địa điểm chính
- **🎨 Giao diện hiện đại**: Hero section với background image, gradient overlay, responsive design
- **⚡ Interactive Buttons**: Toast notifications, modal dialogs, loading states, keyboard shortcuts
- **📧 Email Integration**: Signup form với validation, toast messages
- **🎯 Smooth Scrolling**: Navigation mượt mà giữa các phần, đóng menu mobile khi click link
- **♿ Accessible**: Hỗ trợ keyboard navigation, screen reader friendly
- **🌍 Hỗ trợ Tiếng Việt**: Giao diện hoàn toàn bằng tiếng Việt

## 🚀 Công Nghệ Sử Dụng

### Frontend Stack
- **HTML5**: Markup ngữ nghĩa với structure rõ ràng
- **CSS3**: Styling hiện đại với:
  - Gradient backgrounds
  - CSS animations & transitions
  - Flexbox & Grid layout
  - Backdrop filter effects
  - CSS variables cho theming
- **JavaScript (Vanilla)**: Không sử dụng framework, tối ưu hiệu suất
  - Video modal player (3 videos, carousel)
  - Gallery lightbox (6 images, keyboard nav)
  - Toast notification system
  - Modal dialog system
  - Interactive button handlers
- **Tailwind CSS**: Framework CSS utility-first (v3.4.17)
- **Lucide Icons**: Thư viện SVG icons (v0.263.0)
- **Google Fonts**: "Be Vietnam Pro" & "Playfair Display"

### Assets
- **Images**: 6 hình ảnh pod từ folder `image/`
- **Videos**: 3 video review từ folder `video/`

## 📋 Yêu Cầu Hệ Thống

### Trình duyệt
- **Desktop**: Chrome, Firefox, Safari, Edge (phiên bản mới nhất)
- **Mobile**: iOS Safari 12+, Chrome Android
- **Hỗ trợ tính năng**:
  - CSS Grid & Flexbox
  - CSS Animation & Transition
  - CSS Custom Properties
  - Backdrop Filter
  - Aspect Ratio
  - Media Queries

### Môi trường
- Kết nối Internet (để tải CDN resources)
- Nodejs (không bắt buộc, chỉ nếu muốn chạy server)

## 📁 Cấu Trúc Dự Án

```
restioo/
├── index.html              # File HTML chính - Toàn bộ markup
├── styles.css              # CSS tách riêng - Toàn bộ styling
├── script.js               # JavaScript tách riêng - Toàn bộ logic
├── README.md               # Documentation (file này)
├── image/                  # Thư mục hình ảnh
│   ├── sleepbox2.jpg       # Pod interior 1
│   ├── sleepbox3.jpg       # Pod interior 2
│   ├── sleepbox4.jpg       # Pod interior 3 (hero background)
│   ├── sleepbox5.jpg       # Pod interior 4
│   └── sleep-box-6.jpg     # Pod overview
├── video/                  # Thư mục video review
│   ├── snaptik.org_video_cc04e22f008fdf183a8fd973298c8dc7.mp4
│   ├── snaptik.org_video_c410e188cae8c17c7a817d7b2d7c92e6.mp4
│   └── snaptik.org_video_128bfe732ed37b08c7a6f94ef30f0d7d.mp4
└── .git/                   # Git repository

```

## 🔧 Cài Đặt & Chạy

### Phương pháp 1: Direct (Nhanh nhất)
```bash
# Đơn giản mở index.html trong trình duyệt
# Không cần cài đặt gì cả
```

### Phương pháp 2: Sử dụng Git
```bash
# Clone repository
git clone <repository-url>
cd restioo

# Mở file trong trình duyệt
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### Phương pháp 3: Sử dụng Local Server (Recommended)
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# Hoặc bất kỳ local server nào khác
# Truy cập: http://localhost:8000
```

## 💻 Cách Sử Dụng

### Các Tính Năng Tương Tác

#### 🎬 Video Review
```
1. Click nút "Xem review" ở hero section
2. Modal video sẽ mở với mockup điện thoại 9:16
3. Click nút "Trước" / "Tiếp theo" để chuyển video
4. Hoặc dùng phím: → (tiếp theo), ← (trước)
5. Click ✕ hoặc Escape để đóng
```

#### 📸 Gallery Lightbox
```
1. Scroll đến phần Gallery
2. Click vào bất kỳ hình ảnh nào
3. Lightbox sẽ mở in dark overlay
4. Click nút Trước/Tiếp theo hoặc dùng phím → ← để navigate
5. Click ngoài ảnh hoặc Escape để đóng
```

#### 💬 Button Interactions
```
- "Khám phá dịch vụ" → Toast: "Tính năng sắp có mặt"
- "Xem review" → Mở video modal
- "Đặt chỗ" → Modal: "Mở app để đặt chỗ"
- "Liên hệ" → Copy email to clipboard + Toast
- "B2B" → Modal hợp tác + copy email
- Email signup → Loading spinner + success toast
```

#### ⌨️ Keyboard Shortcuts
```
- Arrow Right / Space: Video tiếp theo
- Arrow Left: Video trước
- Escape: Đóng modal/lightbox
- Navigation links: Smooth scroll
```

## 🎨 Cấu Trúc Màu Sắc

### CSS Variables (Custom Properties)
```css
--bg: #F0F4F8        /* Background chính - Xanh nhạt */
--surface: #FFFFFF   /* Surface elements - Trắng */
--text: #1A2B3C      /* Text color - Xanh tối */
--primary: #1E6B8A   /* Brand color - Xanh chính */
--accent: #5BBFD6    /* Accent color - Xanh nhấn */
```

### Color Palette
- **Primary Blue**: `#1E6B8A` (buttons, headers)
- **Accent Cyan**: `#5BBFD6` (highlights, accents)
- **Dark Navy**: `#0D2B3E` (hero gradient)
- **Light Gray**: `#F0F4F8` (backgrounds)
- **White**: `#FFFFFF` (surface)

## 📰 Nội Dung Các Phần

### 1. Navigation Bar
- Logo + Brand name
- Desktop menu (About, Features, How it works, Pricing, Locations, App)
- CTA button "Tải App Sớm"
- Mobile menu (hamburger)

### 2. Hero Section
- Background image + gradient overlay
- Main headline + subheadline
- 2 CTA buttons (Explore / Watch review)
- Stats: 30+ phút, 100% riêng tư, IoT
- Pod SVG illustration
- Floating badges

### 3. Trust Bar
- 5 key benefits với icons

### 4. About Section
- Decorative circles
- About Restioo text
- 3 comparison cards (vs café ngủ, vs sleepbox truyền thống, Restioo)

### 5. Target Customers (3 cards)
- Office workers
- Mobile workers (shipper, delivery)
- Students

### 6. Core Values (6 cards)
- Privacy
- Automation
- Cleanliness
- IoT Technology
- Energy Recovery
- Professional Experience

### 7. How It Works (6 steps)
- Alternating left/right layout
- Timeline connector
- Step-by-step process

### 8. Tech Features (8 cards)
- Lighting, Temperature, Sound, Air filter
- QR door, Soundproof, IoT, Auto cleaning

### 9. Comparison Table
- 6 rows × 4 competitors
- Green checkmarks cho Restioo

### 10. Interview & Testimonials (6 cards)
- Customer avatars + names + jobs
- 5-star ratings
- Review text
- Usage frequency

### 11. Gallery + Lightbox (6 images)
- Hover effects
- Fullscreen modal
- Keyboard navigation
- Image descriptions

### 12. Pricing Section (3 tiers)
- Pay per hour
- Membership plan (featured)
- B2B package

### 13. Locations
- 4 location types
- Map mockup
- Launch info

### 14. Brand Messaging
- Tagline: "30 phút sạc nhanh, cả ngày năng lượng"
- 3 benefit pillars

### 15. Video Review Modal
- 3 videos carousel
- Phone mockup 9:16
- Navigation buttons
- Video counter

### 16. App Mockup
- Phone frame
- App screenshots mock
- Features list

### 17. B2B & Community
- B2B signup
- Social media links

### 18. Final CTA
- Email signup
- Success notification

### 19. Footer
- Brand info
- Product links
- Company links
- Contact info

## 🎯 Tính Năng Nâng Cao

### Toast Notification System
- 3 loại: success (xanh), warning (vàng), info (xanh tím)
- Tự động tắt sau 3 giây
- Slide in/out animation

### Modal Dialog System
- Backdrop overlay click to close
- Escape key support
- Custom title + message
- Optional callback actions

### Video Modal (Advanced)
- 3 video carousel
- Phone mockup 9:16 format
- Auto-play video
- Keyboard navigation (arrow keys)
- Proper audio handling
- Video paused on close

### Gallery Lightbox
- 6 images with keyboard nav
- Arrow keys to navigate
- Escape to close
- Image descriptions

### Interactive Buttons
- Loading state with spinner animation
- Hover effects
- Success confirmations
- Email clipboard copy

## 🌐 Các Tài Nguyên Bên Ngoài (CDN)

```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com/3.4.17"></script>

<!-- Lucide Icons -->
<script src="https://cdn.jsdelivr.net/npm/lucide@0.263.0/dist/umd/lucide.min.js"></script>

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;1,600&display=swap" rel="stylesheet">

<!-- APIs (nếu cần) -->
<script src="/_sdk/element_sdk.js"></script>
<script src="/_sdk/data_sdk.js"></script>
```

## 📱 Responsive Breakpoints

- **Mobile**: `< 640px` (1 cột, stack layout)
- **Tablet**: `640px - 1024px` (2-3 cột)
- **Desktop**: `> 1024px` (3-4 cột layout)
- **Large Desktop**: `> 1280px` (max-width 7xl)

## 🔒 Bảo Mật & Performance

### Security
- ✅ Không lưu trữ dữ liệu nhạy cảm
- ✅ Không có backend server
- ✅ Cả xử lý client-side
- ✅ Clipboard copy sử dụng Clipboard API (secure)

### Performance
- ✅ No build tools required
- ✅ No bundler/minification needed
- ✅ Lazy loading images in gallery
- ✅ CSS & JS tách riêng (browser caching)
- ✅ Smooth scrolling behavior
- ✅ Optimized animations (GPU-accelerated)

## 🐛 Troubleshooting

### Videos không phát
```
Solution:
1. Kiểm tra đường dẫn file video trong script.js
2. Đảm bảo folder video/ tồn tại
3. Thử refresh trang (Ctrl+F5)
4. Kiểm tra browser console (F12)
```

### Images không hiển thị
```
Solution:
1. Kiểm tra folder image/ tồn tại
2. Kiểm tra đường dẫn CSS (image/filename.jpg)
3. Thử từ server local (http://localhost:8000)
4. Xem Network tab trong DevTools
```

### Animations không hoạt động
```
Solution:
1. Kiểm tra browser hỗ trợ CSS Animation
2. Disable browser extensions (nếu cần)
3. Clear cache và hard refresh (Ctrl+Shift+R)
```

### Audio không có trong video
```
Solution:
1. Kiểm tra video file có audio track
2. Đảm bảo video không muted trên tag
3. Kiểm tra browser volume không mute
4. Thử video khác để kiểm tra
```

## 📚 Documentation Structure

- [Hero Section](#giao-diện-hero) - Background, layout
- [Video Modal](#video-review-modal) - 3 videos, carousel
- [Gallery](#gallery-lightbox) - 6 images, lightbox
- [Interactions](#button-interactions) - Toast, modal, handlers
- [Responsive](#responsive-breakpoints) - Mobile, tablet, desktop

## 🤝 Đóng Góp

Nếu muốn đóng góp:

```bash
1. Fork repository
2. Tạo branch: git checkout -b feature/NewFeature
3. Commit: git commit -m 'Add NewFeature'
4. Push: git push origin feature/NewFeature
5. Pull Request
```

## 📝 Notes

- Ứng dụng tối ưu cho modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
- Supports dark mode thông qua CSS variables
- Zero dependencies - chỉ vanilla JS
- Self-contained - tất cả assets local hoặc CDN

## 💡 Future Enhancements

- [ ] Add analytics tracking
- [ ] Multi-language support (EN, VI, ZH)
- [ ] PWA functionality
- [ ] Backend integration
- [ ] User authentication
- [ ] Booking system
- [ ] Push notifications

## 📄 Giấy Phép

MIT License - Tự do sử dụng, sửa đổi, phân phối

## 📧 Liên Hệ & Support

```
Email: contact@restioo.vn
B2B: partner@restioo.vn
Website: https://restioo.vn
GitHub: [your-repo-url]
```

## 🙏 Cảm Ơn

- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Icons** - Beautiful SVG icons
- **Google Fonts** - Premium typography
- Tất cả những người đóng góp và người sử dụng!

---

**Version**: 2.0  
**Last Updated**: April 2, 2026  
**Status**: Production Ready ✅

**⭐ Nếu bạn thích project này, vui lòng give a STAR! ⭐**
