/* ============================================
   AI Agents Workshop — Consent & Tracking
   Platzhalter-IDs mit TRACKING_IDS ersetzen
   ============================================ */

const TRACKING_IDS = {
  ga4:       'G-XXXXXXXXXX',       // Google Analytics 4
  googleAds: 'AW-XXXXXXXXX',       // Google Ads / YouTube
  clarity:   'XXXXXXXXXX',         // Microsoft Clarity
  metaPixel: 'XXXXXXXXXXXXXXXX',   // Meta (Facebook/Instagram)
  linkedin:  'XXXXXXX',            // LinkedIn Insight Tag
  twitter:   'XXXXXXX',            // X (Twitter) Pixel
  tiktok:    'XXXXXXXXXXXXXXXXXX', // TikTok Pixel
};

const CONSENT_KEY = 'aaw_consent_v1';

function getConsent() {
  try { return JSON.parse(localStorage.getItem(CONSENT_KEY)); } catch { return null; }
}

function setConsent(analytics, marketing) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics, marketing, ts: Date.now() }));
}

/* ── Analytics Scripts ── */
function loadAnalytics() {
  if (TRACKING_IDS.ga4 === 'G-XXXXXXXXXX') return; // ID noch nicht gesetzt
  const s = document.createElement('script');
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + TRACKING_IDS.ga4;
  s.async = true;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', TRACKING_IDS.ga4);

  if (TRACKING_IDS.clarity !== 'XXXXXXXXXX') {
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window,document,'clarity','script', TRACKING_IDS.clarity);
  }
}

/* ── Marketing / Pixel Scripts ── */
function loadMarketing() {
  // Google Ads / YouTube
  if (TRACKING_IDS.googleAds !== 'AW-XXXXXXXXX') {
    const s = document.createElement('script');
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + TRACKING_IDS.googleAds;
    s.async = true;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', TRACKING_IDS.googleAds);
  }

  // Meta Pixel
  if (TRACKING_IDS.metaPixel !== 'XXXXXXXXXXXXXXXX') {
    !function(f,b,e,v,n,t,s){
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', TRACKING_IDS.metaPixel);
    window.fbq('track', 'PageView');
  }

  // LinkedIn Insight Tag
  if (TRACKING_IDS.linkedin !== 'XXXXXXX') {
    window._linkedin_partner_id = TRACKING_IDS.linkedin;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(window._linkedin_partner_id);
    (function(l){
      if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}
      var s=document.getElementsByTagName('script')[0];
      var b=document.createElement('script');
      b.type='text/javascript';b.async=true;
      b.src='https://snap.licdn.com/li.lms-analytics/insight.min.js';
      s.parentNode.insertBefore(b,s);
    })(window.lintrk);
  }

  // X (Twitter) Pixel
  if (TRACKING_IDS.twitter !== 'XXXXXXX') {
    !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments)},
    s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
    a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
    window.twq('config', TRACKING_IDS.twitter);
  }

  // TikTok Pixel
  if (TRACKING_IDS.tiktok !== 'XXXXXXXXXXXXXXXXXX') {
    !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
    ttq.methods=['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie'];
    ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
    for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
    ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
    ttq.load=function(e,n){var r='https://analytics.tiktok.com/i18n/pixel/events.js',o=n&&n.partner;
    ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;ttq._f=ttq._f||{};ttq._f[e]=n||{};
    var u=document.createElement('script');u.type='text/javascript';u.async=!0;u.src=r+'?sdkid='+e+'&lib='+t;
    var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(u,s)};
    w[t].load(TRACKING_IDS.tiktok);w[t].page();}(window,document,'ttq');
  }
}

/* ── Banner ── */
function hideBanner() {
  const b = document.getElementById('cookieBanner');
  if (b) { b.classList.add('cookie-banner--hidden'); }
}

function acceptAll() {
  setConsent(true, true);
  hideBanner();
  loadAnalytics();
  loadMarketing();
}

function rejectAll() {
  setConsent(false, false);
  hideBanner();
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', function () {
  const consent = getConsent();

  if (consent) {
    hideBanner();
    if (consent.analytics) loadAnalytics();
    if (consent.marketing) loadMarketing();
  }

  const btnAccept = document.getElementById('cookieAccept');
  const btnReject = document.getElementById('cookieReject');
  if (btnAccept) btnAccept.addEventListener('click', acceptAll);
  if (btnReject) btnReject.addEventListener('click', rejectAll);
});
