'use client';

import Image from 'next/image';
import { Globe } from 'lucide-react';
import { useLang } from './LangProvider';

type Props = {
  brandTitle: string;
  brandDesc: string;
  children: React.ReactNode;
};

export default function AuthLayout({ brandTitle, brandDesc, children }: Props) {
  const { lang, dir, toggleLang } = useLang();

  return (
    <div className="auth-wrapper" dir={dir} lang={lang}>
      <button className="lang-switcher" type="button" onClick={toggleLang}>
        <Globe size={18} />
        {lang === 'ar' ? 'English' : 'العربية'}
      </button>

      <div className="auth-shell">
        {/* Brand panel */}
        <aside className="brand-panel">
          <div className="logo-slot">
            <Image src="/logo-zimam.png" alt="Zimam" width={140} height={140} priority />
          </div>

          <h2 className="brand-title">{brandTitle}</h2>
          <p className="brand-desc">{brandDesc}</p>
        </aside>

        {/* Form panel */}
        <main className="form-panel">{children}</main>
      </div>

      <style jsx>{`
        .auth-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0f2f5;
          padding: 28px;
          font-family: 'Tajawal', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          color: #0f1a17;
        }

        .lang-switcher {
          position: fixed;
          top: 18px;
          inset-inline-end: 18px;
          z-index: 1000;
          background: #ffffff;
          border: 1px solid #e6e6e6;
          padding: 8px 14px;
          border-radius: 999px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #0f1a17;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
        }

        .auth-shell {
          width: 980px;
          max-width: 100%;
          min-height: 560px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-radius: 34px;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.16);
        }

        .brand-panel {
          background: linear-gradient(135deg, #2f5a45, #1f513e);
          color: #ffffff;
          display: grid;
          align-content: center;
          justify-items: center;
          text-align: center;
          padding: 56px 48px;
          gap: 14px;
        }

        .logo-slot {
          width: 170px;
          height: 170px;
          display: grid;
          place-items: center;
          margin-bottom: 6px;
        }

        .brand-title {
          margin: 0;
          font-size: 28px;
          line-height: 1.35;
        }

        .brand-desc {
          margin: 0;
          font-size: 16px;
          line-height: 1.8;
          opacity: 0.95;
          max-width: 380px;
        }

        .form-panel {
          display: grid;
          align-content: center;
          justify-items: center;
          padding: 56px 48px;
          background: #ffffff;
        }

        @media (max-width: 820px) {
          .auth-shell {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .brand-panel {
            display: none;
          }
          .form-panel {
            padding: 40px 20px;
          }
        }
      `}</style>
    </div>
  );
}
