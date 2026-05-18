import type { FormEvent } from 'react';
import { useState } from 'react';
import { Settings2, UserRound } from 'lucide-react';
import { useRestioo } from '../context/RestiooContext';
import type { BookingPreferences } from '../domain/restiooDomain';

export function ProfilePage() {
  const { state, actions } = useRestioo();
  const user = state.currentUser;
  const [displayName, setDisplayName] = useState(user?.displayName ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [preferences, setPreferences] = useState<BookingPreferences>(
    user?.defaultPreferences ?? { temperature: 24, light: 'dim', sound: 'rain' },
  );
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    actions.saveProfile({ displayName, phone, defaultPreferences: preferences });
    setSaved(true);
  }

  return (
    <form className="page-stack" onSubmit={handleSubmit}>
      <section className="page-heading-row">
        <div>
          <p className="utility-label">Profile</p>
          <h2>Thông tin cá nhân và cấu hình pod mặc định.</h2>
        </div>
        <button className="primary-button" type="submit">
          Lưu hồ sơ
        </button>
      </section>

      <section className="two-column">
        <div className="panel">
          <h3>
            <UserRound size={20} /> Hồ sơ
          </h3>
          <div className="form-grid one">
            <label>
              Họ tên
              <input value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
            </label>
            <label>
              Email
              <input value={user?.email ?? ''} disabled />
            </label>
            <label>
              Số điện thoại
              <input value={phone} onChange={(event) => setPhone(event.target.value)} />
            </label>
          </div>
        </div>

        <div className="panel">
          <h3>
            <Settings2 size={20} /> Cài đặt nghỉ
          </h3>
          <div className="form-grid one">
            <label>
              Nhiệt độ mặc định
              <input
                type="number"
                min="20"
                max="28"
                value={preferences.temperature}
                onChange={(event) =>
                  setPreferences((current) => ({ ...current, temperature: Number(event.target.value) }))
                }
              />
            </label>
            <label>
              Ánh sáng
              <select
                value={preferences.light}
                onChange={(event) =>
                  setPreferences((current) => ({
                    ...current,
                    light: event.target.value as BookingPreferences['light'],
                  }))
                }
              >
                <option value="soft">Soft</option>
                <option value="dim">Dim</option>
                <option value="focus">Focus</option>
              </select>
            </label>
            <label>
              Âm thanh
              <select
                value={preferences.sound}
                onChange={(event) =>
                  setPreferences((current) => ({
                    ...current,
                    sound: event.target.value as BookingPreferences['sound'],
                  }))
                }
              >
                <option value="rain">Rain</option>
                <option value="deep-focus">Deep focus</option>
                <option value="silent">Silent</option>
              </select>
            </label>
          </div>
          {saved ? <span className="form-success">Đã lưu hồ sơ.</span> : null}
        </div>
      </section>
    </form>
  );
}
