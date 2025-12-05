// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add fade-in class to elements and observe them
const elementsToAnimate = document.querySelectorAll('.feature-card, .gallery-item, .philosophy-item, .program-item, .gallery-item-bottom');
elementsToAnimate.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// CTA Button interactions
document.querySelectorAll('.cta-button, .cta-button-large').forEach(button => {
  button.addEventListener('click', () => {
    // Add your booking/contact form logic here
    alert('体験予約のお問い合わせありがとうございます。お電話またはメールにてご連絡ください。');
  });
});

// Gallery image hover effects
document.querySelectorAll('.gallery-item img, .gallery-item-bottom img').forEach(img => {
  img.addEventListener('mouseenter', () => {
    img.style.filter = 'brightness(1.1) contrast(1.1)';
  });
  
  img.addEventListener('mouseleave', () => {
    img.style.filter = 'brightness(1) contrast(1)';
  });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero-image img');
  if (heroImage) {
    heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Add scroll-triggered animations for text elements
const textElements = document.querySelectorAll('h1, h2, h3, p');
textElements.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Image lazy loading fallback for older browsers
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Add subtle animations to feature cards
document.querySelectorAll('.feature-card').forEach((card, index) => {
  card.style.animationDelay = `${index * 0.2}s`;
});

// Enhance program items with stagger animation
document.querySelectorAll('.program-item').forEach((item, index) => {
  item.style.animationDelay = `${index * 0.15}s`;
});
