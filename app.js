'use strict';

/* ==========================================================================
   Praxis für Traditionelle Chinesische Medizin & Homöopathie Michael Segler
   Interactive Engine & Motion System (v6.1 Resilient Execution Engine)
   ========================================================================== */

// === 1. LENIS SMOOTH SCROLL ===
let lenis;
try {
  lenis = new Lenis({
    duration: 0.9,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
    smoothTouch: false, // Natives, flüssiges Scrollen auf Smartphones
    autoResize: true,
  });

  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
} catch (e) {
  console.warn('Lenis Smooth Scroll konnte nicht initialisiert werden:', e);
}

// Zentralisierte Scroll-Lock & Unlock-Steuerung (Verhindert Scroll-Lock Deadlocks)
function unlockScroll() {
  const anyModalOpen = document.querySelector('.legal-modal-backdrop.open');
  const isMobileMenuOpen = document.getElementById('mobileMenu')?.classList.contains('is-open');

  if (!anyModalOpen && !isMobileMenuOpen) {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    if (lenis) {
      lenis.start();
    }
  }
}

function lockScroll() {
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  if (lenis) {
    lenis.stop();
  }
}

// Lenis-Anker für reguläre Desktop-Links
// (Mobile Links werden in initMobileNav mit exaktem 60ms-Puffer separat gesteuert)
document.querySelectorAll('a[href^="#"]:not(.mobile-nav-link):not(#mobileMenu a)').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    if (id && id !== '#' && !anchor.hasAttribute('data-modal-open')) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(target, { offset: -80 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  });
});

// === 2. MOTION-PRIMITIVE 1: HERO KINETIC TYPOGRAPHY ===
function initKineticTypography() {
  if (typeof gsap === 'undefined' || typeof SplitType === 'undefined') return;

  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    try {
      const split = new SplitType(heroTitle, { types: 'lines,words' });
      gsap.from(split.words, {
        opacity: 0,
        y: 45,
        stagger: 0.03,
        duration: 0.95,
        ease: 'power3.out',
        delay: 0.15,
      });
    } catch (err) {
      console.warn('Kinetic Typography Fehler:', err);
    }
  }

  document.querySelectorAll('.section-title').forEach((el) => {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.from(el, {
        opacity: 0,
        y: 35,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    }
  });
}

// === 3. MOTION-PRIMITIVE 2: SCROLL REVEAL ===
function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.utils.toArray('[data-animate="fade-up"]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40, filter: 'blur(4px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

// === 4. MOTION-PRIMITIVE 3: COUNTER ===
function initCounters() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  document.querySelectorAll('.stat-counter').forEach((el) => {
    const target = parseInt(el.dataset.target || '0', 10);
    const suffix = el.dataset.suffix || '';

    gsap.fromTo(
      { val: 0 },
      { val: target },
      {
        duration: 2.0,
        ease: 'power2.out',
        onUpdate: function () {
          const current = Math.round(this.targets()[0].val);
          el.textContent = current.toLocaleString('de-DE') + suffix;
        },
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

// === 5. MOTION-PRIMITIVEN (Im Budget bewusst inaktiv gehalten) ===
function initCardStack() {
  /* Im Motion-Budget zugunsten heilkundlicher Ruhe deaktiviert */
}
function initMagneticButtons() {
  /* Im Motion-Budget zugunsten barrierefreier Lesbarkeit deaktiviert */
}

// === 6. TAGESZEIT-PERSONALISIERUNG (v6.1 Standard) ===
function initTimeGreeting() {
  const el = document.querySelector('[data-time-greeting]');
  if (!el) return;

  const h = new Date().getHours();
  let msg = '';

  if (h >= 6 && h < 12) {
    msg = 'Guten Morgen — Beginnen Sie den Tag in heilsamer Balance.';
  } else if (h >= 12 && h < 18) {
    msg = 'Guten Tag — Wir nehmen uns Zeit für Ihre ganzheitliche Gesundheit.';
  } else {
    msg = 'Guten Abend — Zeit für Regeneration. Terminanfragen nehmen wir gerne online entgegen.';
  }

  el.textContent = msg;
}

// === 7. HEADER SCROLL BEHAVIOR ===
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  window.addEventListener(
    'scroll',
    () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    },
    { passive: true }
  );
}

// === 8. MOBILE NAVIGATION (Mit Scroll-Lock & 60ms Smooth Scroll Puffer) ===
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('mobileMenuClose');
  if (!hamburger || !menu) return;

  const open = () => {
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    menu.removeAttribute('hidden');
    hamburger.setAttribute('aria-expanded', 'true');
    lockScroll();
  };

  const close = () => {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    unlockScroll();
    setTimeout(() => {
      if (!menu.classList.contains('is-open')) menu.setAttribute('hidden', '');
    }, 300);
  };

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    isOpen ? close() : open();
  });

  if (closeBtn) closeBtn.addEventListener('click', close);

  // Klick auf mobile Navigations-Reiter:
  // Schließt das Menü sofort, hebt den Scroll-Lock auf und scrollt nach ~60ms butterweich zum Ziel
  menu.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#' || link.hasAttribute('data-modal-open')) return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      close();

      // Puffer von 60ms: Stellt sicher, dass das Menü schließt und Lenis wieder aktiv ist
      setTimeout(() => {
        if (lenis) {
          lenis.scrollTo(targetEl, { offset: -80, duration: 1.0 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
    });
  });

  // ESC-Taste schließt Menü
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) close();
  });

  // Fenster-Resize-Guard (ab 1140px schließt mobiles Menü automatisch)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1140 && menu.classList.contains('is-open')) {
      close();
    }
  });
}

// === 9. MODAL MANAGEMENT (§ 5 DDG & DSGVO Art. 13) ===
function initModals() {
  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.removeAttribute('hidden');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    lockScroll();

    const focusable = modal.querySelector('button, [href], input, select, textarea');
    if (focusable) focusable.focus();
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      if (!modal.classList.contains('open')) modal.setAttribute('hidden', '');
    }, 300);

    unlockScroll();
  };

  document.querySelectorAll('[data-modal-open]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.dataset.modalOpen;
      openModal(targetId);
    });
  });

  document.querySelectorAll('[data-modal-close]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = btn.closest('.legal-modal-backdrop');
      closeModal(modal);
    });
  });

  document.querySelectorAll('.legal-modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal(backdrop);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.legal-modal-backdrop.open').forEach((m) => closeModal(m));
    }
  });

  // URL Hash check (z.B. #impressum oder #datenschutz)
  if (window.location.hash === '#impressum') openModal('impressumModal');
  if (window.location.hash === '#datenschutz') openModal('datenschutzModal');
}

// === 10. DSGVO CONSENT & TWO-CLICK GOOGLE MAPS ===
function initConsent() {
  const KEY = 'consent_tcm_segler_v1';
  const banner = document.getElementById('consentBanner');
  const stored = localStorage.getItem(KEY);
  const placeholder = document.getElementById('mapsPlaceholder');

  function applyConsent(accepted) {
    if (accepted) {
      document.querySelectorAll('iframe[data-src]').forEach((frame) => {
        if (!frame.src || frame.src === 'about:blank') {
          frame.src = frame.dataset.src;
        }
      });
      if (placeholder) placeholder.classList.add('hidden');
    }
    if (banner) banner.hidden = true;
  }

  if (stored === 'accepted') {
    applyConsent(true);
  } else if (stored === 'rejected') {
    applyConsent(false);
  } else if (banner) {
    banner.hidden = false;
  }

  document.getElementById('consentAccept')?.addEventListener('click', () => {
    localStorage.setItem(KEY, 'accepted');
    applyConsent(true);
  });

  document.getElementById('consentReject')?.addEventListener('click', () => {
    localStorage.setItem(KEY, 'rejected');
    applyConsent(false);
  });

  document.getElementById('btnActivateMaps')?.addEventListener('click', () => {
    localStorage.setItem(KEY, 'accepted');
    applyConsent(true);
  });

  document.getElementById('cookieSettingsLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem(KEY);
    if (banner) banner.hidden = false;
  });
}

// === 11. FORMSPREE MIT RESILIENTEM FALLBACK (v6.1 Standard) ===
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fallback = document.getElementById('formFallback');
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const originalText = btn ? btn.innerHTML : 'Absenden';

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Wird vertraulich gesendet...';
    }

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        if (status) {
          status.textContent = '✓ Vielen Dank! Ihre Terminanfrage ist eingegangen. Wir melden uns zeitnah bei Ihnen.';
          status.style.color = '#15803d';
        }
        form.reset();
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = originalText;
        }
      } else if (res.status === 429) {
        // Formspree Free-Tier Limit erreicht -> Resilienter Fallback
        if (fallback) fallback.style.display = 'block';
        form.style.display = 'none';
      } else {
        // Generischer Fehler
        if (status) {
          status.textContent = 'Hinweis: Bitte kontaktieren Sie uns direkt telefonisch unter 089 89648680.';
          status.style.color = 'var(--sc-accent)';
        }
        if (fallback) fallback.style.display = 'block';
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = originalText;
        }
      }
    } catch {
      // Netzwerkfehler
      if (fallback) fallback.style.display = 'block';
      if (status) {
        status.textContent = 'Netzwerkunterbrechung. Bitte rufen Sie uns direkt an oder schreiben Sie per WhatsApp.';
        status.style.color = 'var(--sc-accent)';
      }
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalText;
      }
    }
  });
}

// === 12. SIGNATURE FEATURE: DER TCM-INDIKATIONS-KOMPASS ===
function initSignatureFeature() {
  const tabs = document.querySelectorAll('.kompass-tab');
  const panels = document.querySelectorAll('.kompass-panel');
  if (!tabs.length || !panels.length) return;

  function switchTab(targetId) {
    tabs.forEach((tab) => {
      const isTarget = tab.dataset.tabTarget === targetId;
      tab.classList.toggle('active', isTarget);
      tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    panels.forEach((panel) => {
      const isTarget = panel.id === `panel-${targetId}`;
      panel.classList.toggle('active', isTarget);
      panel.hidden = !isTarget;
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      switchTab(tab.dataset.tabTarget);
    });

    // Barrierefreie Pfeiltasten-Navigation (WCAG Tablist)
    tab.addEventListener('keydown', (e) => {
      let nextIndex = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextIndex = (index + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        nextIndex = 0;
      } else if (e.key === 'End') {
        nextIndex = tabs.length - 1;
      }

      if (nextIndex !== null) {
        e.preventDefault();
        tabs[nextIndex].focus();
        switchTab(tabs[nextIndex].dataset.tabTarget);
      }
    });
  });

  // Buttons "Ersttermin für X anfragen" im Kompass -> Formular vorausfüllen
  document.querySelectorAll('[data-select-indication]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const indicationValue = btn.dataset.selectIndication;
      const select = document.getElementById('formIndication');
      if (select) {
        for (let i = 0; i < select.options.length; i++) {
          if (select.options[i].value === indicationValue) {
            select.selectedIndex = i;
            break;
          }
        }
      }

      const contactSection = document.getElementById('kontakt');
      if (contactSection) {
        if (lenis) {
          lenis.scrollTo(contactSection, { offset: -60 });
        } else {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        setTimeout(() => {
          document.getElementById('formName')?.focus();
        }, 500);
      }
    });
  });

  // Externe Trigger aus den Leistungs-Karten
  document.querySelectorAll('[data-kompass-trigger]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.dataset.kompassTrigger;
      switchTab(target);

      const kompassSection = document.getElementById('kompass');
      if (kompassSection) {
        if (lenis) {
          lenis.scrollTo(kompassSection, { offset: -70 });
        } else {
          kompassSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

// === 13. FAQ AKKORDEON (Barrierefrei) ===
function initFaq() {
  const triggers = document.querySelectorAll('.faq-trigger');

  triggers.forEach((btn, idx, all) => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const targetId = btn.getAttribute('aria-controls');
      const content = document.getElementById(targetId);

      // Schließe andere für klare Übersicht
      triggers.forEach((otherBtn) => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          const otherContent = document.getElementById(otherBtn.getAttribute('aria-controls'));
          if (otherContent) otherContent.hidden = true;
        }
      });

      btn.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
      if (content) content.hidden = isExpanded;
    });

    // Tastatur-Navigation
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        all[Math.min(idx + 1, all.length - 1)].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        all[Math.max(idx - 1, 0)].focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        all[0].focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        all[all.length - 1].focus();
      }
    });
  });
}

// === 14. INITIALISIERUNG BEI DOMCONTENTLOADED ===
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
  // Grundlegende interaktive Funktionen (Kein Motion-Overhead)
  initTimeGreeting();
  initConsent();
  initMobileNav();
  initModals();
  initHeader();
  initContactForm();
  initSignatureFeature();
  initFaq();

  // EXAKT die 3 Primitiven aus dem Motion-Budget (Phase 1 PRD):
  if (!prefersReducedMotion) {
    initKineticTypography(); // Budget-Primitiv 1
    initScrollAnimations();  // Budget-Primitiv 2
    initCounters();          // Budget-Primitiv 3
  }
});
