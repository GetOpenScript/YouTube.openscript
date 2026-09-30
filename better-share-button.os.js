// ==UserScript==
// @name         Better Share Button
// @version      1.0.0
// @description  Clicking Share on YouTube instantly copies a clean video link with the si tracking parameter stripped.
// @match        https://www.youtube.com/*
// @run-at       document_idle
// ==/UserScript==

const TOAST_ID = 'os-better-share-toast';
const SHARE_ICON = 'M10 3.158V7.51';
const SCOPE = 'ytd-watch-metadata, ytd-video-primary-info-renderer, reel-action-bar-view-model, #movie_player, #shorts-player';
const KEEP = ['t', 'list'];
let toastTimer;

const videoUrl = () => {
  const short = location.pathname.match(/^\/shorts\/([\w-]{11})/)?.[1];
  if (short) return `https://youtube.com/shorts/${short}`;
  const id = new URLSearchParams(location.search).get('v')
    || location.pathname.match(/^\/live\/([\w-]{11})/)?.[1]
    || document.querySelector('ytd-watch-flexy')?.getAttribute('video-id');
  return id && `https://youtu.be/${id}`;
};

const clean = raw => {
  try {
    const url = new URL(raw);
    [...url.searchParams.keys()].forEach(k => KEEP.includes(k) || url.searchParams.delete(k));
    return url.href;
  } catch { return raw; }
};

const copy = async text => {
  try { await navigator.clipboard.writeText(text); }
  catch {
    const area = Object.assign(document.createElement('textarea'), { value: text });
    area.style.cssText = 'position:fixed;opacity:0';
    document.body.append(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
  toast('Clean link copied to clipboard');
};

const toast = msg => {
  let el = document.getElementById(TOAST_ID);
  if (!el) {
    el = Object.assign(document.createElement('div'), { id: TOAST_ID });
    el.style.cssText = `position:fixed;left:24px;bottom:24px;z-index:9999;padding:14px 16px;border-radius:8px;
      font:500 14px Roboto,Arial,sans-serif;pointer-events:none;transition:opacity .2s,transform .2s;
      background:var(--yt-spec-inverted-background,#0f0f0f);color:var(--yt-spec-text-primary-inverse,#fff)`;
    document.body.append(el);
  }
  el.textContent = msg;
  el.style.opacity = '1';
  el.style.transform = 'none';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
  }, 2500);
};

const isShare = btn => btn.closest(SCOPE)
  && !btn.closest('ytd-macro-markers-list-item-renderer')
  && (btn.matches('.ytp-share-button') || btn.querySelector(`path[d^="${SHARE_ICON}"]`));

window.addEventListener('click', e => {
  const btn = e.target.closest?.('button');
  if (!btn) return;
  // Native share dialog (e.g. opened from a menu): copy its link without tracking
  const input = btn.closest('yt-copy-link-renderer')?.querySelector('#share-url');
  const url = input ? clean(input.value) : isShare(btn) && videoUrl();
  if (!url) return;
  e.preventDefault();
  e.stopImmediatePropagation();
  copy(url);
}, true);
