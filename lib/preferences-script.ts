/** Shared, server-safe language preference constant (no "use client"). */
export const LANG_KEY = "hh-lang";

/**
 * Inlined in <head> (see app/layout.tsx) and run before first paint so the
 * stored language applies with zero flash. Always defaults to English unless
 * the visitor explicitly chose French.
 */
export const preferencesScript = `(function(){var l="en";try{if(localStorage.getItem("${LANG_KEY}")==="fr")l="fr"}catch(e){}document.documentElement.lang=l})();`;
