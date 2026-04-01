// Initialize Lucide icons
lucide.createIcons();

// Re-initialize after Lucide icons are created
setTimeout(() => {
  lucide.createIcons();
}, 100);

// Video Modal Functions
const videoList = [
  'video/snaptik.org_video_cc04e22f008fdf183a8fd973298c8dc7.mp4',
  'video/snaptik.org_video_c410e188cae8c17c7a817d7b2d7c92e6.mp4',
  'video/snaptik.org_video_128bfe732ed37b08c7a6f94ef30f0d7d.mp4'
];

let currentVideoIndex = 0;
let closeOnEscHandler = null;
let keyHandlerForVideo = null;

function openVideoModal() {
  currentVideoIndex = 0;
  createVideoModal();
}

function createVideoModal() {
  // Remove existing modal if any
  const existing = document.getElementById('video-modal');
  if (existing) existing.remove();
  
  const overlay = document.createElement('div');
  overlay.className = 'video-modal-overlay';
  overlay.id = 'video-modal';
  
  const content = document.createElement('div');
  content.className = 'video-modal-content';
  
  // Close Button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'video-close-btn';
  closeBtn.innerHTML = '✕';
  closeBtn.onclick = closeVideoModal;
  overlay.appendChild(closeBtn);
  
  // Phone Mockup
  const phoneMockup = document.createElement('div');
  phoneMockup.className = 'phone-mockup';
  
  const video = document.createElement('video');
  video.id = 'video-player';
  video.muted = false;
  video.autoplay = true;
  video.controls = false;
  video.preload = 'auto';
  video.style.objectFit = 'cover';
  
  const source = document.createElement('source');
  source.src = videoList[currentVideoIndex];
  source.type = 'video/mp4';
  
  video.appendChild(source);
  phoneMockup.appendChild(video);
  content.appendChild(phoneMockup);
  
  // Controls
  const controls = document.createElement('div');
  controls.className = 'video-controls';
  
  const prevBtn = document.createElement('button');
  prevBtn.className = 'video-nav-btn';
  prevBtn.innerHTML = '<span style="font-size: 16px;">‹</span> Trước';
  prevBtn.onclick = prevVideo;
  controls.appendChild(prevBtn);
  
  const counter = document.createElement('div');
  counter.className = 'video-counter';
  counter.id = 'video-counter';
  counter.textContent = `${currentVideoIndex + 1} / ${videoList.length}`;
  controls.appendChild(counter);
  
  const nextBtn = document.createElement('button');
  nextBtn.className = 'video-nav-btn';
  nextBtn.innerHTML = 'Tiếp theo <span style="font-size: 16px;">›</span>';
  nextBtn.onclick = nextVideo;
  controls.appendChild(nextBtn);
  
  content.appendChild(controls);
  overlay.appendChild(content);
  
  overlay.onclick = (e) => {
    if (e.target === overlay) closeVideoModal();
  };
  
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  
  // Close on Escape - Remove old handler first
  if (closeOnEscHandler) {
    document.removeEventListener('keydown', closeOnEscHandler);
  }
  closeOnEscHandler = (e) => {
    if (e.key === 'Escape') {
      closeVideoModal();
    }
  };
  document.addEventListener('keydown', closeOnEscHandler);
  
  // Keyboard navigation - Remove old handler first
  if (keyHandlerForVideo) {
    document.removeEventListener('keydown', keyHandlerForVideo);
  }
  keyHandlerForVideo = (e) => {
    if (document.getElementById('video-modal')) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextVideo();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevVideo();
      }
    }
  };
  document.addEventListener('keydown', keyHandlerForVideo);
}

function prevVideo() {
  currentVideoIndex = (currentVideoIndex - 1 + videoList.length) % videoList.length;
  updateVideo();
  showToast('Video trước', 'info');
}

function nextVideo() {
  currentVideoIndex = (currentVideoIndex + 1) % videoList.length;
  updateVideo();
  showToast('Video tiếp theo', 'info');
}

function updateVideo() {
  const video = document.getElementById('video-player');
  const counter = document.getElementById('video-counter');
  
  if (video && counter) {
    video.src = videoList[currentVideoIndex];
    video.load();
    video.play().catch(e => console.log('Play error:', e));
    counter.textContent = `${currentVideoIndex + 1} / ${videoList.length}`;
  }
}

function closeVideoModal() {
  const modal = document.getElementById('video-modal');
  if (modal) {
    const video = modal.querySelector('video');
    if (video) {
      video.pause();
      video.src = '';
    }
    modal.remove();
    document.body.style.overflow = 'auto';
    
    // Remove event listeners
    if (closeOnEscHandler) {
      document.removeEventListener('keydown', closeOnEscHandler);
      closeOnEscHandler = null;
    }
    if (keyHandlerForVideo) {
      document.removeEventListener('keydown', keyHandlerForVideo);
      keyHandlerForVideo = null;
    }
  }
}

// Toast Notification System
function showToast(message, type = 'success', duration = 3000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  toast.style.pointerEvents = 'auto';
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideInToast 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Modal Dialog System
function showModal(title, message, onConfirm = null) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  
  const dialog = document.createElement('div');
  dialog.className = 'modal-dialog';
  dialog.innerHTML = `
    <div class="modal-header">✓ ${title}</div>
    <div class="modal-message">${message}</div>
    <div class="modal-actions">
      <button class="modal-close-btn" onclick="this.closest('.modal-overlay').remove()">Đóng</button>
      ${onConfirm ? '<button class="modal-confirm-btn" onclick="this.closest(\'div\').dataset.confirm && eval(this.closest(\'div\').dataset.confirm); this.closest(\'.modal-overlay\').remove()">Xác nhận</button>' : ''}
    </div>
  `;
  
  if (onConfirm) {
    dialog.dataset.confirm = onConfirm;
  }
  
  overlay.appendChild(dialog);
  overlay.onclick = (e) => e.target === overlay && overlay.remove();
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  
  // Close on Escape key
  const closeOnEscape = (e) => {
    if (e.key === 'Escape') {
      overlay.remove();
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', closeOnEscape);
    }
  };
  document.addEventListener('keydown', closeOnEscape);
  
  setTimeout(() => {
    document.body.style.overflow = 'auto';
  }, 5000);
}

// Mobile menu toggle - Initialize only once
document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
    });
  }
});

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.remove('open');
  }
}

// Email signup handler
function handleEmailSignup(btn) {
  const input = btn.previousElementSibling;
  if (!input.value || !input.value.includes('@')) {
    input.style.borderColor = 'rgba(239,68,68,0.7)';
    showToast('Vui lòng nhập email hợp lệ', 'warning');
    return;
  }
  
  btn.classList.add('btn-loading');
  btn.disabled = true;
  
  setTimeout(() => {
    btn.textContent = '✓ Đã đăng ký!';
    btn.style.background = 'linear-gradient(135deg,#16A34A,#22C55E)';
    input.disabled = true;
    btn.classList.remove('btn-loading');
    showToast(`Cảm ơn bạn đã đăng ký! Chúng tôi sẽ gửi thông tin sớm tới ${input.value}`, 'success');
  }, 800);
}

// Scroll to top function
function scrollToTop() {
  const wrapper = document.querySelector('.app-wrapper');
  if (wrapper) {
    wrapper.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Button click handlers - Initialize only once
let buttonsInitialized = false;

function addButtonHandlers() {
  if (buttonsInitialized) return;
  buttonsInitialized = true;
  
  // CTA Buttons - Exclude email signup buttons
  const ctaButtons = document.querySelectorAll('.btn-primary, .btn-outline-white, .btn-ghost');
  ctaButtons.forEach(btn => {
    // Skip email signup buttons
    if (btn.classList.contains('email-signup-btn')) return;
    
    btn.addEventListener('click', function(e) {
      const text = this.textContent.trim();
      // Add loading animation
      const originalText = this.textContent;
      this.classList.add('btn-loading');
      this.disabled = true;
      
      setTimeout(() => {
        this.classList.remove('btn-loading');
        this.disabled = false;
        this.textContent = originalText;
      }, 800);
      
      if (text.includes('Tải App') || text.includes('Khám phá')) {
        showToast('Tính năng sắp có mặt! Vui lòng theo dõi...', 'info');
      } else if (text.includes('Xem review')) {
        openVideoModal();
      } else if (text.includes('Đặt chỗ')) {
        showModal('Đặt chỗ sử dụng Pod', 'Mở ứng dụng Restioo để đặt chỗ ngay. Hiện tại, tính năng đặt chỗ trực tuyến đang trong giai đoạn beta.', 'showToast("Đã chuyển hướng tới app!", "info")');
      } else if (text.includes('Liên lạc') || text.includes('Liên hệ')) {
        showToast('Email được sao chép: contact@restioo.vn', 'success');
        navigator.clipboard.writeText('contact@restioo.vn');
      } else if (text.includes('B2B')) {
        showModal('Hợp tác B2B', 'Email hợp tác: partner@restioo.vn\n\nChúng tôi sẽ liên hệ bạn sớm nhất!', 'showToast("Email hợp tác được sao chép", "success")');
        navigator.clipboard.writeText('partner@restioo.vn');
      } else if (text.includes('Liên hệ') || text.includes('Đăng ký')) {
        showToast('Cảm ơn bạn quan tâm! Chúng tôi sẽ liên hệ sớm.', 'success');
      }
    });
  });
  
  // Email input handlers - Better focus states
  const emailInputs = document.querySelectorAll('input[type="email"]');
  emailInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.style.borderColor = 'rgba(91,191,214,0.6)';
      this.style.boxShadow = '0 0 0 3px rgba(91,191,214,0.1)';
    });
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.style.borderColor = 'rgba(91,191,214,0.15)';
        this.style.boxShadow = 'none';
      }
    });
  });
}

// Initialize button handlers when page loads
document.addEventListener('DOMContentLoaded', addButtonHandlers);

// Smooth scroll for nav links - Initialize only once
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const wrapper = document.querySelector('.app-wrapper');
        const targetOffset = target.getBoundingClientRect().top + wrapper.scrollTop - 80;
        wrapper.scrollTo({ top: targetOffset, behavior: 'smooth' });
      }
    });
  });
});

// Scroll-triggered fade animations
const fadeEls = document.querySelectorAll('.fade-in');
const wrapper = document.querySelector('.app-wrapper');

function checkFade() {
  const wrapperRect = wrapper.getBoundingClientRect();
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < wrapperRect.bottom - 80) {
      el.classList.add('visible');
    }
  });
}

wrapper.addEventListener('scroll', checkFade, { passive: true });
// Initial check
setTimeout(checkFade, 100);

// Lightbox functionality
const galleryImages = [
  { src: 'image/sleepbox2.jpg', desc: 'Khoang ngủ với thiết kế tối ưu' },
  { src: 'image/sleepbox3.jpg', desc: 'Nội thất premium và công nghệ IoT' },
  { src: 'image/sleepbox4.jpg', desc: 'Hệ thống lọc không khí HEPA' },
  { src: 'image/sleepbox5.jpg', desc: 'Cửa vào tự động QR' },
  { src: 'image/sleep-box-6.jpg', desc: 'Bên ngoài pod với thiết kế hiện đại' }
];

let currentLightboxIndex = 0;
let lightboxKeyHandler = null;

function openLightbox(index) {
  currentLightboxIndex = index;
  const lightbox = document.getElementById('lightbox');
  const image = galleryImages[index];
  document.getElementById('lightbox-image').src = image.src;
  document.getElementById('lightbox-description').textContent = image.desc;
  document.getElementById('lightbox-counter').textContent = `${index + 1} / ${galleryImages.length}`;
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  // Add keyboard handler - Remove old one first
  if (lightboxKeyHandler) {
    document.removeEventListener('keydown', lightboxKeyHandler);
  }
  lightboxKeyHandler = (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('hidden')) {
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'Escape') closeLightbox();
    }
  };
  document.addEventListener('keydown', lightboxKeyHandler);
}

function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
  document.body.style.overflow = 'auto';
  
  // Remove keyboard handler
  if (lightboxKeyHandler) {
    document.removeEventListener('keydown', lightboxKeyHandler);
    lightboxKeyHandler = null;
  }
}

function nextLightbox() {
  currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
  openLightbox(currentLightboxIndex);
}

function prevLightbox() {
  currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
  openLightbox(currentLightboxIndex);
}

// Initialize Lucide icons after lightbox setup
setTimeout(() => lucide.createIcons(), 100);

// Initialize SDK
window.elementSdk && window.elementSdk.init({
  defaultConfig: {
    hero_headline: 'Nghỉ Ngơi Thông Minh. Sạc Năng Lượng Trong 30 Phút.',
    hero_subheadline: 'Restioo mang đến không gian nghỉ trưa riêng tư, sạch sẽ, tự động hóa hoàn toàn — ngay tại tòa nhà văn phòng, campus, trung tâm thương mại của bạn.',
    cta_primary: 'Khám phá dịch vụ',
    tagline: '30 phút sạc nhanh, cả ngày năng lượng.',
    about_title: 'Không chỉ là chỗ ngủ — Trải nghiệm phục hồi năng lượng đích thực',
    footer_text: 'Dịch vụ ngủ trưa thông minh – Riêng tư – Tự động hóa. Đang phát triển, dự kiến ra mắt 2025.',
    background_color: '#F0F4F8',
    surface_color: '#FFFFFF',
    text_color: '#1A2B3C',
    primary_color: '#1E6B8A',
    accent_color: '#5BBFD6',
    font_family: 'Be Vietnam Pro',
    font_size: 16
  },
  onConfigChange: async function(config) {
    const dc = window.elementSdk.config;

    // Text updates
    const heroH = document.getElementById('hero-headline');
    if (heroH) heroH.textContent = config.hero_headline || dc.hero_headline;

    const heroS = document.getElementById('hero-subheadline');
    if (heroS) heroS.textContent = config.hero_subheadline || dc.hero_subheadline;

    const cta1 = document.getElementById('hero-cta-1');
    if (cta1) {
      const span = cta1.querySelector('span');
      if (span) span.textContent = config.cta_primary || dc.cta_primary;
    }

    const navCta = document.getElementById('nav-cta');
    if (navCta) navCta.textContent = 'Tải App Sớm';

    const aTitle = document.getElementById('about-title');
    if (aTitle) aTitle.textContent = config.about_title || dc.about_title;

    const footerT = document.getElementById('footer-text');
    if (footerT) footerT.textContent = config.footer_text || dc.footer_text;

    // Colors
    const bg = config.background_color || dc.background_color;
    const surface = config.surface_color || dc.surface_color;
    const text = config.text_color || dc.text_color;
    const primary = config.primary_color || dc.primary_color;
    const accent = config.accent_color || dc.accent_color;

    document.documentElement.style.setProperty('--bg', bg);
    document.documentElement.style.setProperty('--surface', surface);
    document.documentElement.style.setProperty('--text', text);
    document.documentElement.style.setProperty('--primary', primary);
    document.documentElement.style.setProperty('--accent', accent);
    document.body.style.background = bg;
    document.body.style.color = text;

    // Font
    const font = config.font_family || dc.font_family;
    const baseSize = config.font_size || dc.font_size;
    document.body.style.fontFamily = `'${font}', 'Be Vietnam Pro', sans-serif`;

    // Font sizes
    document.querySelectorAll('p, li, td, th').forEach(el => {
      el.style.fontSize = `${baseSize * 0.875}px`;
    });
  },
  mapToCapabilities: function(config) {
    const dc = window.elementSdk.config;
    return {
      recolorables: [
        {
          get: () => config.background_color || dc.background_color,
          set: (v) => { config.background_color = v; window.elementSdk.setConfig({ background_color: v }); }
        },
        {
          get: () => config.surface_color || dc.surface_color,
          set: (v) => { config.surface_color = v; window.elementSdk.setConfig({ surface_color: v }); }
        },
        {
          get: () => config.text_color || dc.text_color,
          set: (v) => { config.text_color = v; window.elementSdk.setConfig({ text_color: v }); }
        },
        {
          get: () => config.primary_color || dc.primary_color,
          set: (v) => { config.primary_color = v; window.elementSdk.setConfig({ primary_color: v }); }
        },
        {
          get: () => config.accent_color || dc.accent_color,
          set: (v) => { config.accent_color = v; window.elementSdk.setConfig({ accent_color: v }); }
        }
      ],
      borderables: [],
      fontEditable: {
        get: () => config.font_family || dc.font_family,
        set: (v) => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); }
      },
      fontSizeable: {
        get: () => config.font_size || dc.font_size,
        set: (v) => { config.font_size = v; window.elementSdk.setConfig({ font_size: v }); }
      }
    };
  },
  mapToEditPanelValues: function(config) {
    const dc = window.elementSdk.config;
    return new Map([
      ['hero_headline', config.hero_headline || dc.hero_headline],
      ['hero_subheadline', config.hero_subheadline || dc.hero_subheadline],
      ['cta_primary', config.cta_primary || dc.cta_primary],
      ['tagline', config.tagline || dc.tagline],
      ['about_title', config.about_title || dc.about_title],
      ['footer_text', config.footer_text || dc.footer_text]
    ]);
  }
});
