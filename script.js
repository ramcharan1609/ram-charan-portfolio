// Shared JavaScript for all portfolio pages.

// Highlight the current page in the navigation.
const currentPage = window.location.pathname.split('/').pop() || 'home.html';
document.querySelectorAll('#navLinks .nav-link').forEach((link) => {
  const targetPage = link.getAttribute('href');
  if (targetPage === currentPage) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }

  // Close the mobile Bootstrap menu after navigation.
  link.addEventListener('click', () => {
    const menu = document.getElementById('navLinks');
    if (menu && menu.classList.contains('show') && window.bootstrap) {
      window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

// Reveal elements when they enter the viewport.
const animatedElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  animatedElements.forEach((element) => observer.observe(element));
} else {
  animatedElements.forEach((element) => element.classList.add('visible'));
}

// Contact page form validation (front-end demo; no backend/email sending).
const form = document.getElementById('contactForm');
if (form) {
  const feedback = document.getElementById('formFeedback');
  const fieldIds = ['contactName', 'contactEmail', 'contactSubject', 'contactMessage'];
  const fields = fieldIds.map((id) => document.getElementById(id)).filter(Boolean);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  fields.forEach((field) => {
    field.addEventListener('input', () => {
      field.setCustomValidity('');
      if (!field.value.trim()) field.setCustomValidity('Required');
      if (field.id === 'contactEmail' && field.value.trim() &&
          !emailPattern.test(field.value.trim())) {
        field.setCustomValidity('Invalid email');
      }
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    fields.forEach((field) => {
      field.setCustomValidity('');
      if (!field.value.trim()) field.setCustomValidity('Required');
    });
    const email = document.getElementById('contactEmail');
    if (email && email.value.trim() && !emailPattern.test(email.value.trim())) {
      email.setCustomValidity('Invalid email');
    }
    form.classList.add('was-validated');
    if (!form.checkValidity()) {
      if (feedback) {
        feedback.className = 'mt-3 text-danger';
        feedback.textContent = 'Please complete all fields and enter a valid email address.';
      }
      return;
    }
    if (feedback) {
      feedback.className = 'mt-3 text-success';
      feedback.textContent = 'Validation successful! This demo does not send messages yet.';
    }
    form.reset();
    form.classList.remove('was-validated');
  });
}

// Keep footer year current on every page.
document.querySelectorAll('.current-year').forEach((node) => {
  node.textContent = new Date().getFullYear();
});
