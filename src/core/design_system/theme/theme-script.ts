export const THEME_STORAGE_KEY = "fola-portfolio-theme";

/**
 * Inline pre-hydration script: applies the persisted theme (default dark)
 * to <html data-theme> before first paint to avoid a flash of the wrong
 * theme. Must stay free of browser-only module imports so the server layout
 * can call it.
 */
export function themeScript(): string {
  return `try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;
}
