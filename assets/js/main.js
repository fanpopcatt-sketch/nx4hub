/* NX4 Hub — interactions */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* year */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* sticky header state */
  var header = document.getElementById("header");
  var ticking = false;

  function syncHeader() {
    if (header) header.classList.toggle("is-stuck", window.scrollY > 12);
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(syncHeader);
    },
    { passive: true }
  );
  syncHeader();

  /* mobile menu */
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");

  function closeNav() {
    if (!nav || !burger) return;
    nav.classList.remove("open");
    document.body.classList.remove("nav-open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");
  }

  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      document.body.classList.toggle("nav-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) closeNav();
    });
  }

  /* scroll reveal */
  var items = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  function showAll() {
    items.forEach(function (el) {
      el.classList.add("in");
    });
  }

  if (!("IntersectionObserver" in window) || reduceMotion) {
    showAll();
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var delay = parseInt(el.getAttribute("data-delay") || "0", 10);
          el.style.transitionDelay = delay + "ms";
          el.classList.add("in");
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    items.forEach(function (el) {
      io.observe(el);
    });

    /* bfcache restores can leave elements un-revealed */
    window.addEventListener("pageshow", function (e) {
      if (e.persisted) showAll();
    });
  }

  /* only one FAQ open at a time */
  var faqs = Array.prototype.slice.call(document.querySelectorAll(".faq-item"));
  faqs.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      faqs.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* active nav link on scroll */
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var navTicking = false;

  function setActive(id) {
    links.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
    });
  }

  function syncActive() {
    navTicking = false;
    if (!sections.length) return;

    var line = (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h"), 10) || 76) + 24;
    var current = "";

    sections.forEach(function (s) {
      var box = s.getBoundingClientRect();
      if (box.top <= line && box.bottom > line) current = s.id;
    });

    setActive(current);
  }

  if (sections.length) {
    window.addEventListener(
      "scroll",
      function () {
        if (navTicking) return;
        navTicking = true;
        window.requestAnimationFrame(syncActive);
      },
      { passive: true }
    );
    syncActive();
  }
})();
