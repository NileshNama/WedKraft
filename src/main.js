import { initParticles } from './particles.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Initialize Particle Canvas Background
  initParticles();

  // 3. Clean URL Helper (removes hashes like #hero or /#hero/ from address bar)
  const cleanUrlAddressBar = () => {
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  // Ensure initial page load has a clean URL structure
  cleanUrlAddressBar();

  // 4. Global Smooth Scroll Link Interceptor (Strips hashes for clean URL structure)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').replace('#', '');
      if (!targetId) return;

      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        cleanUrlAddressBar();
      }
    });
  });

  // 5. Image Error Fallback Handler
  const allImages = document.querySelectorAll('img');
  allImages.forEach((img) => {
    img.addEventListener('error', function () {
      if (!this.getAttribute('data-fallback-applied')) {
        this.setAttribute('data-fallback-applied', 'true');
        this.src = '/wedkraft_varmala_pyro.jpg';
      }
    });
  });

  // 6. Section Reveal Animation on Scroll (Unique Unveil Effect)
  const sections = document.querySelectorAll('.scroll-reveal');
  const trackerDots = document.querySelectorAll('.tracker-dot');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');

          const sectionId = entry.target.getAttribute('id');
          trackerDots.forEach((dot) => {
            if (dot.getAttribute('data-target') === sectionId) {
              dot.classList.add('active');
            } else {
              dot.classList.remove('active');
            }
          });
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach((section) => {
    revealObserver.observe(section);
  });

  // 7. Side Tracker Navigation Clicks
  trackerDots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = dot.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        cleanUrlAddressBar();
      }
    });
  });

  // 8. Scroll Unveil Next Section Hint Button
  const scrollNextTrigger = document.getElementById('scroll-next-trigger');
  if (scrollNextTrigger) {
    scrollNextTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      const introSection = document.getElementById('intro');
      if (introSection) {
        introSection.scrollIntoView({ behavior: 'smooth' });
        cleanUrlAddressBar();
      }
    });
  }

  // 9. Header Scroll Backdrop Shift
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 10. Mobile Drawer Navigation
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('hidden');
    });

    closeDrawerBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('hidden');
    });

    const drawerLinks = document.querySelectorAll('.drawer-link');
    drawerLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.replace('#', '');
          const targetElem = document.getElementById(targetId);
          if (targetElem) {
            targetElem.scrollIntoView({ behavior: 'smooth' });
            cleanUrlAddressBar();
          }
        }
        mobileDrawer.classList.add('hidden');
      });
    });
  }

  // 11. Custom Video Player Controls (Reels Showcase)
  const setupVideoControl = (playBtnId, videoId) => {
    const playBtn = document.getElementById(playBtnId);
    const video = document.getElementById(videoId);

    if (playBtn && video) {
      playBtn.addEventListener('click', () => {
        if (video.paused) {
          video.play();
          playBtn.innerHTML = '<i data-lucide="pause"></i>';
          playBtn.style.opacity = '0.3';
        } else {
          video.pause();
          playBtn.innerHTML = '<i data-lucide="play"></i>';
          playBtn.style.opacity = '1';
        }
        if (window.lucide) window.lucide.createIcons();
      });

      video.addEventListener('play', () => {
        playBtn.style.opacity = '0.3';
      });

      video.addEventListener('pause', () => {
        playBtn.style.opacity = '1';
      });
    }
  };

  setupVideoControl('play-video-1', 'showcase-video-1');
  setupVideoControl('play-video-2', 'showcase-video-2');

  // 12. Countdown Timer Setup (Target: 60 Days from today)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 60);

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minsEl = document.getElementById('mins');
  const secsEl = document.getElementById('secs');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) return;

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(m).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(s).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 13. Planner Modal Drawer Handling
  const modal = document.getElementById('planner-modal');
  const openPlannerBtn = document.getElementById('open-planner-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');

  const openModal = () => {
    if (modal) modal.classList.remove('hidden');
  };

  const closeModal = () => {
    if (modal) modal.classList.add('hidden');
  };

  if (openPlannerBtn) openPlannerBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // 14. Modal Form Submission
  const inquiryForm = document.getElementById('inquiry-form');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const clientName = document.getElementById('client-name').value;

      if (window.confetti) {
        window.confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#D4AF37', '#E6C687', '#FFFFFF', '#0F261C']
        });
      }

      alert(`Warm greetings, ${clientName}! Your private event inquiry has been received by WedKraft Event & Production House (@wedkraftevent). Our team will reach out to you shortly.`);

      inquiryForm.reset();
      closeModal();
    });
  }

  // 15. Full Page Contact Form Submission
  const pageContactForm = document.getElementById('page-contact-form');
  const contactFeedback = document.getElementById('contact-feedback');

  if (pageContactForm) {
    pageContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-main-email').value;

      if (window.confetti) {
        window.confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#E6C687', '#FFFFFF', '#0F261C']
        });
      }

      if (contactFeedback) {
        contactFeedback.innerHTML = `✨ <strong>Thank you, ${name}!</strong> Your booking request has been successfully transmitted to the senior production strategists at WedKraft Event & Production House (@wedkraftevent). A confirmation has been sent to <em>${email}</em>.`;
        contactFeedback.className = 'form-feedback-box success';
        contactFeedback.classList.remove('hidden');

        setTimeout(() => {
          contactFeedback.classList.add('hidden');
        }, 8000);
      }

      pageContactForm.reset();
    });
  }
});
