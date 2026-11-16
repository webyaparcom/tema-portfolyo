/* randevu-formu-3 — Bilgi Panelli Randevu Talebi (1 Kas 2026, T1-B varyant).
   Yer tutucular: rf3head rf3tablo rf3dilimler rf3kvkk rf3btn rf3ikon rf3kapali rf3disabled rf3veri. Gün adları Intl.DateTimeFormat(L) ile. Gönderim randevu-formu ile aynı sunucusuz yol (wa.me / mailto).
   Ortak yardımcılar: esc t guvenliHref gorselYol evet sayi metinleriYaz (desing metinleri kaçışlı). */
var D = json.desing || {};
var L = json.lang || "tr";

/* HTML kaçışı — html'e giden her değer bundan geçer */
function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
/* Dil seçimi: aktif dil → tr → en → ilk anahtar (motorun wmPickLang'i) */
function t(v) { return wmPickLang(v, L); }
/* Bağlantı: dış/mailto/tel/# aynen; iç sayfa adı → dil önekli yol; javascript: vb. reddedilir */
function guvenliHref(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s) { return ""; }
  if (/^\s*(javascript|vbscript|file|data):/i.test(s)) { return ""; }
  if (/^(https?:)?\/\//i.test(s) || /^(mailto:|tel:|#)/i.test(s) || s.charAt(0) === "/") { return s; }
  return wxLangInternalHref(s);
}
/* Görsel yolu: "/" ve http(s) aynen; yalın ad → /img/<ad>; tehlikeli şema → "" */
function gorselYol(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s) { return ""; }
  if (/^\s*(javascript|vbscript|file|data):/i.test(s)) { return ""; }
  if (s.charAt(0) === "/" || /^https?:\/\//i.test(s)) { return s; }
  return "/img/" + s;
}
function evet(v, d) {
  if (v === undefined || v === null || v === "") { return d; }
  return !(v === false || v === "false" || v === 0 || v === "0");
}
function sayi(v, d, mn, mx) {
  var n = parseInt(v, 10);
  if (!isFinite(n)) { n = d; }
  return Math.min(mx, Math.max(mn, n));
}
/* desing'deki düz metin / {tr,en,ar} değerlerini {{anahtar}} yerine KAÇIŞLI yazar.
   Motor aynı yer tutucuyu ham yazardı; back.js önce davrandığı için kaçışsız değer html'e ulaşmaz. */
function metinleriYaz() {
  var k;
  for (k in D) {
    if (!Object.prototype.hasOwnProperty.call(D, k)) { continue; }
    var v = D[k];
    if (v == null) { continue; }
    var dilli = typeof v === "object" && !Array.isArray(v) && (typeof v.tr === "string" || typeof v.en === "string");
    if (typeof v === "object" && !dilli) { continue; }
    var deger = esc(t(v));
    var desen = new RegExp("\\{\\{" + String(k).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\}\\}", "g");
    html = html.replace(desen, function () { return deger; });
  }
}

var rf3Set = (webmakerdata && webmakerdata.setting) || {};
var rf3Submit = D.submit === "mailto" ? "mailto" : "whatsapp";
var rf3Phone = String(D.phone || "").trim() || (typeof rf3Set.phone === "string" ? rf3Set.phone.trim() : "");
var rf3Email = String(D.email || "").trim() || (typeof rf3Set.email === "string" ? rf3Set.email.trim() : "");
var rf3Hedef = rf3Submit === "mailto" ? rf3Email : rf3Phone;
var rf3H = D.hours || {};
function rf3Hm(s, d) { return /^\d{1,2}:\d{2}$/.test(String(s || "")) ? String(s) : d; }
var rf3Bas = rf3Hm(rf3H.start, "09:00");
var rf3Son = rf3Hm(rf3H.end, "18:00");
var rf3Gunler = [];
var rf3Gs = Array.isArray(rf3H.days) && rf3H.days.length ? rf3H.days : [1, 2, 3, 4, 5];
var rf3i;
for (rf3i = 0; rf3i < rf3Gs.length; rf3i++) { var g = Number(rf3Gs[rf3i]); if (g >= 1 && g <= 7) { rf3Gunler.push(g); } }

/* Gün adları: 1 Ocak 2024 Pazartesi → 1..7 (Intl yoksa sayı) */
function rf3GunAdi(n) {
  try { return new Intl.DateTimeFormat(L, { weekday: "long", timeZone: "UTC" }).format(new Date(Date.UTC(2024, 0, n))); } catch (e) { return String(n); }
}
var rf3Tablo = "";
for (rf3i = 1; rf3i <= 7; rf3i++) {
  var acik = rf3Gunler.indexOf(rf3i) !== -1;
  rf3Tablo += '<tr' + (acik ? "" : ' class="modulex-rf3-kapaligun"') + '><th scope="row">' + esc(rf3GunAdi(rf3i)) + "</th><td" + (acik ? ' dir="ltr"' : "") + ">" +
    (acik ? esc(rf3Bas + " – " + rf3Son) : esc(t(D.closedLabel))) + "</td></tr>";
}

var rf3Parts = Array.isArray(D.dayparts) ? D.dayparts : [];
var rf3PartHtml = "";
var rf3Ikon = ["wb_twilight", "light_mode", "nights_stay"];
for (rf3i = 0; rf3i < rf3Parts.length; rf3i++) {
  var p = rf3Parts[rf3i] || {};
  var ad = t(p.name);
  if (!ad) { continue; }
  rf3PartHtml += '<label class="modulex-rf3-dilim"><input type="radio" name="dilim" value="' + esc(ad) + '" />' +
    '<span class="modulex-rf3-dkart"><span class="material-symbols-outlined" aria-hidden="true">' + (rf3Ikon[rf3i] || "schedule") + "</span>" + esc(ad) + "</span></label>";
}

var rf3KvUrl = guvenliHref(D.kvkkUrl);
var rf3Kvkk = esc(t(D.kvkkText)) + (rf3KvUrl ? ' <a href="' + esc(rf3KvUrl) + '" target="_blank" rel="noopener">' + esc(t(D.kvkkLink)) + "</a>" : "");

var rf3Veri = JSON.stringify({
  submit: rf3Submit, hedef: rf3Hedef,
  lead: sayi(D.leadDays, 1, 0, 365), max: sayi(D.maxDays, 60, 1, 730), gunler: rf3Gunler,
  sablon: t(D.msgTemplate), konu: t(D.subject),
  m: { zorunlu: t(D.required), tel: t(D.phoneInvalid), kapali: t(D.dayClosed), tamam: t(D.successText) }
}).replace(/</g, "\\u003c");

html = html.replace(/\{\{rf3head\}\}/g, function () {
  return (t(D.title) ? '<h2 class="modulex-rf3-title">' + esc(t(D.title)) + "</h2>" : "") + (t(D.description) ? '<p class="modulex-rf3-desc">' + esc(t(D.description)) + "</p>" : "");
});
html = html.replace(/\{\{rf3tablo\}\}/g, function () { return rf3Tablo; });
html = html.replace(/\{\{rf3dilimler\}\}/g, function () { return rf3PartHtml; });
html = html.replace(/\{\{rf3kvkk\}\}/g, function () { return rf3Kvkk; });
html = html.replace(/\{\{rf3btn\}\}/g, function () { return esc(t(rf3Submit === "mailto" ? D.submitMailto : D.submitWhatsapp)); });
html = html.replace(/\{\{rf3ikon\}\}/g, function () { return rf3Submit === "mailto" ? "mail" : "chat"; });
html = html.replace(/\{\{rf3kapali\}\}/g, function () { return rf3Hedef ? "" : '<p class="modulex-rf3-kapali" role="status">' + esc(t(D.closedText)) + "</p>"; });
html = html.replace(/\{\{rf3disabled\}\}/g, function () { return rf3Hedef ? "" : " disabled"; });
html = html.replace(/\{\{rf3veri\}\}/g, function () { return rf3Veri; });
metinleriYaz();
