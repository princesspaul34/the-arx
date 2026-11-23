/* The Arx – interactivity & animation effects (loads after main.js) */
(function () {
  "use strict";
  var P = window.ARX.properties;
  var icon = window.ARX_ICON;
  var reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function naira(n) { return "₦" + Math.round(n).toLocaleString("en-NG"); }
  function uniq(a) { return a.filter(function (v, i) { return a.indexOf(v) === i; }); }

  /* ---------- Scroll: progress bar, back-to-top, auto-hide header, parallax ---------- */
  function initScroll() {
    var bar = document.createElement("div");
    bar.className = "progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);

    var top = document.createElement("button");
    top.type = "button";
    top.className = "to-top";
    top.setAttribute("aria-label", "Back to top");
    top.innerHTML = icon("up", 20);
    document.body.appendChild(top);
    top.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });

    var header = $("#site-header"), lastY = window.scrollY, ticking = false;
    function update() {
      var y = window.scrollY;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
      top.classList.toggle("show", y > 600);
      if (header) {
        if (y > 240 && y > lastY + 4 && !$("#navLinks.open")) header.classList.add("hide");
        else if (y < lastY - 4 || y <= 240) header.classList.remove("hide");
      }
      if (!reduce && y < 900) document.documentElement.style.setProperty("--sy", y);
      lastY = y;
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- Hero typing effect ---------- */
  function initTyped() {
    var el = $("#typed");
    if (!el || reduce) return;
    var words = (el.getAttribute("data-words") || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    if (words.length < 2) return;
    var w = 0, i = words[0].length, del = false;
    el.textContent = words[0];
    function step() {
      var word = words[w];
      if (!del) {
        if (i < word.length) { i++; el.textContent = word.slice(0, i); return setTimeout(step, 90); }
        del = true;
        return setTimeout(step, 1700);
      }
      if (i > 0) { i--; el.textContent = word.slice(0, i); return setTimeout(step, 45); }
      del = false;
      w = (w + 1) % words.length;
      setTimeout(step, 250);
    }
    setTimeout(step, 1800);
  }

  /* ---------- Animated counters (numbers come from the property data) ---------- */
  function initCounters() {
    var els = $$("[data-stat]");
    if (!els.length) return;
    var s = {
      listings: P.length,
      cities: uniq(P.map(function (p) { return p.city; })).length,
      locations: uniq(P.map(function (p) { return p.location; })).length,
      types: uniq(P.map(function (p) { return p.type; })).length
    };
    els.forEach(function (el) {
      var t = s[el.getAttribute("data-stat")] || 0;
      el.setAttribute("data-target", t);
      el.textContent = (reduce || !("IntersectionObserver" in window)) ? t : 0;
    });
    if (reduce || !("IntersectionObserver" in window)) return;

    function run(el) {
      var target = Number(el.getAttribute("data-target")), start = null, dur = 1600;
      function f(ts) {
        if (!start) start = ts;
        var p = Math.min(1, (ts - start) / dur), e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * e);
        if (p < 1) requestAnimationFrame(f);
      }
      requestAnimationFrame(f);
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (x) {
        if (x.isIntersecting) { run(x.target); io.unobserve(x.target); }
      });
    }, { threshold: 0.6 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Scrolling areas strip ---------- */
  function initMarquee() {
    var track = $("#marqueeTrack");
    if (!track) return;
    var seen = {}, items = [];
    P.forEach(function (p) { if (!seen[p.location]) { seen[p.location] = 1; items.push(p); } });
    var html = items.map(function (p) {
      return '<a class="pill" href="properties.html?q=' + encodeURIComponent(p.location) + '">' + icon("pin", 16) + p.location + " <small>" + p.city + "</small></a>";
    }).join("");
    var half = html + html;
    track.innerHTML = half + half.replace(/<a /g, '<a tabindex="-1" aria-hidden="true" ');
  }

  /* ---------- Staggered / directional reveals ---------- */
  function initStagger() {
    $$(".cats,.features,.steps,.mv,.info-list").forEach(function (g) {
      Array.prototype.forEach.call(g.children, function (c, i) {
        if (c.classList.contains("reveal")) c.style.setProperty("--d", (i % 6) * 0.1 + "s");
      });
    });
    $$(".split").forEach(function (s) {
      var a = s.children[0], b = s.children[1];
      if (a && a.classList.contains("reveal")) a.classList.add("reveal-left");
      if (b && b.classList.contains("reveal")) b.classList.add("reveal-right");
    });
    /* once a reveal has played, drop its stagger delay so hover feels instant */
    document.addEventListener("transitionend", function (e) {
      var t = e.target;
      if (e.propertyName === "opacity" && t.classList && t.classList.contains("reveal") && t.classList.contains("in")) {
        t.classList.add("done");
      }
    });
  }

  /* ---------- Pointer effects: card spotlight + button ripple ---------- */
  function initPointer() {
    document.addEventListener("pointermove", function (e) {
      var c = e.target.closest ? e.target.closest(".card,.feature") : null;
      if (!c) return;
      var r = c.getBoundingClientRect();
      c.style.setProperty("--mx", (e.clientX - r.left) + "px");
      c.style.setProperty("--my", (e.clientY - r.top) + "px");
    }, { passive: true });

    document.addEventListener("pointerdown", function (e) {
      if (reduce) return;
      var b = e.target.closest ? e.target.closest(".btn") : null;
      if (!b) return;
      var r = b.getBoundingClientRect(), d = Math.max(r.width, r.height);
      var s = document.createElement("span");
      s.className = "ripple";
      s.style.width = s.style.height = d + "px";
      s.style.left = (e.clientX - r.left - d / 2) + "px";
      s.style.top = (e.clientY - r.top - d / 2) + "px";
      b.appendChild(s);
      setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 700);
    });
  }

  /* ---------- Smooth page transitions ---------- */
  function initTransitions() {
    if (reduce) return;
    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest ? e.target.closest("a[href]") : null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      if (a.protocol !== location.protocol || a.host !== location.host) return;
      if (a.pathname === location.pathname && a.search === location.search) return;
      e.preventDefault();
      document.body.classList.add("page-leave");
      setTimeout(function () { location.href = a.href; }, 230);
    });
    window.addEventListener("pageshow", function () { document.body.classList.remove("page-leave"); });
  }

  /* ---------- Property page: entrance, gallery swap, lightbox, estimator ---------- */
  function initDetailExtras() {
    var main = $("#gMain");
    if (!main) return;

    $$("#detail .detail-grid > div:first-child > *").forEach(function (el, i) {
      el.classList.add("rise-in");
      el.style.animationDelay = (i * 0.07) + "s";
    });
    var enq = $(".enquiry");
    if (enq) { enq.classList.add("rise-in"); enq.style.animationDelay = ".25s"; }

    /* fade/zoom on every image change */
    new MutationObserver(function () {
      main.classList.remove("swap");
      void main.offsetWidth;
      main.classList.add("swap");
    }).observe(main, { attributes: true, attributeFilter: ["src"] });

    /* lightbox */
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Image viewer");
    lb.innerHTML = '<button type="button" class="lb-btn lb-close" aria-label="Close">' + icon("close", 26) + "</button>" +
      '<button type="button" class="lb-btn lb-prev" aria-label="Previous image">' + icon("left", 26) + "</button>" +
      '<img alt="">' +
      '<button type="button" class="lb-btn lb-next" aria-label="Next image">' + icon("right", 26) + "</button>" +
      '<div class="lb-count"></div>';
    document.body.appendChild(lb);
    var img = $("img", lb), count = $(".lb-count", lb);
    function sync() {
      img.src = main.src;
      img.alt = main.alt;
      var c = $("#gCount");
      count.textContent = c ? c.textContent : "";
    }
    function open() { sync(); lb.classList.add("open"); document.body.style.overflow = "hidden"; $(".lb-close", lb).focus(); }
    function close() { lb.classList.remove("open"); document.body.style.overflow = ""; }
    main.addEventListener("click", open);
    main.setAttribute("title", "Click to enlarge");
    $(".lb-close", lb).addEventListener("click", close);
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    $(".lb-prev", lb).addEventListener("click", function () { $("#gPrev").click(); sync(); });
    $(".lb-next", lb).addEventListener("click", function () { $("#gNext").click(); sync(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft" || e.key === "ArrowRight") setTimeout(sync, 0);
    });

    initCalc();
  }

  function tween(el, to) {
    var from = Number(el.getAttribute("data-v")) || 0;
    el.setAttribute("data-v", to);
    var token = (el._tk = (el._tk || 0) + 1);
    if (reduce) { el.textContent = naira(to); return; }
    var t0 = null, dur = 450;
    function f(ts) {
      if (token !== el._tk) return;
      if (!t0) t0 = ts;
      var k = Math.min(1, (ts - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = naira(from + (to - from) * e);
      if (k < 1) requestAnimationFrame(f);
    }
    requestAnimationFrame(f);
  }
  function rangeRow(id, label, valId, min, max, step, val) {
    return '<div class="calc-row"><label for="' + id + '">' + label + ' <b id="' + valId + '"></b></label>' +
      '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '"></div>';
  }
  function setFill(input) {
    var min = Number(input.min), max = Number(input.max);
    input.style.setProperty("--fill", ((Number(input.value) - min) / (max - min) * 100) + "%");
  }

  function initCalc() {
    var col = $("#detail .detail-grid > div:first-child");
    var id = new URLSearchParams(location.search).get("id");
    var p = P.filter(function (x) { return x.id === id; })[0];
    if (!col || !p) return;

    var box = document.createElement("div");
    box.className = "d-block calc rise-in";
    box.style.animationDelay = ".6s";

    if (p.status === "sale") {
      box.innerHTML = "<h2>Payment estimator</h2><p style=\"margin-bottom:22px\">Slide to see how a deposit and payment period could break down for this property.</p>" +
        rangeRow("cDep", "Initial deposit", "cDepV", 10, 70, 5, 30) +
        rangeRow("cMon", "Payment period", "cMonV", 3, 36, 3, 12) +
        '<div class="calc-out"><div><span>Deposit</span><b id="oA"></b></div><div class="hl"><span>Per month</span><b id="oB"></b></div><div><span>Balance</span><b id="oC"></b></div></div>' +
        '<p class="note">Illustrative figures at 0% interest, for budgeting only. Whether a payment plan is offered for this property is confirmed with The Arx.</p>' +
        '<a class="btn btn-wa btn-sm" id="cWa" target="_blank" rel="noopener">' + icon("wa", 16) + " Discuss a payment plan</a>";
      col.appendChild(box);
      var dep = $("#cDep"), mon = $("#cMon");
      var update = function () {
        var d = Number(dep.value), m = Number(mon.value);
        var deposit = p.price * d / 100, bal = p.price - deposit, per = bal / m;
        $("#cDepV").textContent = d + "%";
        $("#cMonV").textContent = m + " months";
        setFill(dep); setFill(mon);
        tween($("#oA"), deposit); tween($("#oB"), per); tween($("#oC"), bal);
        $("#cWa").href = window.ARX_WA("Hello The Arx, I would like to discuss a payment plan for \"" + p.title + "\" (" + naira(p.price) + "): " + d + "% deposit (" + naira(deposit) + ") then about " + naira(per) + " per month for " + m + " months.");
      };
      dep.addEventListener("input", update);
      mon.addEventListener("input", update);
      update();
    } else {
      box.innerHTML = "<h2>Rent breakdown</h2><p style=\"margin-bottom:6px\">Rent is quoted per year. These figures help you plan your budget.</p>" +
        '<div class="calc-out"><div><span>Per month</span><b id="oA"></b></div><div class="hl"><span>Per quarter</span><b id="oB"></b></div><div><span>Per year</span><b id="oC"></b></div></div>' +
        '<p class="note">Monthly and quarterly amounts are the annual rent divided up, for budgeting only. Payment terms and any additional fees are confirmed with The Arx.</p>' +
        '<a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="' + window.ARX_WA("Hello The Arx, I would like to ask about the rent payment terms for \"" + p.title + "\" (" + naira(p.price) + " per year).") + '">' + icon("wa", 16) + " Ask about payment terms</a>";
      col.appendChild(box);
      tween($("#oA"), p.price / 12); tween($("#oB"), p.price / 4); tween($("#oC"), p.price);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initScroll();
    initTyped();
    initCounters();
    initMarquee();
    initStagger();
    initPointer();
    initTransitions();
    initDetailExtras();
  });
})();
