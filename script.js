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
      <button class="modal-close-btn" type="button">Đóng</button>
      ${onConfirm ? '<button class="modal-confirm-btn" type="button">Xác nhận</button>' : ''}
    </div>
  `;
  
  overlay.appendChild(dialog);
  const closeModal = () => {
    overlay.remove();
    document.body.style.overflow = 'auto';
  };
  overlay.onclick = (e) => e.target === overlay && closeModal();
  dialog.querySelector('.modal-close-btn').addEventListener('click', closeModal);
  const confirmButton = dialog.querySelector('.modal-confirm-btn');
  if (confirmButton) {
    confirmButton.addEventListener('click', () => {
      if (typeof onConfirm === 'function') onConfirm();
      closeModal();
    });
  }
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  
  // Close on Escape key
  const closeOnEscape = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', closeOnEscape);
    }
  };
  document.addEventListener('keydown', closeOnEscape);
  
}

const mockupSuccessAuditText = 'Thong tin se duoc gui ve phia Restioo';

function normalizeActionText(text = '') {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function createMockupOverlay(content, options = {}) {
  const overlay = document.createElement('div');
  overlay.className = `mockup-overlay ${options.className || ''}`.trim();
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', options.label || 'Restioo mockup');

  overlay.innerHTML = `
    <div class="mockup-dialog ${options.dialogClass || ''}" role="document">
      <button class="mockup-close" type="button" aria-label="Đóng">
        <i data-lucide="x"></i>
      </button>
      ${content}
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const closeOverlay = () => {
    overlay.remove();
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', closeOnEscape);
  };

  const closeOnEscape = (event) => {
    if (event.key === 'Escape') closeOverlay();
  };

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeOverlay();
  });
  overlay.querySelector('.mockup-close').addEventListener('click', closeOverlay);
  document.addEventListener('keydown', closeOnEscape);

  overlay.querySelectorAll('form[data-mockup-form]').forEach((form) => {
    form.addEventListener('submit', handleMockupSubmit);
  });

  if (window.lucide) window.lucide.createIcons();
  requestAnimationFrame(() => overlay.classList.add('mockup-ready'));

  return { overlay, close: closeOverlay };
}

function handleMockupSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton ? submitButton.textContent : '';
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = 'Đang gửi...';
  }

  setTimeout(() => {
    const dialog = form.closest('.mockup-dialog');
    const data = Array.from(new FormData(form).entries())
      .filter(([, value]) => String(value).trim())
      .slice(0, 5);
    const summary = data.map(([key, value]) => `
      <div>
        <span>${escapeHtml(key)}</span>
        <strong>${escapeHtml(value)}</strong>
      </div>
    `).join('');
    const successTitle = form.dataset.successTitle || 'Đã nhận thông tin';
    const successMessage = form.dataset.successMessage || 'Thông tin sẽ được gửi về phía Restioo. Đội ngũ sẽ phản hồi sau khi rà soát.';

    dialog.querySelector('.mockup-body').innerHTML = `
      <div class="mockup-success" data-audit="${mockupSuccessAuditText}">
        <div class="mockup-success-icon"><i data-lucide="check"></i></div>
        <h3>${successTitle}</h3>
        <p>${successMessage}</p>
        ${summary ? `<div class="mockup-success-summary">${summary}</div>` : ''}
        <button class="modal-confirm-btn" type="button">Hoàn tất</button>
      </div>
    `;

    const doneButton = dialog.querySelector('.mockup-success button');
    doneButton.addEventListener('click', () => dialog.closest('.mockup-overlay').querySelector('.mockup-close').click());
    showToast('Thông tin đã được ghi nhận trong mockup local.', 'success');
    if (window.lucide) window.lucide.createIcons();
  }, 650);

  setTimeout(() => {
    if (submitButton && document.body.contains(submitButton)) {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }, 900);
}

function openB2BMockup() {
  createMockupOverlay(`
    <div class="mockup-body">
      <div class="mockup-grid">
        <aside class="mockup-visual-panel">
          <span class="mockup-kicker">Restioo B2B</span>
          <h2>Đăng ký hợp tác triển khai pod</h2>
          <p>Mockup này mô phỏng luồng tiếp nhận lead B2B: chủ tòa nhà, co-working, trường học hoặc doanh nghiệp gửi nhu cầu về phía Restioo.</p>
          <div class="mockup-note">
            <i data-lucide="building-2"></i>
            <span>Thông tin sau khi gửi sẽ được ghi nhận dạng demo trên giao diện local.</span>
          </div>
        </aside>
        <form class="mockup-form" data-mockup-form data-success-title="Đã ghi nhận đề xuất hợp tác" data-success-message="Thông tin sẽ được gửi về phía Restioo. Nhóm B2B sẽ phản hồi trong 24 giờ làm việc.">
          <label>Tên công ty / đơn vị
            <input name="Tên công ty" required placeholder="VD: Công ty ABC" autocomplete="organization">
          </label>
          <label>Người liên hệ
            <input name="Người liên hệ" required placeholder="Họ và tên" autocomplete="name">
          </label>
          <div class="mockup-form-row">
            <label>Số điện thoại
              <input name="Số điện thoại" required placeholder="09..." autocomplete="tel">
            </label>
            <label>Email
              <input name="Email" type="email" required placeholder="name@company.vn" autocomplete="email">
            </label>
          </div>
          <label>Loại địa điểm
            <select name="Loại địa điểm" required>
              <option value="">Chọn loại địa điểm</option>
              <option>Tòa nhà văn phòng</option>
              <option>Co-working space</option>
              <option>Trường đại học</option>
              <option>Doanh nghiệp nội bộ</option>
            </select>
          </label>
          <label>Nhu cầu triển khai
            <textarea name="Nhu cầu" rows="3" placeholder="Số lượng pod, vị trí, thời gian dự kiến..."></textarea>
          </label>
          <button class="btn-primary" type="submit">Gửi thông tin hợp tác</button>
        </form>
      </div>
    </div>
  `, { label: 'Đăng ký hợp tác B2B' });
}

function openNewsletterMockup() {
  createMockupOverlay(`
    <div class="mockup-body">
      <div class="mockup-newsletter">
        <div>
          <span class="mockup-kicker">Early Access</span>
          <h2>Nhận thông tin ra mắt Restioo</h2>
          <p>Đăng ký để nhận cập nhật về địa điểm mới, ưu đãi early adopters và lịch mở trải nghiệm.</p>
        </div>
        <form class="mockup-form mockup-form-inline" data-mockup-form data-success-title="Đã đăng ký nhận thông tin" data-success-message="Thông tin sẽ được gửi về phía Restioo. Khi có đợt trải nghiệm mới, Restioo sẽ gửi thông báo đến email của bạn.">
          <label>Email
            <input name="Email" type="email" required placeholder="email@example.com" autocomplete="email">
          </label>
          <label>Nhóm quan tâm
            <select name="Nhóm quan tâm" required>
              <option>Người dùng cá nhân</option>
              <option>Đối tác địa điểm</option>
              <option>Truyền thông</option>
            </select>
          </label>
          <button class="btn-primary" type="submit">Đăng ký nhận tin</button>
        </form>
      </div>
    </div>
  `, { label: 'Đăng ký nhận thông tin sớm', dialogClass: 'mockup-dialog-narrow' });
}

function openBookingMockup() {
  createMockupOverlay(`
    <div class="mockup-body">
      <div class="mockup-grid booking-mockup">
        <aside class="mock-phone" aria-label="Màn hình đặt chỗ mockup">
          <div class="mock-phone-top">
            <span>9:41</span>
            <strong>Restioo</strong>
          </div>
          <div class="mock-pod-card">
            <div>
              <span>Pod A2</span>
              <h3>PTIT Hà Đông</h3>
            </div>
            <span class="mock-status"><i class="mock-status-dot"></i>Đang trống</span>
          </div>
          <div class="mock-time-grid">
            <button type="button">15'</button>
            <button type="button" class="active">30'</button>
            <button type="button">45'</button>
            <button type="button">60'</button>
          </div>
          <div class="mock-qr">
            <span></span><span></span><span></span><span></span>
          </div>
        </aside>
        <form class="mockup-form" data-mockup-form data-success-title="Đặt chỗ mockup thành công" data-success-message="Thông tin sẽ được gửi về phía Restioo. Mã QR check-in demo đã được tạo trong mockup local.">
          <span class="mockup-kicker">Booking Flow</span>
          <h2>Đặt chỗ nghỉ nhanh</h2>
          <label>Địa điểm
            <select name="Địa điểm" required>
              <option>PTIT Hà Đông - Pod A2</option>
              <option>Tòa nhà văn phòng - Pod B1</option>
              <option>Co-working Hub - Pod C3</option>
            </select>
          </label>
          <div class="mockup-form-row">
            <label>Thời lượng
              <select name="Thời lượng" required>
                <option>15 phút</option>
                <option selected>30 phút</option>
                <option>45 phút</option>
                <option>60 phút</option>
              </select>
            </label>
            <label>Giờ bắt đầu
              <input name="Giờ bắt đầu" type="time" required value="12:30">
            </label>
          </div>
          <div class="mockup-form-row">
            <label>Nhiệt độ
              <select name="Nhiệt độ">
                <option>22°C</option>
                <option>24°C</option>
                <option>26°C</option>
              </select>
            </label>
            <label>Âm thanh
              <select name="Âm thanh">
                <option>Yên tĩnh</option>
                <option>White noise</option>
                <option>Rain focus</option>
              </select>
            </label>
          </div>
          <div class="mockup-note">
            <i data-lucide="wallet-cards"></i>
            <span>Thanh toán đang là mockup. Khi triển khai thật có thể nối MoMo, ZaloPay hoặc thẻ.</span>
          </div>
          <button class="btn-primary" type="submit">Thanh toán mock & nhận QR</button>
        </form>
      </div>
    </div>
  `, { label: 'Đặt chỗ Restioo' });
}

function openAppWaitlistMockup() {
  openNewsletterMockup();
}

function openServiceJourney() {
  const { overlay } = createMockupOverlay(`
    <div class="journey-stage">
      <div class="pod-corridor" aria-hidden="true">
        <div class="corridor-wall corridor-left"></div>
        <div class="corridor-wall corridor-right"></div>
        <div class="corridor-floor"></div>
        <div class="corridor-light light-one"></div>
        <div class="corridor-light light-two"></div>
        <div class="corridor-pod-door">
          <span></span>
          <strong>Restioo Pod</strong>
        </div>
        <div class="corridor-hud hud-one"><i data-lucide="wind"></i> HEPA Air</div>
        <div class="corridor-hud hud-two"><i data-lucide="thermometer"></i> 22°C</div>
        <div class="corridor-hud hud-three"><i data-lucide="moon"></i> Quiet mode</div>
      </div>
      <div class="journey-copy">
        <span class="mockup-kicker">Khám phá dịch vụ</span>
        <h2>Đi qua hành trình nghỉ 30 phút</h2>
        <p>Góc nhìn mô phỏng đưa người xem từ khu vực văn phòng vào pod, sau đó hiện các lớp thông tin chính của dịch vụ.</p>
        <div class="journey-actions">
          <button class="btn-primary" type="button" data-journey-reveal>Xem thông tin dịch vụ</button>
          <button class="btn-ghost" type="button" data-journey-book>Thử đặt chỗ</button>
        </div>
      </div>
      <section class="journey-info" tabindex="-1">
        <h3>Dịch vụ Restioo gồm những gì?</h3>
        <div class="journey-service-grid">
          <article>
            <i data-lucide="scan-qr-code"></i>
            <strong>Đặt chỗ và QR check-in</strong>
            <span>Người dùng chọn pod, thời lượng, thanh toán và nhận mã vào khoang.</span>
          </article>
          <article>
            <i data-lucide="sliders-horizontal"></i>
            <strong>Cá nhân hóa môi trường</strong>
            <span>Lưu cấu hình nhiệt độ, ánh sáng, âm thanh và chế độ yên tĩnh.</span>
          </article>
          <article>
            <i data-lucide="activity"></i>
            <strong>Quản lý trạng thái pod</strong>
            <span>Pod có trạng thái trống, đang dùng, bảo trì hoặc vệ sinh theo thời gian thực.</span>
          </article>
        </div>
      </section>
    </div>
  `, {
    className: 'service-journey-overlay mockup-overlay-wide',
    dialogClass: 'service-journey-dialog',
    label: 'Hành trình khám phá dịch vụ Restioo'
  });

  const stage = overlay.querySelector('.journey-stage');
  const info = overlay.querySelector('.journey-info');
  const revealInfo = () => {
    stage.classList.add('show-info');
    setTimeout(() => info.focus({ preventScroll: true }), 250);
  };

  requestAnimationFrame(() => stage.classList.add('is-moving'));
  setTimeout(() => {
    if (document.body.contains(overlay)) revealInfo();
  }, 1500);

  overlay.querySelector('[data-journey-reveal]').addEventListener('click', revealInfo);
  overlay.querySelector('[data-journey-book]').addEventListener('click', () => {
    overlay.querySelector('.mockup-close').click();
    openBookingMockup();
  });
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
    if (btn.hasAttribute('onclick')) return;
    
    btn.addEventListener('click', function(e) {
      const text = this.textContent.trim();
      const actionText = normalizeActionText(text);
      const originalHtml = this.innerHTML;
      this.classList.add('btn-loading');
      this.disabled = true;
      
      setTimeout(() => {
        this.classList.remove('btn-loading');
        this.disabled = false;
        this.innerHTML = originalHtml;
        if (window.lucide) window.lucide.createIcons();
      }, 450);

      if (actionText.includes('kham pha')) {
        openServiceJourney();
        return;
      }
      if (actionText.includes('xem review')) {
        openVideoModal();
        return;
      }
      if (actionText.includes('dat cho')) {
        openBookingMockup();
        return;
      }
      if (actionText.includes('tai app')) {
        openAppWaitlistMockup();
        return;
      }
      if (actionText.includes('b2b') || actionText.includes('hop tac')) {
        openB2BMockup();
        return;
      }
      if (actionText.includes('dang ky nhan thong tin') || actionText.includes('dang ky thong bao') || actionText.includes('newsletter') || actionText.includes('dang ky')) {
        openNewsletterMockup();
        return;
      }
      if (actionText.includes('lien lac') || actionText.includes('lien he')) {
        showToast('Email được sao chép: info@restioo.vn', 'success');
        if (navigator.clipboard) {
          navigator.clipboard.writeText('info@restioo.vn').catch(() => {});
        }
        return;
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
