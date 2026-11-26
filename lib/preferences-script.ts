/** Shared, server-safe language preference constant (no "use client"). */
export const LANG_KEY = "hh-lang";

/**
 * Inlined in <head> (see app/layout.tsx) and run before first paint so the
 * stored language applies with zero flash. Storage access is guarded.
 */
export const preferencesScript = `(function(){var l=null;try{l=localStorage.getItem("${LANG_KEY}")}catch(e){}if(l!=="en"&&l!=="fr"){l=(navigator.language||"").toLowerCase().indexOf("fr")===0?"fr":"en"}document.documentElement.lang=l})();`;
