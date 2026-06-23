/* ============================================
   HARDWARE SERVICES - MAIN SCRIPT
   Handles: mobile nav, FAQ accordion, FAQ search
============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- MOBILE NAV TOGGLE ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('show');
    });

    // close menu when a link is clicked (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('show');
      });
    });
  }

  /* ---------- FAQ ACCORDION ---------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', function () {
      const isActive = item.classList.contains('active');

      // close all
      faqItems.forEach(function (i) {
        i.classList.remove('active');
      });

      // open clicked one (unless it was already open -> toggle closed)
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  /* ---------- FAQ SEARCH FILTER ---------- */
  const faqSearch = document.getElementById('faqSearch');
  const noResults = document.getElementById('noResults');

  if (faqSearch) {
    faqSearch.addEventListener('input', function () {
      const term = faqSearch.value.trim().toLowerCase();
      let visibleCount = 0;

      faqItems.forEach(function (item) {
        const text = item.textContent.toLowerCase();
        if (text.includes(term)) {
          item.style.display = '';
          visibleCount++;
        } else {
          item.style.display = 'none';
          item.classList.remove('active');
        }
      });

      if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  }

  /* ---------- ACTIVE NAV LINK HIGHLIGHT ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });

});
