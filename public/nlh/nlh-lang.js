/* nlh-lang — VI/EN switch for every NhiLe website.
 *
 * The page is written in one language (the "source"). /nlh/i18n.json holds the
 * other language as { "source": "vi", "pairs": { "<source text>": "<translation>" } }.
 * Visible text, placeholder / aria-label / alt / title, <title> and the meta
 * description are swapped in place; React/Svelte re-renders are re-translated
 * through a MutationObserver. The choice is remembered and mirrored on
 * <html lang>, so <nlh-contact> switches language with the page.
 *
 * Load with: <script src="/nlh/nlh-lang.js" defer></script>
 */
(function () {
  'use strict';
  var KEY = 'nlh-lang';
  var ATTRS = ['placeholder', 'aria-label', 'alt', 'title'];
  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, CODE: 1, PRE: 1, TEXTAREA: 1, 'NLH-CONTACT': 1 };
  var dict = null, source = 'vi', current = null, applying = false;
  var original = new WeakMap(); // node -> original text / attrs

  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }

  function wanted() {
    try {
      var q = new URLSearchParams(location.search).get('lang');
      if (q === 'en' || q === 'vi') { localStorage.setItem(KEY, q); return q; }
      var s = localStorage.getItem(KEY);
      if (s === 'en' || s === 'vi') return s;
    } catch (e) {}
    return source;
  }

  // record per text node: { o: original text, t: text we wrote }
  function translateText(node, toSource) {
    var r = original.get(node);
    // Someone else (React, Svelte) rewrote the node since we touched it: that is the new original.
    if (r && node.nodeValue !== r.t && node.nodeValue !== r.o) { r = null; original.delete(node); }
    if (toSource) { if (r && node.nodeValue !== r.o) node.nodeValue = r.o; return; }
    var base = r ? r.o : node.nodeValue;
    var k = norm(base);
    if (!k || !dict[k]) return;
    var lead = base.match(/^\s*/)[0], trail = base.match(/\s*$/)[0];
    var next = lead + dict[k] + trail;
    original.set(node, { o: base, t: next });
    if (node.nodeValue !== next) node.nodeValue = next;
  }

  function translateAttrs(el, toSource) {
    var store = original.get(el) || {};
    ATTRS.forEach(function (a) {
      if (!el.hasAttribute(a)) return;
      if (toSource) { if (store[a] !== undefined) el.setAttribute(a, store[a]); return; }
      var base = store[a] !== undefined ? store[a] : el.getAttribute(a);
      var t = dict[norm(base)];
      if (!t) return;
      store[a] = base;
      el.setAttribute(a, t);
    });
    original.set(el, store);
  }

  function walk(root, toSource) {
    if (!root || (root.nodeType === 1 && SKIP[root.nodeName])) return;
    if (root.nodeType === 3) { translateText(root, toSource); return; }
    if (root.nodeType === 1) translateAttrs(root, toSource);
    var w = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        for (var p = n.nodeType === 1 ? n : n.parentNode; p && p !== root; p = p.parentNode) {
          if (SKIP[p.nodeName]) return NodeFilter.FILTER_REJECT;
          if (p.hasAttribute && p.hasAttribute('data-nlh-no-translate')) return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = w.nextNode())) {
      if (n.nodeType === 3) translateText(n, toSource); else translateAttrs(n, toSource);
    }
  }

  var headOriginal = null;
  function head(toSource) {
    var meta = document.querySelector('meta[name="description"]');
    if (!headOriginal) headOriginal = { title: document.title, desc: meta ? meta.getAttribute('content') : '' };
    if (toSource) {
      document.title = headOriginal.title;
      if (meta) meta.setAttribute('content', headOriginal.desc);
      return;
    }
    var t = dict[norm(headOriginal.title)], d = dict[norm(headOriginal.desc || '')];
    if (t) document.title = t;
    if (meta && d) meta.setAttribute('content', d);
  }

  function apply(lang) {
    current = lang;
    applying = true;
    var toSource = lang === source;
    document.documentElement.setAttribute('lang', lang);
    head(toSource);
    walk(document.body, toSource);
    applying = false;
    renderSwitch();
    try { window.dispatchEvent(new CustomEvent('nlh-lang', { detail: { lang: lang } })); } catch (e) {}
  }

  function set(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    apply(lang);
  }

  var sw;
  function renderSwitch() {
    if (!sw) {
      sw = document.createElement('div');
      sw.setAttribute('data-nlh-no-translate', '');
      sw.setAttribute('role', 'group');
      sw.setAttribute('aria-label', 'Language');
      sw.style.cssText = 'position:fixed;z-index:2147483000;left:12px;bottom:12px;display:flex;gap:2px;padding:3px;border-radius:980px;' +
        'background:var(--bg-raised,#fff);border:1px solid var(--line-strong,#d2d2d7);box-shadow:var(--elev-float,0 2px 8px rgba(0,0,0,.08));font:600 13px/1 var(--font-ui,system-ui,sans-serif)';
      ['vi', 'en'].forEach(function (l) {
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = l.toUpperCase();
        b.setAttribute('data-l', l);
        b.style.cssText = 'min-width:40px;min-height:32px;border:0;border-radius:980px;cursor:pointer;font:inherit;padding:0 10px';
        b.addEventListener('click', function () { set(l); });
        sw.appendChild(b);
      });
      document.body.appendChild(sw);
    }
    Array.prototype.forEach.call(sw.children, function (b) {
      var on = b.getAttribute('data-l') === current;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.style.background = on ? 'var(--action,#df0029)' : 'transparent';
      b.style.color = on ? 'var(--action-on,#fff)' : 'var(--text-secondary,#474749)';
    });
  }

  function observe() {
    new MutationObserver(function (muts) {
      if (applying || current === source) return;
      applying = true;
      muts.forEach(function (m) {
        if (m.type === 'characterData') translateText(m.target, false);
        else m.addedNodes.forEach(function (n) { walk(n, false); });
      });
      applying = false;
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  function start() {
    fetch('/nlh/i18n.json', { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (j) {
      source = j.source === 'en' ? 'en' : 'vi';
      dict = {};
      Object.keys(j.pairs || {}).forEach(function (k) { dict[norm(k)] = j.pairs[k]; });
      apply(wanted());
      observe();
    }).catch(function () { /* no dictionary: leave the page as written */ });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
