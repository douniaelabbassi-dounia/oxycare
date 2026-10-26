/* =========================================================
   OxyCare – effets et animations
   ========================================================= */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const PALETTE = ["#3C1E5D", "#7A4B8E", "#88B2DC", "#C8B6DC"];

  /* ---------- Preloader puis intro du hero ---------- */
  const preloader = $("#preloader");
  let started = false;
  function start() {
    if (started) return;
    started = true;
    preloader.classList.add("is-done");
    root.classList.add("loaded");
    setTimeout(() => preloader.remove(), 1000);
  }
  if (reduced) start();
  else {
    window.addEventListener("load", () => setTimeout(start, 900));
    setTimeout(start, 3000); // sécurité si une ressource traîne
  }

  /* ---------- Texte tournant (machine à écrire) ---------- */
  const WORDS = {
    fr: ["vos dossiers CNSS", "votre dossier AMO", "vos papiers à la Moukataâ", "vos parents", "votre voiture", "vos courses"],
    ar: ["ملفات CNSS", "ملف AMO", "وثائق المقاطعة", "والديكم", "سيارتكم", "مشترياتكم"],
  };
  const rotator = $("#rotator");
  let rotTimer;
  function runRotator() {
    clearTimeout(rotTimer);
    const words = WORDS[root.lang === "ar" ? "ar" : "fr"];
    if (reduced) { rotator.textContent = words[0]; return; }
    let w = 0, c = 0, deleting = false;
    const tick = () => {
      const word = words[w];
      c += deleting ? -1 : 1;
      rotator.textContent = word.slice(0, c);
      let delay = deleting ? 45 : 90;
      if (!deleting && c === word.length) { deleting = true; delay = 1800; }
      else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 300; }
      rotTimer = setTimeout(tick, delay);
    };
    tick();
  }

  /* ---------- Bandeau défilant ---------- */
  function renderMarquee() {
    const lang = root.lang === "ar" ? "ar" : "fr";
    const items = window.OXY_SERVICES.map(s => `<span class="marquee__item">${s[lang][0]}</span>`).join("");
    $("#marqueeTrack").innerHTML = items + items; // doublé pour une boucle continue
  }

  document.addEventListener("langchange", () => { runRotator(); renderMarquee(); });
  runRotator();
  renderMarquee();

  /* ---------- Barre de progression ---------- */
  const progress = $("#scrollProgress");
  const stepsEl = $("#steps"), stepsLine = $("#stepsLine"), stepItems = $$(".step");
  function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;

    // ligne des étapes qui se dessine
    const r = stepsEl.getBoundingClientRect();
    const p = Math.min(Math.max((innerHeight * 0.8 - r.top) / (r.height + innerHeight * 0.3), 0), 1);
    stepsLine.style.transform = `scaleY(${p})`;
    stepItems.forEach((s, i) => s.classList.toggle("is-lit", p >= i / (stepItems.length - 1) - 0.02));
  }
  window.addEventListener("scroll", () => requestAnimationFrame(onScroll), { passive: true });
  onScroll();

  /* ---------- Bulles d'oxygène (canvas) ---------- */
  const canvas = $("#bubbles");
  if (canvas && !reduced) {
    const ctx = canvas.getContext("2d");
    const hero = $(".hero");
    let W, H, bubbles = [], running = true;
    const mouse = { x: -999, y: -999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(W, 1400) / 28);
      bubbles = Array.from({ length: count }, () => spawn(true));
    }
    function spawn(anywhere) {
      const r = 3 + Math.random() * 16;
      return {
        x: Math.random() * W, y: anywhere ? Math.random() * H : H + r,
        r, vy: 0.25 + Math.random() * 0.7, phase: Math.random() * Math.PI * 2,
        color: PALETTE[1 + Math.floor(Math.random() * 3)], alpha: 0.15 + Math.random() * 0.35, ox: 0, oy: 0,
      };
    }
    function draw(t) {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      for (const b of bubbles) {
        b.y -= b.vy;
        const sway = Math.sin(t / 1400 + b.phase) * 0.6;
        // les bulles fuient la souris
        const dx = b.x + b.ox - mouse.x, dy = b.y + b.oy - mouse.y, d = Math.hypot(dx, dy);
        if (d < 120) { b.ox += dx / d * 2.2; b.oy += dy / d * 2.2; }
        b.ox *= 0.95; b.oy *= 0.95;
        b.x += sway * 0.4;
        if (b.y < -b.r * 2) Object.assign(b, spawn(false));
        const x = b.x + b.ox, y = b.y + b.oy;
        const g = ctx.createRadialGradient(x - b.r * 0.35, y - b.r * 0.35, b.r * 0.1, x, y, b.r);
        g.addColorStop(0, "rgba(255,255,255,.9)");
        g.addColorStop(0.6, b.color + "33");
        g.addColorStop(1, b.color + "88");
        ctx.globalAlpha = b.alpha;
        ctx.beginPath(); ctx.arc(x, y, b.r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,.7)"; ctx.lineWidth = 1; ctx.stroke();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }
    hero.addEventListener("pointermove", e => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    hero.addEventListener("pointerleave", () => { mouse.x = mouse.y = -999; });
    new IntersectionObserver(([en]) => {
      const was = running; running = en.isIntersecting;
      if (running && !was) requestAnimationFrame(draw);
    }).observe(hero);
    window.addEventListener("resize", resize);
    resize();
    requestAnimationFrame(draw);
  }

  /* ---------- Parallaxe à la souris dans le hero ---------- */
  if (finePointer && !reduced) {
    const hero = $(".hero");
    const layers = $$("[data-depth]", hero);
    hero.addEventListener("pointermove", e => {
      const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
      layers.forEach(l => {
        const d = +l.dataset.depth;
        const x = `${(nx * d).toFixed(1)}px`, y = `${(ny * d).toFixed(1)}px`;
        if (l.classList.contains("blob")) l.style.transform = `translate(${x}, ${y})`;
        else { l.style.setProperty("--px", x); l.style.setProperty("--py", y); }
      });
    });
  }

  /* ---------- Halo qui suit le curseur ---------- */
  const glow = $("#cursorGlow");
  if (finePointer && !reduced) {
    let gx = 0, gy = 0, tx = 0, ty = 0;
    window.addEventListener("pointermove", e => { tx = e.clientX; ty = e.clientY; glow.classList.add("is-on"); });
    document.addEventListener("pointerleave", () => glow.classList.remove("is-on"));
    (function loop() {
      gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
      glow.style.transform = `translate(${gx}px, ${gy}px)`;
      requestAnimationFrame(loop);
    })();
  } else glow.remove();

  /* ---------- Boutons magnétiques ---------- */
  if (finePointer && !reduced) {
    $$(".magnetic, .nav__cta").forEach(btn => {
      btn.addEventListener("pointermove", e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.3, y = (e.clientY - r.top - r.height / 2) * 0.4;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
    });
  }

  /* ---------- Effet d'onde au clic ---------- */
  document.addEventListener("pointerdown", e => {
    const el = e.target.closest(".btn, .tab, .chip");
    if (!el || reduced) return;
    const r = el.getBoundingClientRect(), size = Math.max(r.width, r.height);
    const span = document.createElement("span");
    span.className = "ripple";
    span.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
    el.appendChild(span);
    setTimeout(() => span.remove(), 650);
  });

  /* ---------- Cartes en 3D + projecteur ---------- */
  if (finePointer && !reduced) {
    const grid = $("#servicesGrid");
    grid.addEventListener("pointermove", e => {
      const card = e.target.closest(".service");
      if (!card) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", `${px * 100}%`);
      card.style.setProperty("--my", `${py * 100}%`);
      card.style.setProperty("--rx", `${(0.5 - py) * 14}deg`);
      card.style.setProperty("--ry", `${(px - 0.5) * 14}deg`);
    });
    grid.addEventListener("pointerout", e => {
      const card = e.target.closest(".service");
      if (card && !card.contains(e.relatedTarget)) { card.style.setProperty("--rx", "0deg"); card.style.setProperty("--ry", "0deg"); }
    });

    $$(".tilt").forEach(el => {
      el.addEventListener("pointermove", e => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--rx", `${((e.clientY - r.top) / r.height - 0.5) * -12}deg`);
        el.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 12}deg`);
      });
      el.addEventListener("pointerleave", () => { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); });
    });
  }

  /* ---------- Zones : apparition en cascade ---------- */
  const zones = $(".zones");
  $$(".zones__list span").forEach((s, i) => s.style.setProperty("--z", i));
  new IntersectionObserver(([en], obs) => {
    if (en.isIntersecting) { zones.classList.add("is-visible"); obs.disconnect(); }
  }, { threshold: 0.3 }).observe(zones);

  /* ---------- Tableau de suivi animé ---------- */
  const tracker = $("#tracker");
  const tItems = $$("#trackerList li"), tProgress = $("#trackerProgress"), tPill = $("#trackerPill"), tToast = $("#trackerToast");
  const heroStatus = $("#heroStatus");
  let tStep = 0, tTimer, tRunning = false;
  const T = k => window.OXY_T(k);
  function trackerTick() {
    tItems.forEach((li, i) => { li.classList.toggle("is-done", i < tStep); li.classList.toggle("is-current", i === tStep); });
    tProgress.style.width = `${(tStep / tItems.length) * 100}%`;
    const done = tStep >= tItems.length;
    tracker.classList.toggle("is-complete", done);
    tPill.textContent = T(done ? "tr.done" : "tr.ongoing");
    tToast.classList.toggle("is-visible", done);
    tStep = done ? 0 : tStep + 1;
    tTimer = setTimeout(trackerTick, done ? 3200 : 1300);
  }
  if (reduced) { tStep = tItems.length; trackerTick(); clearTimeout(tTimer); }
  else new IntersectionObserver(([en]) => {
    if (en.isIntersecting && !tRunning) { tRunning = true; trackerTick(); }
    else if (!en.isIntersecting && tRunning) { tRunning = false; clearTimeout(tTimer); }
  }, { threshold: 0.3 }).observe(tracker);

  // statut du badge dans le hero
  let heroDone = false;
  const heroCard = heroStatus.closest(".float-card");
  function heroTick() {
    heroDone = !heroDone;
    heroStatus.textContent = T(heroDone ? "tr.done" : "tr.ongoing");
    heroCard.classList.toggle("is-complete", heroDone);
  }
  heroStatus.textContent = T("tr.ongoing");
  if (!reduced) setInterval(heroTick, 2600);
  document.addEventListener("langchange", () => {
    heroStatus.textContent = T(heroDone ? "tr.done" : "tr.ongoing");
    tPill.textContent = T(tracker.classList.contains("is-complete") ? "tr.done" : "tr.ongoing");
  });

  /* ---------- Visionneuse (lightbox) ---------- */
  const lb = $("#lightbox"), lbImg = $("#lightboxImg"), lbCap = $("#lightboxCap");
  let lbOpener = null;
  document.addEventListener("click", e => {
    const trigger = e.target.closest("[data-lightbox]");
    if (!trigger) return;
    lbOpener = trigger;
    lbImg.src = trigger.dataset.lightbox;
    const cap = trigger.dataset.captionKey ? T(trigger.dataset.captionKey) : trigger.dataset.caption || "";
    lbImg.alt = cap; lbCap.textContent = cap;
    lb.hidden = false;
    requestAnimationFrame(() => lb.classList.add("is-open"));
    document.body.classList.add("no-scroll");
    $("#lightboxClose").focus();
  });
  function closeLightbox() {
    if (lb.hidden) return;
    lb.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    setTimeout(() => { lb.hidden = true; lbImg.removeAttribute("src"); }, 300);
    lbOpener?.focus();
  }
  $("#lightboxClose").addEventListener("click", closeLightbox);
  lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
  window.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });

  /* ---------- Parallaxe douce des photos ---------- */
  const parallaxImgs = $$(".bento__item img");
  if (!reduced) {
    const para = () => parallaxImgs.forEach(img => {
      const r = img.closest(".bento__item").getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      img.style.setProperty("--py", `${(p * -30).toFixed(1)}px`);
    });
    window.addEventListener("scroll", () => requestAnimationFrame(para), { passive: true });
    para();
  }

  /* ---------- Formulaire : secousse en cas d'erreur ---------- */
  const form = $("#bookingForm");
  ["#nextStep", "#submitStep"].forEach(sel => $(sel).addEventListener("click", () => {
    setTimeout(() => {
      if (!$(".form__error.is-visible", form)) return;
      form.classList.remove("shake"); void form.offsetWidth; form.classList.add("shake");
    });
  }));

  /* ---------- Confettis à l'envoi ---------- */
  document.addEventListener("booked", () => {
    if (reduced) return;
    for (let i = 0; i < 90; i++) {
      const c = document.createElement("span");
      c.className = "confetti";
      const dur = 2.2 + Math.random() * 1.8;
      c.style.cssText = `left:${Math.random() * 100}vw;background:${PALETTE[i % 4]};--dx:${(Math.random() - 0.5) * 300}px;--rot:${Math.random() * 1080}deg;animation-duration:${dur}s;animation-delay:${Math.random() * 0.4}s;opacity:${0.7 + Math.random() * 0.3}`;
      if (i % 3 === 0) c.style.borderRadius = "50%";
      document.body.appendChild(c);
      setTimeout(() => c.remove(), (dur + 0.5) * 1000);
    }
  });
})();
