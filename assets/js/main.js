/**
 * SEEMANDHRA RUCHULU - MAIN JAVASCRIPT
 * Handles:
 * - Responsive Navbar Drawer Toggle
 * - Header Scroll Effects & Smooth Scrolling
 * - Front-end Contact Form Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeaderScroll();
  initContactForm();
});

/* --------------------------------------------------------------------------
   3. MOBILE NAVIGATION TOGGLE
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = navToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }
}

/* --------------------------------------------------------------------------
   4. STICKY HEADER SCROLL EFFECT & ACTIVE LINK HIGHLIGHTING
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById('main-header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Highlight active menu item on scroll
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. CONTACT FORM HANDLING
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');

  if (contactForm && formAlert) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name').value.trim();
      const phoneInput = document.getElementById('form-phone').value.trim();

      if (!nameInput || !phoneInput) {
        alert('Please provide your Name and Phone Number so we can reach back to you.');
        return;
      }

      formAlert.className = 'form-alert success';
      formAlert.innerHTML = `
        <i class="fas fa-check-circle"></i> 
        <strong>Dhanyavadalu, ${escapeHtml(nameInput)}!</strong> We have received your query. Our team will contact you shortly at <strong>${escapeHtml(phoneInput)}</strong>.
      `;

      contactForm.reset();

      setTimeout(() => {
        formAlert.style.display = 'none';
      }, 7000);
    });
  }
}

// Utility to escape HTML strings
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function (m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}
