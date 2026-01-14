'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Mail, Lock, User } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import { useLang } from '../components/LangProvider';

export default function SignupPage() {
  const { lang, dir } = useLang();

  const t = useMemo(
    () => ({
      ar: {
        title: 'إنشاء حساب',
        name: 'اسم المنشأة / المحاسب',
        email: 'البريد الإلكتروني',
        pass: 'كلمة المرور',
        confirm: 'تأكيد كلمة المرور',
        btn: 'تسجيل',
        switchQ: 'عندك حساب؟',
        switchA: 'تسجيل الدخول',
        brandTitle: 'زِمام.. ركيزتك للضبط المالي',
        brandDesc: 'وأمانك من عثرات الامتثال.',
      },
      en: {
        title: 'Create Account',
        name: 'Entity Name',
        email: 'Email Address',
        pass: 'Password',
        confirm: 'Confirm Password',
        btn: 'Register',
        switchQ: 'Already have an account?',
        switchA: 'Sign In',
        brandTitle: 'Zimam.. Your Pillar',
        brandDesc: 'Safety from compliance pitfalls.',
      },
    }),
    []
  )[lang];

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('SIGNUP ✅');
  }

  return (
    <AuthLayout brandTitle={t.brandTitle} brandDesc={t.brandDesc}>
      <form className="form" onSubmit={onSubmit} dir={dir}>
        <h1 className="title">{t.title}</h1>

        <div className="input">
          <User size={18} />
          <input type="text" placeholder={t.name} required />
        </div>

        <div className="input">
          <Mail size={18} />
          <input type="email" placeholder={t.email} dir="ltr" required />
        </div>

        <div className="input">
          <Lock size={18} />
          <input type="password" placeholder={t.pass} required />
        </div>

        <div className="input">
          <Lock size={18} />
          <input type="password" placeholder={t.confirm} required />
        </div>

        <button className="btn" type="submit">
          {t.btn}
        </button>

        <p className="switch">
          {t.switchQ}{' '}
          <Link className="link" href="/login">
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

          .btn {
            width: 100%;
            height: 50px;
            border-radius: 999px;
            border: 0;
            background: #1f513e;
            color: #fff;
            font-weight: 800;
            cursor: pointer;
            margin-top: 6px;
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
