/* Jour J Dépannage — interactions légères, sans dépendance */
(function () {
  document.documentElement.classList.remove("no-js");

  /* En-tête : bordure au défilement */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Menu mobile */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
  }

  /* Apparition discrète au défilement (désactivée si mouvement réduit) */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".reveal");
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Année du pied de page */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* Formulaire de contact */
  var form = document.getElementById("contact-form");
  if (!form) return;

  /* Pré-sélection du type de problème via ?type=plomberie|electricite|serrurerie */
  var type = new URLSearchParams(window.location.search).get("type");
  if (type) {
    var radio = form.querySelector('input[name="type"][value="' + type + '"]');
    if (radio) radio.checked = true;
  }

  var rules = {
    nom: function (v) { return v.trim().length >= 2 || "Indiquez votre nom."; },
    telephone: function (v) {
      var digits = v.replace(/[^\d+]/g, "");
      return /^(\+33|0)\d{9}$/.test(digits) || "Indiquez un numéro valide, par exemple 06 12 34 56 78.";
    },
    email: function (v) { return v.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Cette adresse e-mail semble incomplète."; },
    type: function () { return !!form.querySelector('input[name="type"]:checked') || "Choisissez le type de problème."; },
    message: function (v) { return v.trim().length >= 10 || "Décrivez votre problème en quelques mots."; },
    consentement: function () { return form.querySelector('input[name="consentement"]').checked || "Votre accord est nécessaire pour que nous puissions vous recontacter."; }
  };

  var fieldOf = function (name) { return form.querySelector('[data-field="' + name + '"]'); };

  var validate = function (name) {
    var wrap = fieldOf(name);
    if (!wrap) return true;
    var input = form.elements[name];
    var value = input && input.value !== undefined ? input.value : "";
    var result = rules[name](value);
    var ok = result === true;
    wrap.classList.toggle("has-error", !ok);
    var err = wrap.querySelector(".error");
    if (err) err.textContent = ok ? "" : result;
    var controls = wrap.querySelectorAll("input, select, textarea");
    controls.forEach(function (c) { c.setAttribute("aria-invalid", String(!ok)); });
    return ok;
  };

  Object.keys(rules).forEach(function (name) {
    var wrap = fieldOf(name);
    if (!wrap) return;
    wrap.addEventListener("change", function () { if (wrap.classList.contains("has-error")) validate(name); });
    wrap.addEventListener("input", function () { if (wrap.classList.contains("has-error")) validate(name); });
    wrap.addEventListener("focusout", function (e) {
      if (e.target.matches("input[type=text], input[type=tel], input[type=email], textarea")) validate(name);
    });
  });

  form.addEventListener("submit", function (e) {
    var firstInvalid = null;
    Object.keys(rules).forEach(function (name) {
      if (!validate(name) && !firstInvalid) firstInvalid = fieldOf(name);
    });
    if (firstInvalid) {
      e.preventDefault();
      var target = firstInvalid.querySelector("input, select, textarea");
      if (target) target.focus();
      return;
    }
    var btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.querySelector(".label").textContent = "Envoi en cours…"; }
  });
})();
