"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { content, type Content, type Lang } from "./content";
import { LANG_KEY } from "./preferences-script";

type Preferences = {
  lang: Lang;
  t: Content;
  setLang: (lang: Lang) => void;
};

const PreferencesContext = createContext<Preferences | null>(null);

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function PreferencesProvider({ children }: { children: ReactNode }) {
  // Server render defaults to EN; the head script has already set the real
  // language on <html>, which we adopt before first paint.
  const [lang, setLangState] = useState<Lang>("en");

  useIsoLayoutEffect(() => {
    setLangState(document.documentElement.lang === "fr" ? "fr" : "en");
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    document.documentElement.lang = next;
    try {
      window.localStorage.setItem(LANG_KEY, next);
    } catch {
      /* private mode / storage disabled */
    }
  }, []);

  const value = useMemo(
    () => ({ lang, t: content[lang], setLang }),
    [lang, setLang]
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx)
    throw new Error("usePreferences must be used inside <PreferencesProvider>");
  return ctx;
}
