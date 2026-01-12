'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  History,
  Settings as SettingsIcon,
  Bell,
  Upload,
  Eye,
  File as FileIcon,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

type Lang = 'en' | 'ar';

type Row = {
  status: 'processed' | 'analyzing';
  name: string;
  risk: 'high' | 'medium' | 'low';
  date: string;
};

export default function DocumentsPage() {
  const [lang, setLang] = useState<Lang>('en');
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [dir, lang]);

  const t = useMemo(() => {
    const dict = {
      en: {
        dashboard: 'Dashboard',
        myDocs: 'My Documents',
        history: 'Compliance History',
        settings: 'Settings',

        breadcrumb2: 'Document Library',
        title: 'Document Library',
        subtitle: 'Manage and analyze your compliance documents',

        uploadNew: 'Upload New',
        english: 'English',
        arabic: 'العربية',

        status: 'Status',
        docName: 'Document Name',
        risk: 'Risk',
        date: 'Date',
        action: 'Action',

        processed: 'Processed',
        analyzing: 'Analyzing',
        high: 'High',
        medium: 'Medium',
        low: 'Low',

        userName: 'Ahmed Al-Fahad',
        userRole: 'Enterprise Admin',
      },
      ar: {
        dashboard: 'لوحة التحكم',
        myDocs: 'مستنداتي',
        history: 'سجل الامتثال',
        settings: 'الإعدادات',

        breadcrumb2: 'مكتبة المستندات',
        title: 'مكتبة المستندات',
        subtitle: 'إدارة وتحليل مستندات الامتثال',

        uploadNew: 'رفع جديد',
        english: 'English',
        arabic: 'العربية',

        status: 'الحالة',
        docName: 'اسم المستند',
        risk: 'المخاطر',
        date: 'التاريخ',
        action: 'الإجراء',

        processed: 'تمت المعالجة',
        analyzing: 'قيد التحليل',
        high: 'عالي',
        medium: 'متوسط',
        low: 'منخفض',

        userName: 'أحمد الفهد',
        userRole: 'مسؤول المؤسسة',
      },
    } as const;

    return dict[lang];
  }, [lang]);

  const rows: Row[] = [
    { status: 'processed', name: 'ZATCA_Rejection_Notice_Jan.pdf', risk: 'high', date: 'Jan 10' },
    { status: 'processed', name: 'Q4_VAT_Return_2025.pdf', risk: 'low', date: 'Jan 8' },
    { status: 'analyzing', name: 'Circular_Update_Phase2.pdf', risk: 'medium', date: 'Jan 5' },
  ];

  const riskLabel = (r: Row['risk']) => (r === 'high' ? t.high : r === 'medium' ? t.medium : t.low);
  const statusLabel = (s: Row['status']) => (s === 'processed' ? t.processed : t.analyzing);

  return (
    <div className="page" data-dir={dir}>
      {/* Sidebar (FIXED) - نفس الداشبورد */}
      <aside className="sidebar">
        <div className="brand">
          <div className="logoWrap">
            <Image src="/logo-zimam.png" alt="Zimam Logo" width={64} height={64} priority />
          </div>

          <nav className="nav">
            <Link className="navItem" href="/">
              <span className="ico" aria-hidden="true">
                <LayoutDashboard size={18} />
              </span>
              <span>{t.dashboard}</span>
            </Link>

            <Link className="navItem active" href="/documents">
              <span className="ico" aria-hidden="true">
                <FileText size={18} />
              </span>
              <span>{t.myDocs}</span>
            </Link>

            <a className="navItem" href="#">
              <span className="ico" aria-hidden="true">
                <History size={18} />
              </span>
              <span>{t.history}</span>
            </a>

            <a className="navItem" href="#">
              <span className="ico" aria-hidden="true">
                <SettingsIcon size={18} />
              </span>
              <span>{t.settings}</span>
            </a>
          </nav>
        </div>

        <div className="user">
          <div className="userAvatar" aria-hidden="true">
            <Image src="/user-avatar.png" alt="" width={44} height={44} />
          </div>
          <div className="userInfo">
            <div className="userName">{t.userName}</div>
            <div className="userRole">{t.userRole}</div>
          </div>
        </div>
      </aside>

      {/* Main - نفس الداشبورد */}
      <main className="main">
        {/* Sticky header - نفس الداشبورد */}
        <header className="top">
          <div className="crumb">
            <span>{t.dashboard}</span>
            <span className="sep">›</span>
            <strong>{t.breadcrumb2}</strong>
          </div>

          <div className="actions">
            <div className="langPill">
              <span className="langLabel">{t.english}</span>
              <button
                className={`switch ${lang === 'ar' ? 'on' : ''}`}
                onClick={() => setLang((p) => (p === 'en' ? 'ar' : 'en'))}
                type="button"
                aria-label="toggle language"
              >
                <span className="knob" />
              </button>
              <span className="langLabel">{t.arabic}</span>
            </div>

            <button className="bell" type="button" aria-label="notifications">
              <Bell size={20} />
              <span className="badge">3</span>
            </button>
          </div>
        </header>

        {/* Scroll only here */}
        <section className="scrollArea">
          <div className="center">
            {/* نفس إحساس المسافة في الداشبورد */}
            <div className="docHeader">
              <div>
                <h1 className="h1">{t.title}</h1>
                <p className="sub">{t.subtitle}</p>
              </div>

              <button className="uploadNew" type="button">
                <Upload size={18} />
                <span>{t.uploadNew}</span>
              </button>
            </div>

            <div className="tableCard">
              <div className="tableHead">
                <div>{t.status}</div>
                <div>{t.docName}</div>
                <div>{t.risk}</div>
                <div>{t.date}</div>
                <div className="actionCol">{t.action}</div>
              </div>

              <div className="tableBody">
                {rows.map((r) => (
                  <div className="tr" key={r.name}>
                    <div>
                      <span className={`pill ${r.status === 'processed' ? 'ok' : 'wait'}`}>
                        {r.status === 'processed' ? (
                          <CheckCircle2 size={15} />
                        ) : (
                          <Loader2 size={15} className="spin" />
                        )}
                        {statusLabel(r.status)}
                      </span>
                    </div>

                    <div className="docName">
                      <span className="fileIco" aria-hidden="true">
                        <FileIcon size={16} />
                      </span>
                      <span className="docText">{r.name}</span>
                    </div>

                    <div>
                      <span
                        className={`riskPill ${
                          r.risk === 'high' ? 'high' : r.risk === 'medium' ? 'med' : 'low'
                        }`}
                      >
                        {riskLabel(r.risk)}
                      </span>
                    </div>

                    <div className="date">{r.date}</div>

                    <div className="actionCol">
                      <button className="eye" type="button" aria-label="view">
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bottomPad" />
          </div>
        </section>
      </main>

      {/* ✅ نفس CSS الخاص بالداشبورد تقريباً (عشان القياس يصير مطابق) */}
      <style jsx global>{`
        :root {
          --sidebarA: #2f5a45;
          --sidebarB: #2a5140;

          --text: #1f2a2b;
          --border: #d7dde2;

          --card: #ffffff;
          --shadow: 0 10px 24px rgba(0, 0, 0, 0.07);
          --radius: 16px;

          --sidebarW: 320px;
          --headerH: 74px;
        }

        * {
          box-sizing: border-box;
        }

        html,
        body {
          height: 100%;
        }

        body {
          margin: 0;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, 'Noto Sans Arabic',
            'Noto Kufi Arabic', 'Tajawal', sans-serif;
          color: var(--text);
          background: #fff;
          overflow-x: hidden;
        }

        .sidebar {
          width: var(--sidebarW);
          background: linear-gradient(180deg, var(--sidebarA), var(--sidebarB));
          color: #eaf5ef;
          padding: 22px 18px;

          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;

          display: flex;
          flex-direction: column;
          justify-content: space-between;

          overflow: hidden;
          z-index: 30;
        }

        .page[data-dir='rtl'] .sidebar {
          left: auto;
          right: 0;
        }

        .logoWrap {
          padding: 6px 6px 2px;
        }

        .nav {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 10px 6px;
        }

        .navItem {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 14px;
          border-radius: 14px;
          color: rgba(234, 245, 239, 0.88);
          text-decoration: none;
          transition: background 0.15s ease, color 0.15s ease;
          font-size: 14.5px;
          min-height: 48px;
        }

        .navItem:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
        }

        .navItem.active {
          background: rgba(255, 255, 255, 0.14);
          color: #ffffff;
        }

        .ico {
          width: 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          opacity: 0.95;
        }

        .user {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 8px 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.12);
          margin-top: 8px;
        }

        .userAvatar {
          width: 46px;
          height: 46px;
          border-radius: 999px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.16);
        }

        .userInfo {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .userName {
          font-weight: 700;
          font-size: 14px;
        }

        .userRole {
          font-size: 12px;
          opacity: 0.78;
        }

        .main {
          margin-left: var(--sidebarW);
          min-height: 100vh;

          background-color: #ffffff;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260' viewBox='0 0 260 260'%3E%3Crect width='260' height='260' fill='%23ffffff'/%3E%3Cg opacity='0.7' fill='none' stroke='%23E8EDF1' stroke-width='2'%3E%3Cpath d='M65 20 L98 39 L98 77 L65 96 L32 77 L32 39 Z'/%3E%3Cpath d='M195 20 L228 39 L228 77 L195 96 L162 77 L162 39 Z'/%3E%3Cpath d='M130 102 L163 121 L163 159 L130 178 L97 159 L97 121 Z'/%3E%3Cpath d='M65 184 L98 203 L98 241 L65 260 L32 241 L32 203 Z'/%3E%3Cpath d='M195 184 L228 203 L228 241 L195 260 L162 241 L162 203 Z'/%3E%3C/g%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 260px 260px;

          display: flex;
          flex-direction: column;
        }

        .page[data-dir='rtl'] .main {
          margin-left: 0;
          margin-right: var(--sidebarW);
        }

        .top {
          height: var(--headerH);
          padding: 12px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;

          position: sticky;
          top: 0;
          z-index: 25;

          background: rgba(255, 255, 255, 0.55);
          backdrop-filter: blur(8px);
        }

        .crumb {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #506060;
          min-width: 220px;
        }

        .crumb strong {
          color: #2a3a3b;
          font-weight: 700;
        }

        .sep {
          opacity: 0.6;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 0 0 auto;
        }

        .page[data-dir='rtl'] .actions {
          flex-direction: row-reverse;
        }

        .langPill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.86);
          border: 1px solid rgba(215, 221, 226, 0.95);
          border-radius: 999px;
          padding: 6px 12px;
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.06);
          white-space: nowrap;
        }

        .langLabel {
          font-size: 13px;
          color: #2a3a3b;
        }

        .switch {
          width: 46px;
          height: 24px;
          border-radius: 999px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: #dfe6e9;
          padding: 2px;
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .knob {
          width: 20px;
          height: 20px;
          border-radius: 999px;
          background: #ffffff;
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
          transform: translateX(0);
          transition: transform 0.2s ease;
        }

        .switch.on {
          background: #cfeedd;
        }

        .switch.on .knob {
          transform: translateX(22px);
        }

        .page[data-dir='rtl'] .switch.on .knob {
          transform: translateX(-22px);
        }

        .bell {
          width: 42px;
          height: 42px;
          border-radius: 999px;
          border: 1px solid rgba(215, 221, 226, 0.95);
          background: rgba(255, 255, 255, 0.9);
          display: grid;
          place-items: center;
          cursor: pointer;
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.06);
          position: relative;
          color: #1f2a2b;
        }

        .badge {
          position: absolute;
          top: 5px;
          right: 6px;
          width: 18px;
          height: 18px;
          border-radius: 999px;
          background: #e54a4a;
          color: #fff;
          font-size: 11px;
          display: grid;
          place-items: center;
          font-weight: 700;
          border: 2px solid rgba(255, 255, 255, 0.95);
          line-height: 1;
        }

        .page[data-dir='rtl'] .badge {
          right: auto;
          left: 6px;
        }

        /* ✅ نفس الداشبورد: scrollArea padding */
        .scrollArea {
          height: calc(100vh - var(--headerH));
          overflow-y: auto;
          padding: 14px 22px 22px;
        }

        /* ✅ نفس الداشبورد: center width */
        .center {
          width: min(980px, 100%);
          margin: 0 auto;
        }

        /* ---- Documents specific (لكن بدون ما يغير القياس العام) ---- */
        .docHeader {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 14px;
          margin: 10px 0 18px;
        }

        .h1 {
          margin: 0;
          font-size: 28px;
          letter-spacing: -0.3px;
        }

        .sub {
          margin: 6px 0 0;
          color: #6a7a7a;
          font-size: 14px;
        }

        .uploadNew {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid rgba(20, 60, 40, 0.25);
          background: #1f513e;
          color: #fff;
          cursor: pointer;
          box-shadow: 0 10px 18px rgba(0, 0, 0, 0.08);
          white-space: nowrap;
        }

        .tableCard {
          background: rgba(255, 255, 255, 0.82);
          border: 1px solid rgba(215, 221, 226, 0.98);
          border-radius: 18px;
          box-shadow: var(--shadow);
          overflow: hidden;
        }

        .tableHead {
          display: grid;
          grid-template-columns: 220px 1fr 140px 120px 90px;
          gap: 12px;
          padding: 14px 18px;
          background: rgba(255, 255, 255, 0.35);
          border-bottom: 1px solid rgba(215, 221, 226, 0.98);
          font-weight: 800;
          color: #2a3a3b;
          font-size: 14px;
        }

        .tableBody .tr {
          display: grid;
          grid-template-columns: 220px 1fr 140px 120px 90px;
          gap: 12px;
          padding: 14px 18px;
          align-items: center;
          border-bottom: 1px solid rgba(215, 221, 226, 0.75);
          background: rgba(255, 255, 255, 0.62);
        }

        .tableBody .tr:last-child {
          border-bottom: none;
        }

        .pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          font-weight: 800;
          font-size: 13px;
          border: 1px solid;
          width: fit-content;
        }

        .pill.ok {
          color: #2f7a4b;
          background: rgba(130, 230, 170, 0.18);
          border-color: rgba(47, 122, 75, 0.22);
        }

        .pill.wait {
          color: #b87400;
          background: rgba(255, 195, 90, 0.18);
          border-color: rgba(184, 116, 0, 0.22);
        }

        .spin {
          animation: spin 1.1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .docName {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .fileIco {
          width: 28px;
          height: 28px;
          border-radius: 10px;
          background: rgba(240, 244, 246, 0.9);
          border: 1px solid rgba(215, 221, 226, 0.95);
          display: grid;
          place-items: center;
          color: #5e6d6d;
          flex: 0 0 auto;
        }

        .docText {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #2a3a3b;
          font-weight: 600;
        }

        .riskPill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 12px;
          border-radius: 999px;
          font-weight: 900;
          font-size: 13px;
          border: 1px solid;
          width: fit-content;
        }

        .riskPill.high {
          color: #b33838;
          background: rgba(255, 138, 138, 0.14);
          border-color: rgba(179, 56, 56, 0.3);
        }

        .riskPill.med {
          color: #c07a00;
          background: rgba(255, 183, 77, 0.14);
          border-color: rgba(192, 122, 0, 0.32);
        }

        .riskPill.low {
          color: #2f7a4b;
          background: rgba(130, 230, 170, 0.18);
          border-color: rgba(47, 122, 75, 0.22);
        }

        .date {
          color: #6a7a7a;
          font-weight: 600;
        }

        .actionCol {
          display: flex;
          justify-content: flex-end;
        }

        .eye {
          width: 38px;
          height: 38px;
          border-radius: 999px;
          border: 1px solid rgba(215, 221, 226, 0.98);
          background: rgba(255, 255, 255, 0.9);
          cursor: pointer;
          display: grid;
          place-items: center;
          color: #2f5a45;
        }

        .bottomPad {
          height: 18px;
        }

        @media (max-width: 900px) {
          .sidebar {
            position: static;
            width: 100%;
            height: auto;
          }
          .main {
            margin-left: 0;
            margin-right: 0;
          }
          .scrollArea {
            height: auto;
            overflow: visible;
            padding: 14px;
          }
          .user {
            display: none;
          }
          .tableHead,
          .tableBody .tr {
            grid-template-columns: 180px 1fr 120px 90px 60px;
          }
        }
      `}</style>
    </div>
  );
}
