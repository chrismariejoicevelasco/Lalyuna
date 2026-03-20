document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Navbar background change on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Optional: Stop observing once animated
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
  animatedElements.forEach(el => {
    // initially add opacity 0 class if it's not present (handled in CSS but good practice)
    el.classList.add('opacity-0');
    observer.observe(el);
  });

  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Highlight active nav link based on current page
  const navItems = document.querySelectorAll('.nav-links a');
  let currentPath = window.location.pathname;
  // Handle local file protocol edge cases
  if (currentPath.includes('index.html')) currentPath = 'index.html';
  else if (currentPath.includes('about.html')) currentPath = 'about.html';
  else if (currentPath.includes('skills.html')) currentPath = 'skills.html';
  else if (currentPath.includes('projects.html')) currentPath = 'projects.html';
  else if (currentPath.includes('contact.html')) currentPath = 'contact.html';
  else if (currentPath.includes('privacypolicy.html')) currentPath = 'privacypolicy.html';

  navItems.forEach(item => {
    item.classList.remove('active');
    const href = item.getAttribute('href');
    if (currentPath.endsWith(href)) {
      item.classList.add('active');
    }
  });

  // If we are on root or directory root, make "Home" active
  if (currentPath.endsWith('/') || currentPath.endsWith('v1') || currentPath.endsWith('v1/') || currentPath === '') {
    const homeLink = document.querySelector('.nav-links a[href="index.html"]');
    if (homeLink) homeLink.classList.add('active');
  }
});

