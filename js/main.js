/**
 * main.js - Interactive Logic for Reusable Doctor Portfolio Template
 * Clean, lightweight, fully accessible Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initActiveNavSpy();
  initChamberTabs();
  initFaqAccordion();
  initAppointmentForm();
  initCallModal();
  initScrollReveal();
});

/**
 * 1. Sticky Floating Island Navbar on Scroll
 */
function initNavbar() {
  const navbar = document.querySelector('.navbar-island-wrapper, .navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 2. Mobile Hamburger Menu Drawer (Geometric Morphing)
 */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');

  if (!mobileToggle || !navLinks) return;

  const toggleDrawer = () => {
    const isActive = navLinks.classList.toggle('active');
    mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
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
  const nav = document.querySelector('.chamber-tab-nav');
  if (!nav) return;

  nav.addEventListener('click', (e) => {
    const btn = e.target.closest('.chamber-tab-btn');
    if (!btn) return;
    const targetId = btn.getAttribute('data-target');

    nav.querySelectorAll('.chamber-tab-btn').forEach(b => {
      const isSelected = b === btn;
      b.classList.toggle('active', isSelected);
      b.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    document.querySelectorAll('.chamber-card').forEach(card => {
      card.classList.toggle('active', card.id === targetId);
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
 * 6. Appointment Form Validation & Dynamic Chamber Time Slots
 */
function initAppointmentForm() {
  const form = document.getElementById('appointment-form');
  const toast = document.getElementById('appointment-toast');
  const chamberSelect = document.getElementById('appointment-chamber');
  const timeSelect = document.getElementById('appointment-time');
  const dateInputEl = document.getElementById('appointment-date');
  const hintSpan = document.getElementById('chamber-hint-span');
  if (!form || !chamberSelect || !timeSelect) return;

  // Chamber schedules & slot configurations
  const chamberSchedules = {
    'chamber-1': {
      id: 'chamber-1',
      name: 'Concord Stem Cell Limited (Dhanmondi 27)',
      shortName: 'Concord Stem Cell Limited',
      days: 'Saturday, Monday, Tuesday',
      hours: '03:00 PM — 05:00 PM',
      phone: '10670',
      whatsapp: '',
      slots: [
        '03:00 PM — 04:00 PM (Afternoon Window)',
        '04:00 PM — 05:00 PM (Late Afternoon Window)'
      ]
    },
    'chamber-2': {
      id: 'chamber-2',
      name: 'Dhaka Specialized Hospital (Uttara Sector 13)',
      shortName: 'Dhaka Specialized Hospital',
      days: 'Saturday to Thursday',
      hours: '06:00 PM — 10:00 PM',
      phone: '01407099500',
      whatsapp: '8801407099500',
      slots: [
        '06:00 PM — 07:30 PM (Early Evening Window)',
        '07:30 PM — 09:00 PM (Prime Evening Window)',
        '09:00 PM — 10:00 PM (Night Window)'
      ]
    }
  };

  function updateChamberTimeSlots(chamberId) {
    const config = chamberSchedules[chamberId] || chamberSchedules['chamber-1'];
    
    // Update schedule hint label
    if (hintSpan) {
      hintSpan.textContent = `Visiting: ${config.days} | ${config.hours}`;
    }

    // Rebuild time select options
    timeSelect.innerHTML = `<option value="">-- Choose Time Window for ${config.shortName} --</option>`;
    config.slots.forEach(slot => {
      const opt = document.createElement('option');
      opt.value = slot;
      opt.textContent = slot;
      timeSelect.appendChild(opt);
    });

    markValid(timeSelect);
  }

  // Initialize slots for default chamber
  updateChamberTimeSlots(chamberSelect.value);

  // Update on chamber select change
  chamberSelect.addEventListener('change', (e) => {
    updateChamberTimeSlots(e.target.value);
  });

  // Link Chamber section buttons to automatically pre-select chamber in form
  document.querySelectorAll('[data-select-chamber]').forEach(btn => {
    btn.addEventListener('click', () => {
      const chamberKey = btn.getAttribute('data-select-chamber');
      if (chamberKey && chamberSchedules[chamberKey]) {
        chamberSelect.value = chamberKey;
        updateChamberTimeSlots(chamberKey);
      }
    });
  });

  if (dateInputEl) {
    const today = new Date().toISOString().split('T')[0];
    dateInputEl.setAttribute('min', today);
  }

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

    // Validate Phone (at least 9 digits)
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
      markInvalid(timeInput, 'Please select an available consultation time slot.');
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
      const selectedChamberConfig = chamberSchedules[chamberSelect.value] || chamberSchedules['chamber-1'];
      const patientName = nameInput.value.trim();
      const patientPhone = phoneInput.value.trim();
      const selectedDate = dateInput.value;
      const selectedSlot = timeInput.value;
      const symptoms = messageInput.value.trim();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Submitting Request...';

      setTimeout(() => {
        form.reset();
        // Restore chamber and slots after reset
        chamberSelect.value = selectedChamberConfig.id;
        updateChamberTimeSlots(selectedChamberConfig.id);

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        if (toast) {
          const waMessage = encodeURIComponent(
            `Appointment Request:\n- Patient: ${patientName}\n- Phone: ${patientPhone}\n- Chamber: ${selectedChamberConfig.name}\n- Date: ${selectedDate}\n- Time: ${selectedSlot}\n- Symptoms: ${symptoms}`
          );

          toast.className = 'form-toast success';
          toast.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <div style="flex:1;">
              <strong style="font-size:0.98rem; display:block; margin-bottom:2px;">Appointment Request Received!</strong>
              <p style="font-size:0.86rem; margin:0 0 6px 0; color:#15803d;">
                Reserved for <strong>${patientName}</strong> at <strong>${selectedChamberConfig.shortName}</strong> on <strong>${selectedDate}</strong> (${selectedSlot}). Our serial assistant will call ${patientPhone} to confirm.
              </p>
              ${
                selectedChamberConfig.whatsapp
                  ? `<a href="https://wa.me/${selectedChamberConfig.whatsapp}?text=${waMessage}" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:6px; font-size:0.82rem; font-weight:700; color:#166534; text-decoration:underline;">
                      Send copy directly via WhatsApp (${selectedChamberConfig.phone}) &rarr;
                    </a>`
                  : `<span style="font-size:0.82rem; color:#166534;">For instant serial confirmation, call Hotline: <strong>${selectedChamberConfig.phone}</strong></span>`
              }
            </div>
          `;
          toast.style.display = 'flex';

          setTimeout(() => {
            toast.style.display = 'none';
          }, 12000);
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
 * 8. Call Chamber Selection Modal
 */
function initCallModal() {
  const triggers = document.querySelectorAll('.call-modal-trigger');
  const modal = document.getElementById('call-modal');
  const closeBtn = document.getElementById('call-modal-close');

  if (!modal) return;

  const openModal = () => {
    modal.removeAttribute('hidden');
    // Force reflow for CSS transition
    void modal.offsetWidth;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    triggers.forEach(t => t.setAttribute('aria-expanded', 'true'));
    if (closeBtn) closeBtn.focus();
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    triggers.forEach(t => t.setAttribute('aria-expanded', 'false'));
    setTimeout(() => {
      if (!modal.classList.contains('active')) {
        modal.setAttribute('hidden', '');
      }
    }, 250);
  };

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  }

  // Close when clicking overlay backdrop outside card
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/**
 * 9. Scroll Reveal Dynamics (GPU-Safe Native IntersectionObserver)
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.fade-reveal');
  if (!revealElements.length) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}


