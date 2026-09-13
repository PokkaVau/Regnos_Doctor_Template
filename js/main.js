/**
 * main.js - Interactive Logic for Reusable Doctor Portfolio Template
 * Clean, lightweight, fully accessible Vanilla JavaScript
 */

function runWhenReady(fn) {
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    setTimeout(fn, 1);
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

runWhenReady(() => {
  initNavbar();
  initMobileMenu();
  initActiveNavSpy();
  initChamberTabs();
  initFaqAccordion();
  initAppointmentForm();
  initSmoothScroll();
});

/**
 * 1. Sticky Navbar on Scroll
 */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 2. Mobile Hamburger Menu Drawer
 */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');

  if (!mobileToggle || !navLinks) return;

  const toggleDrawer = () => {
    const isActive = navLinks.classList.toggle('active');
    mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    mobileToggle.innerHTML = isActive 
      ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
      : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    document.body.style.overflow = isActive ? 'hidden' : '';
  };

  mobileToggle.addEventListener('click', toggleDrawer);

  links.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        toggleDrawer();
      }
    });
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      toggleDrawer();
    }
  });
}

/**
 * 3. Active Nav Link Highlighting on Scroll
 */
function initActiveNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-20% 0px -50% 0px'
  });

  sections.forEach(sec => observer.observe(sec));
}

/**
 * 4. Chamber Interactive Tabs Switching
 */
function initChamberTabs() {
  const tabBtns = document.querySelectorAll('.chamber-tab-btn');
  const chamberCards = document.querySelectorAll('.chamber-card');

  if (!tabBtns.length || !chamberCards.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      tabBtns.forEach(b => b.classList.remove('active'));
      chamberCards.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetCard = document.getElementById(targetId);
      if (targetCard) {
        targetCard.classList.add('active');
      }
    });
  });
}

/**
 * 5. FAQ Smooth Accordion
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isAlreadyActive = item.classList.contains('active');

      // Close all items for a clean single-open accordion
      faqItems.forEach(i => {
        i.classList.remove('active');
        const b = i.querySelector('.faq-question-btn');
        if (b) b.setAttribute('aria-expanded', 'false');
      });

      // Toggle current item
      if (!isAlreadyActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * 6. Appointment Form Validation & Submission Feedback
 */
function initAppointmentForm() {
  const form = document.getElementById('appointment-form');
  const toast = document.getElementById('appointment-toast');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('patient-name');
    const phoneInput = document.getElementById('patient-phone');
    const dateInput = document.getElementById('appointment-date');
    const timeInput = document.getElementById('appointment-time');
    const messageInput = document.getElementById('patient-message');

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      markInvalid(nameInput, 'Please provide patient full name.');
      isValid = false;
    } else {
      markValid(nameInput);
    }

    // Validate Phone (at least 10 digits)
    const phoneClean = phoneInput.value.replace(/\D/g, '');
    if (!phoneClean || phoneClean.length < 9) {
      markInvalid(phoneInput, 'Please provide a valid phone/mobile number.');
      isValid = false;
    } else {
      markValid(phoneInput);
    }

    // Validate Date
    if (!dateInput.value) {
      markInvalid(dateInput, 'Please select your preferred consultation date.');
      isValid = false;
    } else {
      markValid(dateInput);
    }

    // Validate Time Slot
    if (!timeInput.value) {
      markInvalid(timeInput, 'Please select a preferred consultation time slot.');
      isValid = false;
    } else {
      markValid(timeInput);
    }

    // Validate Message / Problem
    if (!messageInput.value.trim() || messageInput.value.trim().length < 5) {
      markInvalid(messageInput, 'Please briefly describe the symptoms or reason for visit.');
      isValid = false;
    } else {
      markValid(messageInput);
    }

    if (isValid) {
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Submitting Request...';

      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        if (toast) {
          toast.className = 'form-toast success';
          toast.innerHTML = `
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <div>
              <strong>Appointment Request Received!</strong>
              <p style="font-size:0.85rem; margin:0; color:#15803d;">Our chamber representative will call your number shortly to confirm your serial and visiting time.</p>
            </div>
          `;
          toast.style.display = 'flex';

          setTimeout(() => {
            toast.style.display = 'none';
          }, 8000);
        }
      }, 700);
    }
  });

  function markInvalid(input, message) {
    input.classList.add('is-invalid');
    const feedback = input.nextElementSibling;
    if (feedback && feedback.classList.contains('form-feedback')) {
      feedback.textContent = message;
      feedback.style.display = 'block';
    }
  }

  function markValid(input) {
    input.classList.remove('is-invalid');
    const feedback = input.nextElementSibling;
    if (feedback && feedback.classList.contains('form-feedback')) {
      feedback.style.display = 'none';
    }
  }

  // Clear errors on typing
  ['patient-name', 'patient-phone', 'appointment-date', 'appointment-time', 'patient-message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => markValid(el));
      el.addEventListener('change', () => markValid(el));
    }
  });
}

/**
 * 7. Smooth Scrolling with Offset for Sticky Header
 */
function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  const navHeight = 76;

  anchors.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
