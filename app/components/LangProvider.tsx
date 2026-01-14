'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type Lang = 'ar' | 'en';

type Ctx = {
  lang: Lang;
  dir: 'rtl' | 'ltr';
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  withLang: (path: string) => string;
};

const LangContext = createContext<Ctx | null>(null);

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}

// ✅ Default export
export default function LangProvider({
  children,
  defaultLang = 'en',
}: {
  children: React.ReactNode;
  defaultLang?: Lang;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const urlLang = (sp.get('lang') as Lang) || null;
  const [lang, setLangState] = useState<Lang>(urlLang ?? defaultLang);

  useEffect(() => {
    if (urlLang && urlLang !== lang) setLangState(urlLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  function setLang(l: Lang) {
    setLangState(l);
    const next = new URLSearchParams(sp.toString());
    next.set('lang', l);
    router.replace(`${pathname}?${next.toString()}`);
  }

  function toggleLang() {
    setLang(lang === 'ar' ? 'en' : 'ar');
  }

  const value = useMemo<Ctx>(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    const withLang = (path: string) =>
      path.includes('?') ? `${path}&lang=${lang}` : `${path}?lang=${lang}`;
    return { lang, dir, setLang, toggleLang, withLang };
  }, [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
