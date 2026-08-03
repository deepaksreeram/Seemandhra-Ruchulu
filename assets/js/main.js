/**
 * SEEMANDHRA RUCHULU - MAIN JAVASCRIPT
 * Handles:
 * - Dynamic Day-of-the-Week Today's Special highlighting (new Date().getDay())
 * - Interactive Morning / Evening Menu Tab Toggle without reload
 * - Responsive Navbar Drawer Toggle
 * - Header Scroll Effects & Smooth Scrolling
 * - Front-end Contact Form Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  initTodaySpecial();
  initMenuTabs();
  initMobileNav();
  initHeaderScroll();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. TODAY'S SPECIAL AUTO-HIGHLIGHTER
   -------------------------------------------------------------------------- */
const WEEKLY_SPECIALS = [
  { day: 0, name: "Sunday", item: "Sabudana Khichdi" },
  { day: 1, name: "Monday", item: "Millet Upma" },
  { day: 2, name: "Tuesday", item: "Tapplentu" },
  { day: 3, name: "Wednesday", item: "Poha Khichdi" },
  { day: 4, name: "Thursday", item: "Millet Pongal" },
  { day: 5, name: "Friday", item: "Masala Oats Upma" },
  { day: 6, name: "Saturday", item: "Dahi Wada" }
];

function initTodaySpecial() {
  const todayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const specialCards = document.querySelectorAll('.special-card');
  
  specialCards.forEach(card => {
    const cardDay = parseInt(card.getAttribute('data-day-index'), 10);
    if (cardDay === todayIndex) {
      card.classList.add('today-highlight');
      
      // Add Today's Special Tag if not already present
      if (!card.querySelector('.today-tag')) {
        const tag = document.createElement('span');
        tag.className = 'today-tag';
        tag.innerHTML = '<i class="fas fa-star"></i> Today\'s Special';
        card.appendChild(tag);
      }
      
      // Update Day Badge text to include (Today)
      const dayBadge = card.querySelector('.day-badge');
      if (dayBadge) {
        dayBadge.innerHTML = `<i class="fas fa-check-circle"></i> ${WEEKLY_SPECIALS[todayIndex].name} (Today's Choice)`;
        dayBadge.style.backgroundColor = 'var(--accent-rust)';
        dayBadge.style.color = '#FFFFFF';
      }
    }
  });
}

/* --------------------------------------------------------------------------
   2. MORNING / EVENING MENU TAB TOGGLE
   -------------------------------------------------------------------------- */
function initMenuTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all tabs
      tabBtns.forEach(b => b.classList.remove('active'));
      
      // Set active to clicked tab
      btn.classList.add('active');
      const selectedMeal = btn.getAttribute('data-meal-tab');

      // Filter cards smoothly
      menuCards.forEach(card => {
        const mealType = card.getAttribute('data-meal-type');
        if (selectedMeal === 'all' || mealType === 'both' || mealType === selectedMeal) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

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
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}
