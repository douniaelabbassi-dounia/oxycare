/* =========================================================
   OxyCare – Oxygène Excellence Assistance – script principal
   ========================================================= */

const CONFIG = {
  phone: "06 77 44 78 44",
  phoneIntl: "+212 677-447844",
  whatsapp: "212677447844",          // format international, sans + ni espaces
  email: "oxygeneexcellenceassistance@gmail.com",
  facebook: "https://www.facebook.com/OxygeneExcellenceAssistance",
  maps: "https://www.openstreetmap.org/?mlat=33.9950&mlon=-6.8550#map=15/33.9950/-6.8550",
};

const SERVICES = [
  { id: "cnss",       cat: "admin", fr: ["Dossiers CNSS", "Préparation, dépôt et suivi de vos dossiers CNSS, sans perte de temps ni files d'attente."], ar: ["ملفات الضمان الاجتماعي CNSS", "تحضير وإيداع وتتبع ملفاتكم لدى CNSS دون ضياع الوقت أو الانتظار."] },
  { id: "amo",        cat: "admin", fr: ["AMO – Assurance maladie", "Demandes de prise en charge, dossiers de remboursement et suivi auprès de l'AMO."], ar: ["التأمين الإجباري عن المرض AMO", "طلبات التحمل وملفات الاسترجاع وتتبعها لدى AMO."] },
  { id: "moukataa",   cat: "admin", fr: ["Moukataâ & documents officiels", "Démarches à la Moukataâ et obtention de vos documents officiels : dépôt et suivi complet."], ar: ["المقاطعة والوثائق الرسمية", "الإجراءات لدى المقاطعة واستخراج وثائقكم الرسمية: إيداع وتتبع كامل."] },
  { id: "pack",       cat: "admin", fr: ["Pack administratif", "Une prise en charge complète de vos démarches, avec un suivi de dossier transparent."], ar: ["الباقة الإدارية", "تكفل شامل بإجراءاتكم الإدارية مع تتبع واضح لملفكم."] },
  { id: "consult",    cat: "sante", fr: ["Accompagnement aux consultations", "Nous accompagnons vos proches chez le médecin et vous faisons un compte-rendu immédiat."], ar: ["المرافقة إلى الاستشارات الطبية", "نرافق أقاربكم إلى الطبيب ونوافيكم بتقرير فوري."] },
  { id: "hospi",      cat: "sante", fr: ["Hospitalisations", "Présence et suivi attentionné lors des hospitalisations, de l'admission à la sortie."], ar: ["الاستشفاء", "حضور ومتابعة دقيقة خلال فترة الاستشفاء، من الدخول إلى الخروج."] },
  { id: "suivi",      cat: "sante", fr: ["Suivi médical sur-mesure", "Rendez-vous, analyses, traitements : un suivi attentionné qui préserve l'indépendance des seniors."], ar: ["متابعة طبية حسب الحاجة", "المواعيد والتحاليل والعلاجات: متابعة دقيقة تحافظ على استقلالية كبار السن."] },
  { id: "transport",  cat: "sante", fr: ["Transport accompagné", "Un accompagnateur attentionné, de la porte du domicile jusqu'au rendez-vous."], ar: ["النقل مع المرافقة", "مرافق يعتني بأقاربكم من باب المنزل حتى الموعد."] },
  { id: "visite",     cat: "auto",  fr: ["Visite technique", "Nous emmenons votre véhicule au contrôle technique à votre place."], ar: ["الفحص التقني", "نتكلف بإجراء الفحص التقني لسيارتكم نيابة عنكم."] },
  { id: "vidange",    cat: "auto",  fr: ["Vidange & entretien mécanique", "Prise en charge de votre véhicule pour son entretien, du garage jusqu'à la remise des clés."], ar: ["تغيير الزيت والصيانة الميكانيكية", "نتكفل بسيارتكم لصيانتها، من المرآب حتى تسليم المفاتيح."] },
  { id: "assurance",  cat: "auto",  fr: ["Renouvellement d'assurance", "Le renouvellement de votre assurance automobile, sans souci."], ar: ["تجديد التأمين", "تجديد تأمين سيارتكم دون أي عناء."] },
  { id: "courses",    cat: "conciergerie", fr: ["Courses & marché", "Vos courses et le marché faits avec soin, selon vos habitudes."], ar: ["التسوق والسوق", "نقوم بمشترياتكم من السوق بعناية وحسب عاداتكم."] },
  { id: "livraison",  cat: "conciergerie", fr: ["Livraisons personnalisées", "Des livraisons à domicile adaptées aux besoins de votre foyer."], ar: ["توصيل حسب الطلب", "توصيل إلى المنزل يناسب احتياجات أسرتكم."] },
];
window.OXY_SERVICES = SERVICES;

const CATS = {
  admin:        { fr: "Administratif",   ar: "الإدارة" },
  sante:        { fr: "Santé & seniors", ar: "الصحة وكبار السن" },
  auto:         { fr: "Automobile",      ar: "السيارات" },
  conciergerie: { fr: "Conciergerie",    ar: "الكونسيرج" },
};

/* ---------- Traductions arabes (le français est dans le HTML) ---------- */
const AR = {
  "nav.services": "خدماتنا", "nav.mre": "عرض مغاربة العالم", "nav.how": "التتبع", "nav.field": "في الميدان", "nav.contact": "اتصل بنا", "nav.book": "اطلب خدمة",
  "hero.eyebrow": "أوكسجين إكسلانس للمساعدة · أكدال، الرباط",
  "hero.title1": "ثقتكم،", "hero.title2": "التزامنا.",
  "hero.rot": "نتكلف بـ",
  "hero.lead": "خدمات المساعدة الإدارية (CNSS، AMO، المقاطعة) ومرافقة حسب الحاجة لكبار السن في الرباط. استقلالية وطمأنينة لأحبائكم.",
  "hero.cta1": "اطلب خدمة",
  "hero.b2": "مرافقة كبار السن", "hero.b3": "تقرير فوري",
  "hero.fc1t": "الباقة الإدارية", "hero.fc1s": "إيداع وتتبع كامل",
  "hero.fc2t": "متابعة طبية", "hero.fc2s": "تقرير فوري",
  "hero.fc3t": "ملف AMO", "hero.fc3s": "الحالة:",
  "cat.admin": CATS.admin.ar, "cat.sante": CATS.sante.ar, "cat.auto": CATS.auto.ar, "cat.conciergerie": CATS.conciergerie.ar,
  "pole.sante": "الاستشارات والاستشفاء", "pole.auto": "الفحص التقني، الزيت، التأمين", "pole.conciergerie": "التسوق، السوق، التوصيل",
  "services.eyebrow": "خدماتنا", "services.title": "استقلالية وطمأنينة لأحبائكم",
  "services.lead": "الإجراءات الإدارية، الصحة، السيارة أو الحياة اليومية: اختاروا فئة ونحن نتكلف بالباقي.", "services.all": "الكل",
  "mre.eyebrow": "عرض خاص لمغاربة العالم", "mre.title": "مرحبا بكم!",
  "mre.lead": "تعيشون في الخارج؟ نتكلف بإجراءاتكم في المغرب ونعتني بأقاربكم كأنهم أهلنا، مع إطلاعكم على كل مرحلة.",
  "mre.p1t": "الإدارة والصحة — طمأنينة تامة",
  "mre.p1a": "مرافقة أقاربكم", "mre.p1ad": "الاستشارات، الاستشفاء، متابعة طبية دقيقة، تقرير فوري.",
  "mre.p1b": "الباقة الإدارية", "mre.p1bd": "المقاطعة، الوثائق الرسمية، الإيداع والتتبع الكامل.",
  "mre.p2t": "السيارة والكونسيرج — لوجستيك سهل",
  "mre.p2a": "لوجستيك السيارات", "mre.p2ad": "الفحص التقني، الصيانة الميكانيكية، تجديد التأمين دون عناء.",
  "mre.p2b": "كونسيرج يومي", "mre.p2bd": "التسوق، السوق، توصيلات حسب احتياجات أسرتكم.",
  "mre.cta": "استفيدوا من العرض", "mre.poster": "عرض الملصق",
  "how.eyebrow": "كيف نعمل", "how.title": "تتبع واضح من البداية إلى النهاية", "how.lead": "تعرفون دائماً أين وصل ملفكم أو كيف حال قريبكم.",
  "how.s1t": "تتواصلون معنا", "how.s1p": "عبر واتساب أو الهاتف أو البريد الإلكتروني أو فيسبوك أو الاستمارة.",
  "how.s2t": "ندرس حاجتكم", "how.s2p": "لائحة الوثائق، المواعيد، التكفل: نقترح عليكم حلاً على المقاس.",
  "how.s3t": "نتحرك", "how.s3p": "إيداع الملف، المرافقة الطبية، المرآب أو التسوق: نتكلف بكل شيء.",
  "how.s4t": "تقرير فوري", "how.s4p": "تتوصلون بتقرير واضح في كل مرحلة، أينما كنتم.",
  "tr.label": "مثال لملف", "tr.title": "ملف كبير السن — AMO", "tr.ongoing": "قيد المعالجة", "tr.done": "تمت المعالجة",
  "tr.s1": "استلام الوثائق", "tr.s2": "مراجعة الملف واستكماله", "tr.s3": "إيداع طلب التحمل", "tr.s4": "التتبع لدى الهيئة", "tr.s5": "إرسال التقرير للعائلة",
  "tr.toast": "رسالة مرسلة: «تمت معالجة الملف»",
  "field.eyebrow": "في الميدان", "field.title": "أوكسي كير يومياً في الرباط", "field.lead": "فريق حاضر ومهتم وصارم في كل مهمة.",
  "field.c1": "إيداع وتتبع ملفاتكم AMO وCNSS والمقاطعة", "field.c2": "مرافقة بعناية حتى الموعد", "field.c3": "التسوق من السوق يصلكم بابتسامة", "field.c4": "الفحص التقني والزيت والتأمين نتكلف بها عنكم",
  "why.eyebrow": "لماذا أوكسي كير", "why.title": "أوكسجين إكسلانس للمساعدة تصبح OxyCare",
  "why.lead": "اسم جديد، بنفس الفريق ونفس الخدمات. يدان تحميان ما هو ثمين: أقاربكم وإجراءاتكم.",
  "why.v1t": "الثقة", "why.v1p": "وثائقكم وأقاربكم في أيدٍ أمينة.",
  "why.v2t": "الالتزام", "why.v2p": "ملفات كاملة تودع وتتابع حتى النهاية.",
  "why.v3t": "استقلالية كبار السن", "why.v3p": "مرافقة على المقاس تحترم استقلاليتهم.",
  "why.v4t": "تقرير فوري", "why.v4p": "نطلعكم على كل مرحلة، حتى وأنتم في الخارج.",
  "book.eyebrow": "طلب خدمة", "book.title": "قولوا لنا كيف نساعدكم",
  "book.lead": "املأوا هذه الاستمارة في دقيقة واحدة: يصلنا طلبكم مباشرة على واتساب ونرد عليكم بسرعة.",
  "book.step1": "1. أي خدمة؟", "book.step2": "2. متى وأين؟", "book.step3": "3. معلوماتكم",
  "book.date": "التاريخ المرغوب", "book.time": "الوقت", "book.morning": "صباحاً", "book.afternoon": "بعد الظهر", "book.flexible": "مرن",
  "book.area": "المدينة / الحي", "book.mre": "أعيش في الخارج (عرض مغاربة العالم)",
  "book.name": "الاسم الكامل", "book.phone": "الهاتف / واتساب", "book.msg": "تفاصيل إضافية (اختياري)",
  "book.errService": "المرجو اختيار خدمة.", "book.errDate": "المرجو تحديد التاريخ.", "book.errContact": "المرجو إدخال الاسم ورقم هاتف صحيح.",
  "book.prev": "رجوع", "book.next": "متابعة", "book.submit": "إرسال عبر واتساب",
  "book.doneT": "شكراً لكم!", "book.doneP": "تم فتح واتساب مع طلبكم. لم يبق سوى إرساله. إلى اللقاء قريباً!", "book.again": "طلب جديد",
  "faq.eyebrow": "أسئلة شائعة", "faq.title": "قد تتساءلون…",
  "faq.q1": "ما هي الإجراءات الإدارية التي تتكلفون بها؟", "faq.a1": "ملفات CNSS وAMO (طلبات التحمل والاسترجاع) والمقاطعة والوثائق الرسمية: نحضر ملفكم ونودعه ونتابعه حتى النهاية.",
  "faq.q2": "أعيش في الخارج، هل يمكنكم تدبير إجراءاتي عن بعد؟", "faq.a2": "نعم، هذا هو مبدأ عرضنا الخاص بمغاربة العالم: الإدارة، مرافقة أقاربكم، لوجستيك السيارة والكونسيرج، مع تقرير فوري.",
  "faq.q3": "كيف ترافقون كبار السن؟", "faq.a3": "الاستشارات، الاستشفاء، المتابعة الطبية: نرافق أقاربكم باحترام للحفاظ على استقلاليتهم ونطلعكم على كل جديد.",
  "faq.q4": "أين يوجد مقركم؟", "faq.a4": "نحن في أكدال، الرباط. تواصلوا معنا للتأكد من إمكانية التدخل في عنوانكم.",
  "faq.q5": "ما هي أسعاركم؟", "faq.a5": "تختلف الأسعار حسب الخدمة المطلوبة. راسلونا على واتساب 06 77 44 78 44 وسنرد عليكم بعرض واضح.",
  "contact.eyebrow": "اتصل بنا", "contact.title": "لنتحدث عن حاجتكم", "contact.lead": "سؤال، ملف، أو قريب يحتاج مرافقة؟ راسلونا.",
  "contact.wa": "واتساب مباشر", "contact.phone": "الهاتف", "contact.address": "العنوان", "contact.city": "أكدال، الرباط، المغرب",
  "contact.zones": "أكدال، الرباط", "contact.z1": "زبناء في الرباط", "contact.z2": "عائلات مغاربة العالم", "contact.z3": "كبار السن وأقاربهم",
  "footer.motto": "ثقتكم، التزامنا.",
};

/* ---------- Helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const storage = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
};

let lang = storage.get("oxycare-lang") === "ar" ? "ar" : "fr";
const FR = {}; // rempli à partir du HTML
$$("[data-i18n]").forEach(el => { FR[el.dataset.i18n] ??= el.textContent.trim(); });
FR["tr.done"] = "Traité";
const t = key => (lang === "ar" ? AR[key] : FR[key]) ?? FR[key] ?? key;
const catLabel = c => CATS[c][lang];
window.OXY_T = t;

/* ---------- Coordonnées ---------- */
function applyContact() {
  const links = {
    phone: `tel:+${CONFIG.whatsapp}`,
    whatsapp: `https://wa.me/${CONFIG.whatsapp}`,
    email: `mailto:${CONFIG.email}`,
    facebook: CONFIG.facebook,
    maps: CONFIG.maps,
  };
  $$("[data-link]").forEach(a => { a.href = links[a.dataset.link]; });
  $$("[data-text]").forEach(el => { el.textContent = CONFIG[el.dataset.text]; });
}

/* ---------- Services ---------- */
let currentFilter = "all";
function renderServices() {
  const grid = $("#servicesGrid");
  const list = SERVICES.filter(s => currentFilter === "all" || s.cat === currentFilter);
  grid.innerHTML = list.map((s, i) => `
    <article class="service" data-cat="${s.cat}" style="animation-delay:${i * 60}ms">
      <span class="service__cat">${catLabel(s.cat)}</span>
      <h3>${s[lang][0]}</h3>
      <p>${s[lang][1]}</p>
      <button type="button" class="service__link" data-book="${s.id}">${t("nav.book")} <span aria-hidden="true">→</span></button>
    </article>`).join("");
}

function setFilter(filter) {
  currentFilter = filter;
  $$(".tab").forEach(x => { const on = x.dataset.filter === filter; x.classList.toggle("is-active", on); x.setAttribute("aria-selected", on); });
  renderServices();
}
$$(".tab").forEach(tab => tab.addEventListener("click", () => setFilter(tab.dataset.filter)));
$$("[data-pole]").forEach(p => p.addEventListener("click", () => setFilter(p.dataset.pole)));

$("#servicesGrid").addEventListener("click", e => {
  const btn = e.target.closest("[data-book]");
  if (!btn) return;
  selectService(btn.dataset.book);
  goToStep(2);
  $("#reserver").scrollIntoView({ behavior: "smooth" });
});

/* ---------- Formulaire multi-étapes → WhatsApp ---------- */
const form = $("#bookingForm");
let step = 1;
let selectedService = null;

function renderChips() {
  $("#serviceChips").innerHTML = SERVICES.map(s =>
    `<button type="button" class="chip${s.id === selectedService ? " is-selected" : ""}" data-id="${s.id}" aria-pressed="${s.id === selectedService}">${s[lang][0]}</button>`
  ).join("");
}
function selectService(id) {
  selectedService = id;
  renderChips();
  $('[data-error="service"]').classList.remove("is-visible");
}
$("#serviceChips").addEventListener("click", e => {
  const chip = e.target.closest(".chip");
  if (chip) selectService(chip.dataset.id);
});
$$("[data-mre-book]").forEach(b => b.addEventListener("click", () => { form.mre.checked = true; }));

function goToStep(n) {
  step = n;
  $$(".form__step", form).forEach(f => f.classList.toggle("is-active", +f.dataset.step === n));
  $("#formProgress").style.width = `${Math.min(n, 3) / 3 * 100}%`;
  $("#formNav").hidden = n === 4;
  $("#prevStep").hidden = n === 1;
  $("#nextStep").hidden = n >= 3;
  $("#submitStep").hidden = n !== 3;
}

function validate(n) {
  const show = (key, bad) => { $(`[data-error="${key}"]`).classList.toggle("is-visible", bad); return !bad; };
  if (n === 1) return show("service", !selectedService);
  if (n === 2) return show("date", !form.date.value);
  if (n === 3) {
    const phoneOk = form.phone.value.replace(/[^\d]/g, "").length >= 9;
    return show("contact", !form.name.value.trim() || !phoneOk);
  }
  return true;
}

$("#nextStep").addEventListener("click", () => { if (validate(step)) goToStep(step + 1); });
$("#prevStep").addEventListener("click", () => goToStep(step - 1));
$("#formReset").addEventListener("click", () => { form.reset(); selectedService = null; renderChips(); goToStep(1); });

form.addEventListener("submit", e => {
  e.preventDefault();
  if (!validate(3)) return;
  const s = SERVICES.find(x => x.id === selectedService);
  const msg = [
    "Bonjour OxyCare,",
    `Je souhaite demander le service : ${s.fr[0]}`,
    form.mre.checked && "Je suis MRE (offre spéciale MRE)",
    `Date : ${form.date.value} (${form.time.value})`,
    form.area.value.trim() && `Lieu : ${form.area.value.trim()}`,
    `Nom : ${form.name.value.trim()}`,
    `Téléphone : ${form.phone.value.trim()}`,
    form.message.value.trim() && `Précisions : ${form.message.value.trim()}`,
  ].filter(Boolean).join("\n");
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  goToStep(4);
  document.dispatchEvent(new CustomEvent("booked"));
});

form.date.min = new Date().toISOString().split("T")[0];

/* ---------- Langue ---------- */
function applyLang() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  $$("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  $("[data-lang-label]").textContent = lang === "ar" ? "Français" : "العربية";
  renderServices();
  renderChips();
  document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
}
$("#langToggle").addEventListener("click", () => {
  lang = lang === "ar" ? "fr" : "ar";
  storage.set("oxycare-lang", lang);
  applyLang();
});

/* ---------- Menu mobile ---------- */
const burger = $("#burger"), nav = $("#nav"), header = $("#header");
function toggleMenu(open = !nav.classList.contains("is-open")) {
  nav.classList.toggle("is-open", open);
  header.classList.toggle("menu-open", open);
  burger.setAttribute("aria-expanded", open);
  document.body.classList.toggle("no-scroll", open);
}
burger.addEventListener("click", () => toggleMenu());
$$("a", nav).forEach(a => a.addEventListener("click", () => toggleMenu(false)));
window.addEventListener("keydown", e => { if (e.key === "Escape") toggleMenu(false); });
window.matchMedia("(min-width: 961px)").addEventListener("change", e => { if (e.matches) toggleMenu(false); });

/* ---------- Scroll : header, bouton haut, lien actif ---------- */
const toTop = $("#toTop");
const onScroll = () => {
  const y = window.scrollY;
  header.classList.toggle("is-scrolled", y > 20);
  toTop.classList.toggle("is-visible", y > 600);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const navLinks = $$(".nav__link");
const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) navLinks.forEach(l => l.classList.toggle("is-active", l.getAttribute("href") === `#${en.target.id}`));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
$$("main section[id]").forEach(s => sectionObs.observe(s));

/* ---------- Apparition au scroll ---------- */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target;
    setTimeout(() => el.classList.add("is-visible"), +(el.dataset.delay || 0));
    revealObs.unobserve(el);
  });
}, { threshold: 0.15 });
$$(".reveal").forEach(el => revealObs.observe(el));

/* ---------- FAQ : un seul élément ouvert ---------- */
$$(".faq__item").forEach(d => d.addEventListener("toggle", () => {
  if (d.open) $$(".faq__item").forEach(o => { if (o !== d) o.open = false; });
}));

/* ---------- Init ---------- */
$("#year").textContent = new Date().getFullYear();
applyContact();
applyLang();
goToStep(1);
