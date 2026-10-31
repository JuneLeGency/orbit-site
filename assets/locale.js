(function () {
  'use strict';
  const key = 'orbit.language';
  const url = new URL(window.location.href);
  const explicit = url.searchParams.get('lang');
  let stored = null;
  try { stored = window.localStorage.getItem(key); } catch (_) {}
  const browser = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
  const language = ['zh', 'en'].includes(explicit) ? explicit : ['zh', 'en'].includes(stored) ? stored : /^zh(?:-|$)/i.test(browser) ? 'zh' : 'en';
  if (['zh', 'en'].includes(explicit)) {
    try { window.localStorage.setItem(key, language); } catch (_) {}
  }
  const file = url.pathname.split('/').pop();
  const page = file.startsWith('evidence') ? 'evidence' : file.startsWith('compatibility') ? 'compatibility' : 'index';
  const target = page + (language === 'en' ? '.en' : '') + '.html';
  if ((file || 'index.html') !== target) {
    url.pathname = url.pathname.slice(0, url.pathname.lastIndexOf('/') + 1) + target;
    window.location.replace(url.href);
    return;
  }
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  window.orbitLanguage = language;
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href]').forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#')) return;
      const dest = new URL(href, url);
      if (dest.origin !== url.origin || !/\/(index|evidence|compatibility)(\.en)?\.html$/.test(dest.pathname)) return;
      const chosen = link.dataset.language || language;
      dest.searchParams.set('lang', chosen);
      if (link.dataset.language) dest.hash = url.hash;
      link.href = dest.href;
    });
  });
})();
