'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import { useLang } from '../components/LangProvider';

export default function LoginPage() {
  const router = useRouter();
  const { lang, dir, withLang } = useLang();

  const t = useMemo(() => {
    return lang === 'ar'
      ? {
          title: 'تسجيل الدخول',
          email: 'البريد الإلكتروني',
          password: 'كلمة المرور',
          login: 'دخول',
          forgot: 'نسيت كلمة المرور؟',
          noAcc: 'ما عندك حساب؟',
          create: 'إنشاء حساب',
          brandTitle: 'أمسك بزِمام امتثالك..',
          brandDesc: 'ذكاء يضبط أرقامك، ويقودك للقمة بثقة.',
        }
      : {
          title: 'Sign In',
          email: 'Email Address',
          password: 'Password',
          login: 'Login',
          forgot: 'Forgot Password?',
          noAcc: "Don't have an account?",
          create: 'Create Account',
          brandTitle: 'Take the Reins',
          brandDesc: 'Intelligence that tunes your numbers.',
        };
  }, [lang]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert('LOGIN ✅ (Demo)');
    // router.push(withLang('/documents'));
  }

  return (
    <AuthLayout brandTitle={t.brandTitle} brandDesc={t.brandDesc}>
      <form onSubmit={onSubmit} className="form" dir={dir}>
        <h1 className="title">{t.title}</h1>

        <div className="inputRow">
          <Mail size={18} />
          <input type="email" placeholder={t.email} required dir="ltr" />
        </div>

        <div className="inputRow">
          <Lock size={18} />
          <input type="password" placeholder={t.password} required />
        </div>

        <div className="meta">
          <button type="button" className="link" onClick={() => router.push(withLang('/forgot-password'))}>
            {t.forgot}
          </button>
        </div>

        <button className="primary" type="submit">
          {t.login}
        </button>

        <div className="bottom">
          <span className="muted">{t.noAcc} </span>
          <button type="button" className="link strong" onClick={() => router.push(withLang('/signup'))}>
            {t.create}
          </button>
        </div>

        <style jsx>{`
          .form { width: 100%; max-width: 420px; text-align: center; }
          .title { margin: 0 0 18px; font-size: 22px; color: #1f2a2b; }
          .inputRow { background:#f4f7f6; border:1px solid transparent; border-radius:16px; padding:12px 14px; display:flex; align-items:center; gap:12px; margin:10px 0; }
          .inputRow :global(svg) { color:#6f7f7a; }
          .inputRow:focus-within { border-color: rgba(31,81,62,.38); box-shadow:0 0 0 4px rgba(31,81,62,.12); }
          input { width:100%; border:none; outline:none; background:transparent; color:#1f2a2b; font-size:14px; text-align:start; }
          .meta { display:flex; justify-content:flex-end; margin:6px 0 10px; }
          [dir='rtl'] .meta { justify-content:flex-start; }
          .link { background:transparent; border:none; cursor:pointer; color:#6f7f7a; font-size:13px; padding:6px 4px; }
          .link:hover { color:#1f513e; text-decoration:underline; }
          .primary { width:100%; background:#1f513e; color:#fff; border:none; border-radius:999px; padding:12px 18px; font-weight:800; cursor:pointer; margin-top:8px; }
          .bottom { margin-top:14px; font-size:13px; }
          .muted { color:#6f7f7a; }
          .strong { font-weight:800; }
        `}</style>
      </form>
    </AuthLayout>
  );
}
