'use client';

import React, { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthLayout from '../components/AuthLayout';

type Lang = 'ar' | 'en';

export default function VerifyPage() {
  const router = useRouter();
  const sp = useSearchParams();

  // نقرأ من الرابط إذا جا lang
  const urlLang = (sp.get('lang') as Lang) || 'en';

  const [lang, setLang] = useState<Lang>(urlLang);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  const t = useMemo(() => {
    const dict = {
      ar: {
        title: 'تفعيل الحساب',
        subtitle: 'أدخل رمز التحقق الذي تم إرساله إليك',
        code: 'رمز التحقق',
        verify: 'تفعيل',
        back: 'العودة لتسجيل الدخول',
        brandTitle: 'تحقق من حسابك',
        brandDesc: 'خطوة أخيرة قبل الوصول.',
      },
      en: {
        title: 'Verify',
        subtitle: 'Enter the verification code sent to you',
        code: 'Verification Code',
        verify: 'Verify',
        back: 'Back to Login',
        brandTitle: 'Verify your account',
        brandDesc: 'One last step before access.',
      },
    } as const;

    return dict[lang];
  }, [lang]);

  function toggleLang() {
    setLang((p) => (p === 'ar' ? 'en' : 'ar'));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: verify API
    alert('VERIFIED ✅ (Demo)');
    router.push(`/login`);
  }

  return (
    <AuthLayout
      lang={lang}
      dir={dir}
      onToggleLang={toggleLang}
      brandTitle={t.brandTitle}
      brandDesc={t.brandDesc}
    >
      <form onSubmit={onSubmit} className="authForm" dir={dir}>
        <h1 className="title">{t.title}</h1>
        <p className="sub">{t.subtitle}</p>

        <div className="inputRow">
          <input placeholder={t.code} required inputMode="numeric" />
        </div>

        <button type="submit" className="primary">
          {t.verify}
        </button>

        <button
          type="button"
          className="link"
          onClick={() => router.push('/login')}
        >
          {t.back}
        </button>

        <style jsx>{`
          .authForm {
            width: 100%;
            max-width: 420px;
            text-align: center;
          }
          .title {
            margin: 0 0 8px;
            font-size: 22px;
            color: #1f2a2b;
          }
          .sub {
            margin: 0 0 16px;
            color: #6f7f7a;
            font-size: 13px;
            line-height: 1.6;
          }
          .inputRow {
            background: #f4f7f6;
            border: 1px solid transparent;
            border-radius: 16px;
            padding: 12px 14px;
            margin: 10px 0 14px;
          }
          .inputRow:focus-within {
            border-color: rgba(31, 81, 62, 0.38);
            box-shadow: 0 0 0 4px rgba(31, 81, 62, 0.12);
          }
          input {
            width: 100%;
            border: none;
            outline: none;
            background: transparent;
            color: #1f2a2b;
            font-size: 14px;
            text-align: start;
          }
          input::placeholder {
            color: #9aa6a1;
          }
          .primary {
            width: 100%;
            background: #1f513e;
            color: #fff;
            border: none;
            border-radius: 999px;
            padding: 12px 18px;
            font-weight: 800;
            cursor: pointer;
            margin-top: 6px;
          }
          .link {
            margin-top: 12px;
            background: transparent;
            border: none;
            cursor: pointer;
            color: #6f7f7a;
            font-size: 13px;
            padding: 6px 4px;
          }
          .link:hover {
            color: #1f513e;
            text-decoration: underline;
          }
        `}</style>
      </form>
    </AuthLayout>
  );
}
