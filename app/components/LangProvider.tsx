'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Lang = 'ar' | 'en';

type LangCtx = {
  lang: Lang;
  dir: 'rtl' | 'ltr';
  setLang: (l: Lang) => void;
  toggleLang: () => void;
};

const Ctx = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('ar');

  useEffect(() => {
    const saved = window.localStorage.getItem('lang') as Lang | null;
    if (saved === 'ar' || saved === 'en') setLang(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const value = useMemo<LangCtx>(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    return {
      lang,
      dir,
      setLang,
      toggleLang: () => setLang((p) => (p === 'ar' ? 'en' : 'ar')),
    };
  }, [lang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useLang must be used within LangProvider');
  return v;
}
