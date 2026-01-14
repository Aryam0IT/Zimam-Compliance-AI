'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import { useLang } from '../components/LangProvider';

export default function LoginPage() {
  const { lang, dir } = useLang();

  const t = useMemo(
    () => ({
      ar: {
        title: 'تسجيل الدخول',
        email: 'البريد الإلكتروني',
        pass: 'كلمة المرور',
        forgot: 'نسيت كلمة المرور؟',
        btn: 'دخول',
        switchQ: 'ما عندك حساب؟',
        switchA: 'إنشاء حساب',
        brandTitle: 'أمسك بزِمام امتثالك..',
        brandDesc: 'ذكاء يضبط أرقامك، ويقودك للقمة بثقة.',
      },
      en: {
        title: 'Sign In',
        email: 'Email Address',
        pass: 'Password',
        forgot: 'Forgot Password?',
        btn: 'Login',
        switchQ: "Don't have an account?",
        switchA: 'Create Account',
        brandTitle: 'Take the Reins',
        brandDesc: 'Intelligence that tunes your numbers.',
      },
    }),
    []
  )[lang];

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('LOGIN ✅');
  }

  return (
    <AuthLayout brandTitle={t.brandTitle} brandDesc={t.brandDesc}>
      <form className="form" onSubmit={onSubmit} dir={dir}>
        <h1 className="title">{t.title}</h1>

        <div className="input">
          <Mail size={18} />
          <input type="email" placeholder={t.email} dir="ltr" required />
        </div>

        <div className="input">
          <Lock size={18} />
          <input type="password" placeholder={t.pass} required />
        </div>

        <button type="button" className="forgot" onClick={() => console.log('FORGOT ✅')}>
          {t.forgot}
        </button>

        <button className="btn" type="submit">
          {t.btn}
        </button>

        <p className="switch">
          {t.switchQ}{' '}
          <Link className="link" href="/signup">
            {t.switchA}
          </Link>
        </p>

        <style jsx>{`
          .form {
            width: 100%;
            max-width: 420px;
            color: #0f1a17;
          }

          .title {
            text-align: center;
            margin: 0 0 22px;
            font-size: 22px;
            color: #0f1a17;
          }

          .input {
            height: 54px;
            display: flex;
            align-items: center;
            gap: 12px;
            background: #f4f7f6;
            border: 1px solid transparent;
            border-radius: 16px;
            padding: 0 16px;
            margin-bottom: 12px;
          }

          .input :global(svg) {
            color: #6f7f7a;
          }

          input {
            width: 100%;
            border: 0;
            outline: 0;
            background: transparent;
            font-size: 14px;
            color: #0f1a17;
            text-align: start;
          }

          input::placeholder {
            color: #9aa6a1;
            opacity: 1;
          }

          .input:focus-within {
            border-color: rgba(31, 81, 62, 0.38);
            box-shadow: 0 0 0 4px rgba(31, 81, 62, 0.12);
          }

          .forgot {
            display: block;
            margin: 6px 0 16px;
            background: transparent;
            border: 0;
            padding: 0;
            cursor: pointer;
            color: #6f7f7a;
            font-size: 13px;
            text-align: end;
            width: 100%;
          }

          [dir='rtl'] .forgot {
            text-align: start;
          }

          .forgot:hover {
            color: #1f513e;
            text-decoration: underline;
          }

          .btn {
            width: 100%;
            height: 50px;
            border-radius: 999px;
            border: 0;
            background: #1f513e;
            color: #fff;
            font-weight: 800;
            cursor: pointer;
          }

          .switch {
            margin: 18px 0 0;
            text-align: center;
            color: #6f7f7a;
            font-size: 14px;
          }

          .link {
            color: #1f513e;
            font-weight: 800;
            text-decoration: none;
          }

          .link:hover {
            text-decoration: underline;
          }
        `}</style>
      </form>
    </AuthLayout>
  );
}
