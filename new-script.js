document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  const revealElements = document.querySelectorAll('.reveal');
  const contactForm = document.getElementById('contactForm');

  // NAVBAR SCROLL EFFECT
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  // ACTIVE NAV LINK ON SCROLL
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = 'var(--primary)';
      }
    });
  });

  // REVEAL ON SCROLL
  const revealOnScroll = () => {
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (elementTop < windowHeight - 100) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check

  // SMOOTH SCROLL FOR NAV LINKS
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.offsetTop - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // CONTACT FORM
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      // Create mailto link
      const subject = `Portfolio Inquiry from ${name}`;
      const body = `Name: ${name}%0AEmail: ${email}%0A%0AMessage:%0A${message}`;
      window.location.href = `mailto:johnkurt.santander@email.com?subject=${subject}&body=${body}`;

      contactForm.reset();
    });
  }

  // COUNTER ANIMATION (for hero stats)
  const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const text = counter.textContent;
      const hasPlus = text.includes('+');
      const hasPercent = text.includes('%');
      const target = parseInt(text.replace(/[^0-9]/g, ''));

      if (isNaN(target)) return;

      let current = 0;
      const increment = target / 50;
      const duration = 1500;
      const stepTime = duration / 50;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          let display = Math.floor(current);
          if (hasPlus) display += '+';
          if (hasPercent) display += '%';
          counter.textContent = display;
          setTimeout(updateCounter, stepTime);
        } else {
          counter.textContent = text;
        }
      };

      updateCounter();
    });
  };

  // Trigger counter animation when hero is visible
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(heroSection);
  }
});
