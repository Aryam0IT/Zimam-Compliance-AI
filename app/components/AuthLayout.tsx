'use client';

import React from 'react';
import Image from 'next/image';
import { Globe } from 'lucide-react';
import { useLang } from './LangProvider';

export default function AuthLayout({
  children,
  brandTitle,
  brandDesc,
}: {
  children: React.ReactNode;
  brandTitle: string;
  brandDesc: string;
}) {
  const { lang, dir, toggleLang } = useLang();

  return (
    <div className="wrap" dir={dir}>
      <button className="langBtn" type="button" onClick={toggleLang}>
        <Globe size={18} />
        {lang === 'ar' ? 'English' : 'العربية'}
      </button>

      <div className="card">
        <div className="left">{children}</div>

        <div className="right">
          <div className="logo">
            <Image src="/logo-zimam.png" alt="Zimam" width={160} height={160} priority />
          </div>
          <h2 className="brandTitle">{brandTitle}</h2>
          <p className="brandDesc">{brandDesc}</p>
        </div>
      </div>

      <style jsx>{`
        .wrap {
          min-height: 100vh;
          background: #eef2f5;
          display: grid;
          place-items: center;
          padding: 22px;
          font-family: 'Tajawal', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          color: #1f2a2b;
        }
        .langBtn {
          position: fixed;
          top: 18px;
          inset-inline-start: 18px;
          z-index: 20;
          background: #fff;
          border: 1px solid #e6e6e6;
          padding: 8px 14px;
          border-radius: 999px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #1f2a2b;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
        }
        .card {
          width: min(1100px, 96vw);
          height: min(620px, 86vh);
          background: #fff;
          border-radius: 36px;
          overflow: hidden;
          box-shadow: 0 24px 55px rgba(0, 0, 0, 0.14);
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .left {
          display: grid;
          place-items: center;
          padding: 48px;
          background: #fff;
        }
        .right {
          background: linear-gradient(135deg, #2f5a45, #1f513e);
          display: grid;
          place-items: center;
          padding: 48px;
          text-align: center;
          color: #fff;
        }
        .logo {
          width: 180px;
          height: 180px;
          display: grid;
          place-items: center;
          margin-bottom: 10px;
        }
        .brandTitle {
          margin: 0;
          font-size: 34px;
          line-height: 1.25;
        }
        .brandDesc {
          margin: 10px 0 0;
          opacity: 0.95;
          line-height: 1.7;
          max-width: 420px;
          font-size: 15px;
        }
        @media (max-width: 900px) {
          .card {
            grid-template-columns: 1fr;
            height: auto;
          }
          .right {
            display: none;
          }
          .left {
            padding: 26px;
          }
        }
      `}</style>
    </div>
  );
}
