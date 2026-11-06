(function () {
  var root = document.documentElement;
  root.classList.add("js");
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Idioma PT / EN ---------- */
  var KEY = "asc-portfolio-lang";
  var META = {
    pt: { title: "Alexandre Guimarães | Gerente de TI · Transformação Digital · IA",
          desc: "Gerente de TI com 18+ anos de experiência: governança, transformação digital, dados e inteligência artificial aplicada. São Paulo, Brasil." },
    en: { title: "Alexandre Guimarães | IT Manager · Digital Transformation · AI",
          desc: "IT Manager with 18+ years of experience: governance, digital transformation, data and applied artificial intelligence. São Paulo, Brazil." }
  };
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function put(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function setLang(l, persist) {
    if (l !== "pt" && l !== "en") l = "pt";
    root.setAttribute("data-lang", l);
    root.setAttribute("lang", l === "pt" ? "pt-BR" : "en");
    document.title = META[l].title;
    var d = $('meta[name="description"]'); if (d) d.setAttribute("content", META[l].desc);
    $$(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-set") === l)); });
    if (persist) put(l);
  }
  var q = new URLSearchParams(location.search).get("lang");
  setLang(q || get() || "pt", false); // padrão: português
  $$(".lang button").forEach(function (b) { b.addEventListener("click", function () { setLang(b.getAttribute("data-set"), true); }); });

  /* ---------- Menu mobile + header ---------- */
  var burger = $(".burger"), menu = $(".menu"), header = $(".site-header"), bar = $(".progress");
  if (burger && menu) {
    burger.addEventListener("click", function () { burger.setAttribute("aria-expanded", String(menu.classList.toggle("open"))); });
    menu.addEventListener("click", function (e) { if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); } });
  }
  function onScroll() {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (h > 0 ? (st / h) * 100 : 0) + "%";
    if (header) header.classList.toggle("solid", st > 30);
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- Reveal + contadores ---------- */
  function count(el) {
    var to = parseFloat(el.getAttribute("data-to")), suf = el.getAttribute("data-suffix") || "", pre = el.getAttribute("data-prefix") || "";
    if (isNaN(to) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { return; }
    var t0 = null, dur = 1400;
    function step(t) { if (!t0) t0 = t; var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3); el.textContent = pre + Math.round(to * e) + suf; if (p < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  var items = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); $$(".count", en.target).forEach(count); io.unobserve(en.target); }
      });
    }, { threshold: 0.1 });
    items.forEach(function (el) { io.observe(el); });
  } else { items.forEach(function (el) { el.classList.add("in"); }); }

  /* ---------- Nav ativo ---------- */
  var links = $$(".menu a[href^='#']"), map = {};
  links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
  if ("IntersectionObserver" in window) {
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) { links.forEach(function (l) { l.classList.remove("active"); }); map[en.target.id].classList.add("active"); }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) so.observe(s); });
  }

  /* ---------- Abas de atuação ---------- */
  var tabs = $$(".tab"), panels = $$(".panel");
  function openTab(i) {
    tabs.forEach(function (t, k) { t.setAttribute("aria-selected", String(k === i)); t.tabIndex = k === i ? 0 : -1; });
    panels.forEach(function (p, k) { p.hidden = k !== i; });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { openTab(i); });
    t.addEventListener("keydown", function (e) {
      var n = null;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") n = (i + 1) % tabs.length;
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") n = (i - 1 + tabs.length) % tabs.length;
      if (n !== null) { e.preventDefault(); openTab(n); tabs[n].focus(); }
    });
  });
  if (tabs.length) openTab(0);

  /* ---------- Filtro de cases ---------- */
  var filters = $$(".filter"), cases = $$(".case");
  filters.forEach(function (f) {
    f.addEventListener("click", function () {
      var k = f.getAttribute("data-f");
      filters.forEach(function (x) { x.setAttribute("aria-pressed", String(x === f)); });
      cases.forEach(function (c) { c.hidden = !(k === "all" || c.getAttribute("data-k") === k); });
    });
  });

  /* ---------- Recomendações ---------- */
  var qs = $$(".q"), dots = $(".dots"), cur = 0, timer;
  if (qs.length) {
    qs.forEach(function (_, i) { var d = document.createElement("i"); d.addEventListener("click", function () { show(i, true); }); dots.appendChild(d); });
    var show = function (i, user) {
      cur = (i + qs.length) % qs.length;
      qs.forEach(function (x, k) { x.classList.toggle("on", k === cur); });
      $$("i", dots).forEach(function (d, k) { d.classList.toggle("on", k === cur); });
      if (user) { clearInterval(timer); }
    };
    $(".q-prev").addEventListener("click", function () { show(cur - 1, true); });
    $(".q-next").addEventListener("click", function () { show(cur + 1, true); });
    show(0);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) timer = setInterval(function () { show(cur + 1); }, 12000);
  }

  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();
})();
