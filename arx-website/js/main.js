/* The Arx Real Estate – shared site script */
(function () {
  "use strict";
  var C = window.ARX.config;
  var P = window.ARX.properties;

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* ---------- Icons ---------- */
  var ICONS = {
    pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    bed: '<path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 00-3-3h-8v5"/><circle cx="6.5" cy="11" r="1.5"/>',
    bath: '<path d="M4 12h16v3a4 4 0 01-4 4H8a4 4 0 01-4-4v-3zM6 12V6a2 2 0 013.5-1.3M7 19l-1 2M17 19l1 2"/>',
    area: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    car: '<path d="M5 16l1.5-5a2 2 0 012-1.5h7a2 2 0 012 1.5L19 16M3 16h18v3H3zM7 19v1M17 19v1"/><circle cx="7.5" cy="16" r=".5"/><circle cx="16.5" cy="16" r=".5"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    left: '<path d="M15 5l-7 7 7 7"/>',
    right: '<path d="M9 5l7 7-7 7"/>',
    home: '<path d="M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6"/>',
    building: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3"/>',
    land: '<path d="M3 19l5-9 4 6 3-4 6 7zM3 19h18"/>',
    store: '<path d="M4 9l1-5h14l1 5M4 9a3 3 0 006 0 3 3 0 006 0 3 3 0 004 0M5 12v8h14v-8M10 20v-5h4v5"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3M14 9l2 2"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8L3 12z"/><circle cx="7.5" cy="8.5" r="1.3"/>',
    chart: '<path d="M4 20V4M4 20h16M8 16l4-5 3 3 5-7"/>',
    shield: '<path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.500-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
    users: '<circle cx="9" cy="8" r="3.500"/><path d="M2.500 20a6.500 6.500 0 0113 0M16 4.500a3.500 3.500 0 010 7M18 20a6.500 6.500 0 00-3-5.500"/>',
    clipboard: '<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4h6v3H9zM9 12h6M9 16h4"/>',
    wrench: '<path d="M14.500 6.500a4 4 0 005 5L20 12l-8 8a2.500 2.500 0 01-3.500-3.500l8-8z"/>',
    send: '<path d="M21 3L10 14M21 3l-7 18-4-7-7-4 18-7z"/>',
    facebook: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.500" cy="6.500" r=".6"/>',
    x: '<path d="M4 4l16 16M20 4L4 20"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11v6M8 7.500v.1M12 17v-6M12 13a3 3 0 016 0v4"/>',
    heart: '<path d="M12 20.500s-8-4.800-8-10.500A4.500 4.500 0 0112 7.200 4.500 4.500 0 0120 10c0 5.700-8 10.500-8 10.500z"/>',
    up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
    wa: '<path d="M3 21l1.600-5A8.500 8.500 0 1112 20.500a8.500 8.500 0 01-4.200-1.100L3 21z"/><path d="M9 8c-.5 1-.3 2.500 1.500 4.500s3.500 2.500 4.500 2l1-1.200-2-1-.8.800c-.8-.3-2-1.500-2.300-2.300l.8-.8-1-2L9 8z"/>'
  };
  function icon(n, s) {
    s = s || 18;
    return '<svg class="icon" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[n] || "") + "</svg>";
  }
  window.ARX_ICON = icon;

  /* ---------- Helpers ---------- */
  function naira(n) { return "₦" + Number(n).toLocaleString("en-NG"); }
  function priceHtml(p) {
    return naira(p.price) + (p.status === "rent" ? " <small>/ year</small>" : "");
  }
  function planMessage(p, plan) {
    return "Hello " + C.name + ", I am interested in " + p.title + ": " + plan.size + " sqm, " + plan.building + ". Outright " + naira(plan.outright) + ", initial payment " + naira(plan.initial) + ", 6 months " + naira(plan.sixMonth) + "/month, or 12 months " + naira(plan.twelveMonth) + "/month. Please arrange a site inspection.";
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function waLink(text, number) {
    return "https://wa.me/" + (number || C.whatsapp) + (text ? "?text=" + encodeURIComponent(text) : "");
  }
  window.ARX_WA = waLink;

  /* ---------- Saved properties (stored in this browser) ---------- */
  var memFavs = [];
  function getFavs() {
    try { var v = JSON.parse(localStorage.getItem("arx_saved") || "[]"); return Array.isArray(v) ? v : []; }
    catch (e) { return memFavs; }
  }
  function setFavs(a) { memFavs = a; try { localStorage.setItem("arx_saved", JSON.stringify(a)); } catch (e) {} }
  function isFav(id) { return getFavs().indexOf(id) > -1; }
  function syncFavs() {
    var list = getFavs();
    $$("[data-fav]").forEach(function (b) {
      var on = list.indexOf(b.getAttribute("data-fav")) > -1;
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on);
      var l = $(".lbl", b);
      if (l) l.textContent = on ? "Saved" : "Save";
    });
    var c = $("#favCount");
    if (c) { c.textContent = list.length; c.classList.toggle("show", list.length > 0); }
  }
  function toggleFav(id) {
    var list = getFavs(), i = list.indexOf(id);
    if (i > -1) list.splice(i, 1); else list.push(id);
    setFavs(list);
    syncFavs();
    document.dispatchEvent(new CustomEvent("arx:favs"));
    return i === -1;
  }
  function favBtn(id) {
    var on = isFav(id);
    return '<button type="button" class="fav' + (on ? " on" : "") + '" data-fav="' + id + '" aria-pressed="' + on + '" aria-label="Save this property">' + icon("heart", 20) + "</button>";
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("[data-fav]") : null;
    if (!b) return;
    e.preventDefault();
    toggleFav(b.getAttribute("data-fav"));
    var nb = $('[data-fav="' + b.getAttribute("data-fav") + '"]');
    if (b.isConnected) { b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop"); }
  });
  window.ARX_PLACEHOLDER = function (p, i) { return placeholder(p, i); };

  /* Illustrated placeholder when no photo is supplied */
  var PALETTES = {
    House: ["#1f5f94", "#b58a12"], Apartment: ["#3d789d", "#f0dfa6"],
    Land: ["#3f7d2e", "#b58a12"], Commercial: ["#15120b", "#b58a12"]
  };
  function placeholder(p, idx) {
    var pal = PALETTES[p.type] || PALETTES.House;
    var shift = (idx || 0) * 40;
    var scene;
    if (p.type === "Land") {
      scene = '<path d="M0 420 Q250 330 480 380 T800 350 V600 H0z" fill="#2f5a3b"/><path d="M0 470 Q300 400 560 450 T800 430 V600 H0z" fill="#3a6d47"/><rect x="520" y="300" width="6" height="110" fill="#e8e2d0"/><path d="M526 300h70v38h-70z" fill="' + pal[1] + '"/>';
    } else if (p.type === "Commercial") {
      scene = '<rect x="230" y="150" width="340" height="320" fill="#e8ecf5"/><rect x="230" y="150" width="340" height="24" fill="' + pal[1] + '"/>' + (function () { var s = ""; for (var r = 0; r < 5; r++) for (var c = 0; c < 6; c++) s += '<rect x="' + (252 + c * 52) + '" y="' + (192 + r * 54) + '" width="34" height="34" fill="#16264a" opacity=".85"/>'; return s; })() + '<rect x="360" y="420" width="80" height="50" fill="#16264a"/>';
    } else if (p.type === "Apartment") {
      scene = '<rect x="250" y="130" width="300" height="340" fill="#f1ede2"/><rect x="250" y="130" width="300" height="20" fill="' + pal[1] + '"/>' + (function () { var s = ""; for (var r = 0; r < 5; r++) for (var c = 0; c < 4; c++) s += '<rect x="' + (272 + c * 68) + '" y="' + (170 + r * 56) + '" width="40" height="36" fill="#1c3b5a" opacity=".85"/><rect x="' + (268 + c * 68) + '" y="' + (208 + r * 56) + '" width="48" height="5" fill="' + pal[1] + '"/>'; return s; })() + '<rect x="370" y="420" width="60" height="50" fill="#1c3b5a"/>';
    } else {
      scene = '<path d="M200 300 L400 150 L600 300z" fill="' + pal[1] + '"/><rect x="230" y="300" width="340" height="170" fill="#f1ede2"/><rect x="370" y="360" width="60" height="110" fill="' + pal[0] + '"/><rect x="265" y="335" width="64" height="56" fill="#9fb4d8"/><rect x="471" y="335" width="64" height="56" fill="#9fb4d8"/><rect x="470" y="190" width="30" height="60" fill="#d9d3c0"/>';
    }
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + pal[0] + '"/><stop offset="1" stop-color="#0a1325"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/><circle cx="' + (640 - shift) + '" cy="' + (120 + shift / 4) + '" r="52" fill="' + pal[1] + '" opacity=".9"/>' + scene + '<rect x="0" y="470" width="800" height="130" fill="#0a1325" opacity="' + (p.type === "Land" ? 0 : 0.55) + '"/></svg>';
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  function imagesOf(p) {
    if (p.images && p.images.length) return p.images;
    return [placeholder(p, 0), placeholder(p, 1), placeholder(p, 2), placeholder(p, 3)];
  }

  /* ---------- Header / Footer ---------- */
  var NAV = [
    ["index.html", "Home"], ["about.html", "About"], ["properties.html", "Properties"],
    ["services.html", "Services"], ["contact.html", "Contact"]
  ];
  var LOGO = '<svg width="38" height="38" viewBox="0 0 40 40" aria-hidden="true"><path d="M3 35 18.5 4 36 35h-8L18.5 18 10.5 35z" fill="#B58A12"/><path d="m18.5 35 8.2-15.2L35 35z" fill="#15120B"/></svg>';

  function buildHeader() {
    var host = $("#site-header");
    if (!host) return;
    var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    if (page === "property.html") page = "properties.html";
    var links = NAV.map(function (n) {
      return '<a href="' + n[0] + '"' + (n[0] === page ? ' class="active" aria-current="page"' : "") + ">" + n[1] + "</a>";
    }).join("");
    host.className = "site-header";
    host.innerHTML =
      '<div class="container nav">' +
      '<a class="logo" href="index.html" aria-label="' + C.name + ' home">' + LOGO +
      '<span class="logo-text">' + C.name + "<small>" + C.tagline + "</small></span></a>" +
      '<nav class="nav-links" id="navLinks" aria-label="Main navigation">' + links + "</nav>" +
      '<a class="fav-link" href="properties.html?saved=1" aria-label="Saved properties">' + icon("heart", 22) + '<span class="fav-count" id="favCount">0</span></a>' +
      '<a class="btn btn-gold btn-sm nav-cta" href="' + waLink("Hello " + C.name + ", I would like to make an enquiry.") + '" target="_blank" rel="noopener">' + icon("wa", 16) + " WhatsApp us</a>" +
      '<button class="menu-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="navLinks">' + icon("menu", 28) + "</button>" +
      "</div>";
    var btn = $("#menuBtn"), nav = $("#navLinks");
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
      btn.innerHTML = icon(open ? "close" : "menu", 28);
    });
    $$("#navLinks a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        btn.innerHTML = icon("menu", 28);
      });
    });
    window.addEventListener("scroll", function () {
      host.classList.toggle("scrolled", window.scrollY > 8);
    }, { passive: true });
  }

  function buildFooter() {
    var host = $("#site-footer");
    if (!host) return;
    var s = C.social;
    host.className = "site-footer";
    host.innerHTML =
      '<div class="container"><div class="foot-grid">' +
      '<div class="foot-brand"><a class="logo" href="index.html">' + LOGO + '<span class="logo-text">' + C.name + "<small>" + C.tagline + "</small></span></a>" +
      "<p>Explore residential plots at Citadel Estate in Malkohi, Jimeta-Yola, with clear pricing and flexible payment options.</p>" +
      '<div class="socials">' +
      '<a href="' + s.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">' + icon("facebook") + "</a>" +
      '<a href="' + s.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + icon("instagram") + "</a>" +
      '<a href="' + s.x + '" target="_blank" rel="noopener" aria-label="X (Twitter)">' + icon("x") + "</a>" +
      '<a href="' + s.linkedin + '" target="_blank" rel="noopener" aria-label="LinkedIn">' + icon("linkedin") + "</a>" +
      "</div></div>" +
      "<div><h4>Quick Links</h4><ul>" + NAV.map(function (n) { return '<li><a href="' + n[0] + '">' + n[1] + "</a></li>"; }).join("") + "</ul></div>" +
      "<div><h4>Properties</h4><ul>" +
      '<li><a href="properties.html?type=Land">Land</a></li>' +
      '<li><a href="property.html?id=citadel-cluster-1-200sqm-duplex">Cluster 1 · Duplex plots</a></li>' +
      '<li><a href="property.html?id=citadel-cluster-2-200sqm-bungalow">Cluster 2 · Bungalow plots</a></li>' +
      "</ul></div>" +
      '<div><h4>Contact</h4><ul class="foot-contact">' +
      "<li>" + icon("pin") + "<span>" + esc(C.address) + "</span></li>" +
      '<li>' + icon("phone") + '<a href="tel:' + C.phoneLink + '">' + C.phoneDisplay + "</a></li>" +
      '<li>' + icon("mail") + '<a href="mailto:' + C.email + '">' + C.email + "</a></li>" +
      "<li>" + icon("clock") + "<span>" + C.hours + "</span></li>" +
      "</ul></div></div></div>" +
      '<div class="foot-bottom"><div class="container">&copy; ' + new Date().getFullYear() + " " + C.name + " Real Estate. All rights reserved.</div></div>";

    var fl = document.createElement("a");
    fl.className = "wa-float";
    fl.href = waLink("Hello " + C.name + ", I would like to make an enquiry.");
    fl.target = "_blank"; fl.rel = "noopener";
    fl.setAttribute("aria-label", "Chat on WhatsApp");
    fl.innerHTML = icon("wa", 30);
    document.body.appendChild(fl);
  }

  /* ---------- Scroll reveal ---------- */
  var io = null;
  function reveal(root) {
    var els = $$(".reveal:not(.in)", root);
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    io = io || new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Property cards ---------- */
  function cardHtml(p) {
    var imgs = imagesOf(p);
    var specs = "";
    if (p.estatePlans) specs += "<li>" + icon("area", 16) + Number(p.area).toLocaleString("en-NG") + " sqm plot</li>";
    else if (p.beds) specs += "<li>" + icon("bed", 16) + p.beds + " Beds</li>";
    if (p.baths) specs += "<li>" + icon("bath", 16) + p.baths + " Baths</li>";
    if (!p.estatePlans) specs += "<li>" + icon("area", 16) + Number(p.area).toLocaleString("en-NG") + " m&sup2;</li>";
    if (p.parking) specs += "<li>" + icon("car", 16) + p.parking + " Parking</li>";
    var shownPrice = p.estatePlans ? naira(p.price) + ' <small>outright</small>' : priceHtml(p);
    return '<article class="card reveal">' + favBtn(p.id) +
      '<a class="card-img" href="property.html?id=' + p.id + '" aria-label="' + esc(p.title) + '">' +
      '<img src="' + imgs[0] + '" alt="' + esc(p.estatePlans ? "Illustrative estate rendering for " + p.title : p.title + ' in ' + p.location) + '" loading="lazy" width="800" height="560">' +
      '<span class="badge ' + p.status + '">For ' + (p.status === "sale" ? "Sale" : "Rent") + "</span>" + (p.estatePlans ? '<span class="badge render-badge">Illustrative render</span>' : '') + "</a>" +
      '<div class="card-body"><div class="card-price">' + shownPrice + "</div>" +
      '<h3><a href="property.html?id=' + p.id + '">' + esc(p.title) + "</a></h3>" +
      '<div class="loc">' + icon("pin", 16) + esc(p.location) + ", " + esc(p.city) + "</div>" +
      '<ul class="specs">' + specs + "</ul>" +
      '<a class="btn btn-outline btn-sm" href="property.html?id=' + p.id + '">View details ' + icon("arrow", 16) + "</a></div></article>";
  }
  function renderCards(host, list) {
    host.innerHTML = list.map(cardHtml).join("");
    $$(".card", host).forEach(function (c, i) { c.style.setProperty("--d", (i % 6) * 0.08 + "s"); });
    reveal(host);
  }

  /* ---------- Home ---------- */
  function initHome() {
    var f = $("#featured");
    if (f) renderCards(f, P.filter(function (p) { return p.featured; }).sort(function (a, b) { return Number(!!b.estatePlans) - Number(!!a.estatePlans); }).slice(0, 6));
    var intro = $("#introImg");
    if (intro) intro.src = imagesOf(P[0])[0];
    $$("[data-count]").forEach(function (el) {
      var t = el.getAttribute("data-count");
      var count = P.filter(function (p) { return p.type === t; }).length;
      el.textContent = count + " listings";
      if (!count && el.closest(".cat")) el.closest(".cat").hidden = true;
    });
  }

  /* ---------- Listings ---------- */
  function priceInRange(price, range) {
    if (!range) return true;
    var parts = range.split("-");
    var min = Number(parts[0]) || 0;
    var max = parts[1] ? Number(parts[1]) : Infinity;
    return price >= min && price < max;
  }
  function initListings() {
    var host = $("#results");
    if (!host) return;
    var form = $("#filterForm");
    var params = new URLSearchParams(location.search);
    var savedOnly = params.get("saved") === "1";
    ["q", "type", "status", "price"].forEach(function (k) {
      if (params.get(k) && form.elements[k]) form.elements[k].value = params.get(k);
    });
    var sortSel = $("#sort");

    function run() {
      var q = form.elements.q.value.trim().toLowerCase();
      var type = form.elements.type.value;
      var status = form.elements.status.value;
      var price = form.elements.price.value;
      var list = P.filter(function (p) {
        var hay = (p.location + " " + p.city + " " + p.title).toLowerCase();
        return (!savedOnly || isFav(p.id)) && (!q || hay.indexOf(q) > -1) && (!type || p.type === type) &&
          (!status || p.status === status) && priceInRange(p.price, price);
      });
      var s = sortSel.value;
      if (s === "low") list.sort(function (a, b) { return a.price - b.price; });
      if (s === "high") list.sort(function (a, b) { return b.price - a.price; });
      $("#count").textContent = list.length;
      $("#countLabel").textContent = list.length === 1 ? "property" : "properties";
      var note = $("#savedNote");
      if (note) note.hidden = !savedOnly;
      if (!list.length) {
        host.innerHTML = '<div class="empty" style="grid-column:1/-1"><h3>No properties match your search</h3><p>Try a different location, property type or price range.</p><button class="btn btn-dark" type="button" id="resetBtn">Clear filters</button></div>';
        $("#resetBtn").addEventListener("click", reset);
        return;
      }
      renderCards(host, list);
    }
    function reset() {
      savedOnly = false;
      form.reset();
      history.replaceState(null, "", location.pathname);
      run();
    }
    form.addEventListener("submit", function (e) { e.preventDefault(); run(); });
    ["type", "status", "price"].forEach(function (k) { form.elements[k].addEventListener("change", run); });
    form.elements.q.addEventListener("input", run);
    sortSel.addEventListener("change", run);
    var rb = $("#clearFilters");
    if (rb) rb.addEventListener("click", reset);
    document.addEventListener("arx:favs", function () { if (savedOnly) run(); });
    run();
  }

  /* ---------- Property details ---------- */
  function initDetails() {
    var host = $("#detail");
    if (!host) return;
    var id = new URLSearchParams(location.search).get("id");
    var p = P.filter(function (x) { return x.id === id; })[0];
    if (!p) {
      host.innerHTML = '<div class="container section"><div class="empty"><h3>Property not found</h3><p>This listing may have been removed or the link is incorrect.</p><a class="btn btn-dark" href="properties.html">Browse all properties</a></div></div>';
      return;
    }
    var imgs = imagesOf(p);
    var statusText = p.status === "sale" ? "For Sale" : "For Rent";
    document.title = p.title + " – " + p.location + ", " + p.city + " | " + C.name;
    var md = $('meta[name="description"]');
    if (md) md.setAttribute("content", p.title + " " + statusText.toLowerCase() + " in " + p.location + ", " + p.city + " at " + naira(p.price) + ". " + p.description.slice(0, 90) + "…");
    var cr = $("#crumbTitle"); if (cr) cr.textContent = p.title;
    var ph = $("#pageTitle"); if (ph) ph.textContent = p.title;

    var specs = "";
    if (p.beds) specs += '<div class="spec">' + icon("bed", 26) + "<b>" + p.beds + "</b><span>Bedrooms</span></div>";
    if (p.baths) specs += '<div class="spec">' + icon("bath", 26) + "<b>" + p.baths + "</b><span>Bathrooms</span></div>";
    specs += '<div class="spec">' + icon("area", 26) + "<b>" + Number(p.area).toLocaleString("en-NG") + " m&sup2;</b><span>" + (p.estatePlans ? "Plot size" : "Size") + "</span></div>";
    if (p.parking) specs += '<div class="spec">' + icon("car", 26) + "<b>" + p.parking + "</b><span>Parking</span></div>";
    specs += '<div class="spec">' + icon("home", 26) + "<b>" + p.type + "</b><span>Type</span></div>";

    var msg = p.estatePlans && p.estatePlans.length ? planMessage(p, p.estatePlans[0]) : "Hello " + C.name + ", I am interested in \"" + p.title + "\" (" + p.location + ", " + p.city + ", from " + naira(p.price) + "). Please share more details.";
    var enquiryUrl = waLink(msg, p.whatsapp);
    var plansHtml = "";
    if (p.estatePlans && p.estatePlans.length) {
      var multiplePlans = p.estatePlans.length > 1;
      plansHtml = '<div class="d-block estate-pricing"><h2>Plot payment plan</h2><p>Monthly figures are shown as listed for this plot.</p><div class="plan-table-wrap"><table class="plan-table"><thead><tr><th scope="col">Plot size</th><th scope="col">Approved building</th><th scope="col">Outright</th><th scope="col">Initial payment</th><th scope="col">6 months<br><small>monthly</small></th><th scope="col">12 months<br><small>monthly</small></th>' + (multiplePlans ? '<th scope="col"><span class="sr-only">Choose plan</span></th>' : '') + '</tr></thead><tbody>' + p.estatePlans.map(function (plan, index) {
        return '<tr><th scope="row">' + plan.size + ' sqm</th><td>' + esc(plan.building) + '</td><td>' + naira(plan.outright) + '</td><td>' + naira(plan.initial) + '</td><td>' + naira(plan.sixMonth) + '</td><td>' + naira(plan.twelveMonth) + '</td>' + (multiplePlans ? '<td><button class="plan-select' + (index === 0 ? ' selected' : '') + '" type="button" data-plan="' + index + '" aria-pressed="' + (index === 0) + '">' + (index === 0 ? 'Selected' : 'Choose') + '</button></td>' : '') + '</tr>';
      }).join("") + '</tbody></table></div>' + (multiplePlans ? '<p class="selected-plan" id="selectedPlan" aria-live="polite">Selected: ' + p.estatePlans[0].size + ' sqm · ' + esc(p.estatePlans[0].building) + '</p>' : '') + '</div>';
    }

    host.innerHTML =
      '<div class="container section" style="padding-top:44px"><div class="detail-grid"><div>' +
      '<div class="gallery-main"><img id="gMain" src="' + imgs[0] + '" alt="' + esc(p.estatePlans ? "Illustrative estate rendering for " + p.title : p.title) + '" width="1000" height="625">' +
      '<span class="badge ' + p.status + '">' + statusText + "</span>" +
      (p.estatePlans ? '<span class="badge render-badge">Illustrative render</span>' : '') +
      (imgs.length > 1 ? '<button class="g-btn g-prev" id="gPrev" aria-label="Previous image">' + icon("left", 22) + "</button>" : "") +
      (imgs.length > 1 ? '<button class="g-btn g-next" id="gNext" aria-label="Next image">' + icon("right", 22) + "</button>" : "") +
      (imgs.length > 1 ? '<span class="g-count" id="gCount">1 / ' + imgs.length + "</span>" : "") + "</div>" +
      (imgs.length > 1 ? '<div class="thumbs">' + imgs.map(function (src, i) {
        return '<button class="thumb' + (i === 0 ? " on" : "") + '" data-i="' + i + '" aria-label="Show image ' + (i + 1) + '"><img src="' + src + '" alt="" loading="lazy"></button>';
      }).join("") + "</div>" : "") +
      '<div class="d-head"><div><h1>' + esc(p.title) + '</h1><div class="loc" style="margin-top:8px">' + icon("pin", 16) + esc(p.location) + ", " + esc(p.city) + '</div></div><div class="d-price"><span id="detailPriceValue">' + (p.estatePlans ? naira(p.price) + ' <small>outright</small>' : priceHtml(p)) + '</span><div><button type="button" class="fav-text" data-fav="' + p.id + '" aria-pressed="false">' + icon("heart", 18) + '<span class="lbl">Save</span></button></div></div></div>' +
      '<div class="spec-grid">' + specs + "</div>" +
      '<div class="d-block"><h2>Description</h2><p>' + esc(p.description) + "</p></div>" +
      plansHtml +
      '<div class="d-block"><h2>Features &amp; amenities</h2><ul class="feat-list">' + p.features.map(function (f) { return "<li>" + icon("check", 18) + esc(f) + "</li>"; }).join("") + "</ul></div>" +
      '<div class="d-block"><h2>Location &amp; pricing</h2><p><strong>Estate:</strong> ' + esc(p.location) + ", " + esc(p.city) + ', Nigeria.' + (p.officeAddress ? '<br><strong>Arx office:</strong> ' + esc(p.officeAddress) : '') + '<br><strong>' + (p.estatePlans ? 'Outright price' : (p.status === 'sale' ? 'Asking price' : 'Annual rent')) + ':</strong> ' + naira(p.price) + '.<br>Contact us to arrange a site inspection and confirm availability.</p></div>' +
      "</div>" +
      '<aside class="enquiry"><h3>Enquire about this property</h3><p>Send us your details and we will get back to you quickly.</p>' +
      '<form id="enqForm" novalidate>' +
      '<div class="field"><label for="eName">Full name</label><input id="eName" name="name" required autocomplete="name"></div>' +
      '<div class="field"><label for="ePhone">Phone number</label><input id="ePhone" name="phone" type="tel" required autocomplete="tel"></div>' +
      '<div class="field"><label for="eEmail">Email (optional)</label><input id="eEmail" name="email" type="email" autocomplete="email"></div>' +
      '<div class="field"><label for="eMsg">Message</label><textarea id="eMsg" name="message">' + esc(p.estatePlans ? msg : "I am interested in \"" + p.title + "\" in " + p.location + ". Please contact me with more details.") + "</textarea></div>" +
      '<div class="stack"><button class="btn btn-dark btn-block" type="submit">' + icon("mail", 18) + " Send enquiry by email</button>" +
      '<a class="btn btn-wa btn-block" id="propertyWhatsApp" href="' + enquiryUrl + '" target="_blank" rel="noopener">' + icon("wa", 18) + (p.estatePlans ? " Enquire about this plot" : " Enquire on WhatsApp") + "</a>" +
      '<a class="btn btn-outline btn-block" href="tel:' + (p.phoneLink || C.phoneLink) + '">' + icon("phone", 18) + " Call " + (p.phoneDisplay || C.phoneDisplay) + "</a></div>" +
      '<div class="form-msg" id="enqMsg" role="status"></div></form></aside></div></div>';

    if (p.estatePlans && p.estatePlans.length) {
      $$('.plan-select').forEach(function (button) {
        button.addEventListener('click', function () {
          var plan = p.estatePlans[Number(button.getAttribute('data-plan'))];
          $$('.plan-select').forEach(function (item) {
            var active = item === button;
            item.classList.toggle('selected', active);
            item.setAttribute('aria-pressed', active ? 'true' : 'false');
            item.textContent = active ? 'Selected' : 'Choose';
          });
          $('#selectedPlan').textContent = 'Selected: ' + plan.size + ' sqm · ' + plan.building;
          $('#detailPriceValue').innerHTML = naira(plan.outright) + ' <small>outright</small>';
          var selectedMsg = planMessage(p, plan);
          $('#propertyWhatsApp').href = waLink(selectedMsg, p.whatsapp);
          $('#eMsg').value = selectedMsg;
        });
      });
    }

    /* gallery */
    if (imgs.length > 1) {
      var cur = 0, main = $("#gMain"), count = $("#gCount");
      function show(i) {
        cur = (i + imgs.length) % imgs.length;
        main.src = imgs[cur];
        count.textContent = (cur + 1) + " / " + imgs.length;
        $$(".thumb").forEach(function (t, k) { t.classList.toggle("on", k === cur); });
      }
      $("#gPrev").addEventListener("click", function () { show(cur - 1); });
      $("#gNext").addEventListener("click", function () { show(cur + 1); });
      $$(".thumb").forEach(function (t) { t.addEventListener("click", function () { show(Number(t.dataset.i)); }); });
      document.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") show(cur - 1);
        if (e.key === "ArrowRight") show(cur + 1);
      });
    }

    /* enquiry form */
    emailForm($("#enqForm"), $("#enqMsg"), "Property enquiry: " + p.title);

    /* structured data for search engines */
    var ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "RealEstateListing",
      name: p.title, description: p.description,
      url: C.siteUrl + "/property.html?id=" + p.id,
      offers: { "@type": "Offer", price: p.price, priceCurrency: "NGN" },
      address: { "@type": "PostalAddress", addressLocality: p.location, addressRegion: p.city, addressCountry: "NG" }
    });
    document.head.appendChild(ld);
  }

  /* ---------- Forms (static site: opens the visitor's email app) ---------- */
  function emailForm(form, msgBox, subject) {
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var name = (d.get("name") || "").trim(), phone = (d.get("phone") || "").trim(), message = (d.get("message") || "").trim();
      msgBox.className = "form-msg show";
      if (!name || !phone || !message) {
        msgBox.classList.add("err");
        msgBox.textContent = "Please fill in your name, phone number and message.";
        return;
      }
      var body = message + "\n\nName: " + name + "\nPhone: " + phone + (d.get("email") ? "\nEmail: " + d.get("email") : "");
      window.location.href = "mailto:" + C.email + "?subject=" + encodeURIComponent(subject || ("Website enquiry from " + name)) + "&body=" + encodeURIComponent(body);
      msgBox.classList.add("ok");
      msgBox.textContent = "Thank you, " + name + ". Your email app should open with your message ready to send.";
    });
  }
  function initContact() {
    var form = $("#contactForm");
    if (!form) return;
    emailForm(form, $("#contactMsg"), "Website enquiry");
    var wa = $("#contactWa");
    if (wa) wa.addEventListener("click", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var name = (d.get("name") || "").trim(), message = (d.get("message") || "").trim();
      var text = "Hello " + C.name + ", " + (message || "I would like to make an enquiry.") + (name ? "\n\n— " + name : "") + (d.get("phone") ? " (" + d.get("phone") + ")" : "");
      window.open(waLink(text), "_blank", "noopener");
    });
  }

  /* Fill static contact placeholders on any page */
  function fillContactSlots() {
    $$("[data-slot]").forEach(function (el) {
      var k = el.getAttribute("data-slot");
      if (k === "phone") { el.textContent = C.phoneDisplay; el.setAttribute("href", "tel:" + C.phoneLink); }
      if (k === "email") { el.textContent = C.email; el.setAttribute("href", "mailto:" + C.email); }
      if (k === "address") el.textContent = C.address;
      if (k === "hours") el.textContent = C.hours;
      if (k === "wa") { el.setAttribute("href", waLink("Hello " + C.name + ", I would like to make an enquiry.")); el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener"); }
    });
  }

  function fillServiceEnquiries() {
    $$('[data-service-wa]').forEach(function (el) {
      var service = el.getAttribute('data-service-wa');
      el.href = waLink('Hello ' + C.name + ', I would like to enquire about ' + service + '. Please share more information.');
      el.target = '_blank';
      el.rel = 'noopener';
      el.setAttribute('aria-label', 'Enquire about ' + service + ' on WhatsApp');
    });
  }

  function fillIcons() {
    $$("[data-i]").forEach(function (el) { el.innerHTML = icon(el.getAttribute("data-i"), 28); });
    $$("[data-ic]").forEach(function (el) {
      var k = el.getAttribute("data-ic");
      if (k === "check-only") el.outerHTML = icon("check", 20);
      else el.insertAdjacentHTML("afterbegin", icon(k, 18) + " ");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildHeader();
    fillIcons();
    buildFooter();
    fillContactSlots();
    fillServiceEnquiries();
    initHome();
    initListings();
    initDetails();
    initContact();
    syncFavs();
    reveal(document);
  });
})();
