import type { FormEvent } from 'react';
import { useState } from 'react';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  MapPinned,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { companyProfile } from '../data/restiooData';
import { useRestioo } from '../context/RestiooContext';
import { formatCurrency } from '../utils/format';

const landingFeatures: Array<{ title: string; body: string; Icon: LucideIcon }> = [
  {
    title: 'Bản đồ pod',
    body: 'Xem pod theo địa điểm, trạng thái và khoảng cách mô phỏng.',
    Icon: MapPinned,
  },
  {
    title: 'Booking realtime',
    body: 'Chọn pod trống, thời lượng và cấu hình nghỉ cá nhân.',
    Icon: Sparkles,
  },
  {
    title: 'QR check-in',
    body: 'Nhận QR sau thanh toán và đổi trạng thái pod khi check-in.',
    Icon: ShieldCheck,
  },
  {
    title: 'Quản trị vận hành',
    body: 'Quản trị trạng thái pod, booking, liên hệ B2B và email đăng ký.',
    Icon: Building2,
  },
];

export function LandingPage() {
  const { state, actions } = useRestioo();
  const [email, setEmail] = useState('');
  const [leadSent, setLeadSent] = useState(false);

  function handleNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim()) {
      actions.addNewsletterSignup(email.trim());
      setEmail('');
    }
  }

  function handleLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    actions.addB2BLead({
      companyName: String(form.get('companyName') ?? ''),
      contactName: String(form.get('contactName') ?? ''),
      email: String(form.get('email') ?? ''),
      phone: String(form.get('phone') ?? ''),
      message: String(form.get('message') ?? ''),
    });
    event.currentTarget.reset();
    setLeadSent(true);
  }

  return (
    <div className="site-page">
      <header className="marketing-nav">
        <a className="brand-lockup" href="#top" aria-label="Restioo">
          <img src="/image/logoRestioo.png" alt="Restioo" />
        </a>
        <nav aria-label="Landing">
          <a href="#company">Doanh nghiệp</a>
          <a href="#features">Tính năng</a>
          <a href="#pricing">Bảng giá</a>
          <a href="#locations">Địa điểm</a>
        </nav>
        <Link className="primary-button small" to="/app">
          Mở Web App
        </Link>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-copy">
          <h1>Nghỉ ngơi thông minh, sạc năng lượng trong 30 phút.</h1>
          <p>
            Restioo mang đến pod nghỉ trưa riêng tư, sạch sẽ và tự động hóa cho campus, văn phòng và
            không gian làm việc chung.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" to="/app/bookings/new">
              Đặt chỗ ngay <ArrowRight size={18} />
            </Link>
            <a className="secondary-button" href="#gallery">
              <PlayCircle size={18} /> Xem trải nghiệm
            </a>
          </div>
          <div className="hero-metrics">
            <span>15/30/45/60 phút</span>
            <span>QR check-in</span>
            <span>IoT sẵn sàng</span>
          </div>
        </div>
        <div className="hero-visual">
          <img src="/image/sleepbox2.jpg" alt="Restioo sleep pod" />
          <div className="hero-floating-card">
            <Clock3 size={20} />
            <strong>Pod A1 trống</strong>
            <span>Thanh toán thử nghiệm và nhận QR tức thì</span>
          </div>
        </div>
      </section>

      <section id="company" className="content-band">
        <div className="section-heading">
          <p className="utility-label">Hồ sơ doanh nghiệp</p>
          <h2>{companyProfile.legalName}</h2>
          <p>{companyProfile.shortName}</p>
        </div>
        <div className="company-grid">
          <div className="info-panel">
            <h3>Thông tin pháp lý</h3>
            <dl className="info-list">
              <div>
                <dt>Địa chỉ</dt>
                <dd>{companyProfile.address}</dd>
              </div>
              <div>
                <dt>Mã số doanh nghiệp</dt>
                <dd>{companyProfile.taxCode}</dd>
              </div>
              <div>
                <dt>Số điện thoại</dt>
                <dd>{companyProfile.phone}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{companyProfile.email}</dd>
              </div>
            </dl>
          </div>
          <div className="info-panel dark">
            <h3>Sứ mệnh</h3>
            <p>{companyProfile.mission}</p>
            <h3>Tầm nhìn</h3>
            <p>{companyProfile.vision}</p>
          </div>
        </div>
        <div className="value-row">
          {companyProfile.values.map((value) => (
            <span key={value}>
              <CheckCircle2 size={16} /> {value}
            </span>
          ))}
        </div>
        <div className="founder-grid">
          {companyProfile.founders.map((founder) => (
            <article className="founder-card" key={founder.name}>
              <strong>{founder.name}</strong>
              <span>Thành viên sáng lập</span>
              <p>
                {founder.capital} · {founder.ownership}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="features" className="content-band subtle">
        <div className="section-heading left">
          <p className="utility-label">Web app booking</p>
          <h2>Đặt chỗ, thanh toán và check-in QR trong cùng một luồng.</h2>
        </div>
        <div className="feature-grid">
          {landingFeatures.map(({ title, body, Icon }) => (
            <article className="feature-card" key={title}>
              <Icon size={22} />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" className="content-band">
        <div className="section-heading">
          <p className="utility-label">Bảng giá</p>
          <h2>Gói linh hoạt cho cá nhân và doanh nghiệp.</h2>
        </div>
        <div className="pricing-grid">
          {state.membershipPlans.map((plan) => (
            <article className="pricing-card" key={plan.id}>
              <h3>{plan.name}</h3>
              <strong>{plan.price > 0 ? formatCurrency(plan.price) : 'Theo nhu cầu'}</strong>
              <p>{plan.description}</p>
              <ul>
                {plan.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="locations" className="content-band subtle">
        <div className="section-heading left">
          <p className="utility-label">Địa điểm pilot</p>
          <h2>Triển khai tại campus, văn phòng và coworking.</h2>
        </div>
        <div className="location-strip">
          {state.locations.map((location) => (
            <article key={location.id}>
              <MapPinned size={18} />
              <strong>{location.name}</strong>
              <span>{location.address}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="gallery" className="media-band">
        <img src="/image/BG1.jpg" alt="Không gian Restioo" />
        <img src="/image/sleepbox3.jpg" alt="Pod Restioo" />
        <img src="/image/sleepbox5.jpg" alt="Khoang nghỉ Restioo" />
      </section>

      <section className="content-band contact-band">
        <form className="lead-card" onSubmit={handleLead}>
          <p className="utility-label">B2B Partner</p>
          <h2>Đăng ký hợp tác triển khai pod.</h2>
          <div className="form-grid">
            <input name="companyName" placeholder="Tên công ty" required />
            <input name="contactName" placeholder="Người liên hệ" required />
            <input name="email" placeholder="Email" type="email" required />
            <input name="phone" placeholder="Số điện thoại" required />
          </div>
          <textarea name="message" placeholder="Nhu cầu triển khai" rows={4} />
          <button className="primary-button" type="submit">
            Gửi thông tin B2B
          </button>
          {leadSent ? <span className="form-success">Đã lưu thông tin hợp tác.</span> : null}
        </form>
        <form className="newsletter-card" onSubmit={handleNewsletter}>
          <h2>Nhận cập nhật Restioo</h2>
          <p>Nhận thông tin mới về địa điểm, gói hội viên và lịch triển khai.</p>
          <div className="inline-form">
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Email" />
            <button className="secondary-button" type="submit">
              Đăng ký
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
