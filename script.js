// --- JS completo atualizado ---

// Configuração do Intersection Observer para animações de fade-in
function setupIntersectionObservers() {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  });

  const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        galleryObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.projects, .about, .contact').forEach(el => {
    sectionObserver.observe(el);
  });

  document.querySelectorAll('.gallery-item').forEach(el => {
    galleryObserver.observe(el);
  });
}

function setupNavbarScrollEffect() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

function setupGalleryLightbox() {
  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function () {
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `
        <span class="close">&times;</span>
        <img class="modal-content" src="${this.src}" alt="${this.alt}">
      `;
      document.body.appendChild(modal);

      modal.style.display = 'block';

      const closeModal = () => {
        modal.style.display = 'none';
        setTimeout(() => modal.remove(), 300);
      };

      modal.querySelector('.close').addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    });
  });
}

function setupVideoControls() {
  document.querySelectorAll('.gallery-video').forEach(video => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting && !video.paused) {
          video.pause();
        }
      });
    }, { threshold: 0.1 });
    observer.observe(video);
  });
}

function setupVideoOverlayToggle() {
  document.querySelectorAll('.gallery-video').forEach(video => {
    const container = video.closest('.image-container');
    if (!container) return;

    const overlay = container.querySelector('.overlay');
    if (!overlay) return;

    video.addEventListener('play', () => {
      overlay.classList.add('hidden');
    });

    video.addEventListener('pause', () => {
      overlay.classList.remove('hidden');
    });

    video.addEventListener('ended', () => {
      overlay.classList.remove('hidden');
    });

    // Opcional para mobile touch
    video.addEventListener('touchstart', () => {
      overlay.classList.add('hidden');
    });

    video.addEventListener('touchend', () => {
      if (video.paused || video.ended) {
        overlay.classList.remove('hidden');
      }
    });
  });
}

// Scroll suave com animação para links do menu
function setupSmoothScroll() {
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      this.classList.add('menu-click-animation');
      setTimeout(() => this.classList.remove('menu-click-animation'), 500);

      smoothScrollTo(targetElement);
    });
  });
}

function smoothScrollTo(targetElement) {
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 600;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  setupIntersectionObservers();
  setupNavbarScrollEffect();
  setupGalleryLightbox();
  setupVideoControls();
  setupVideoOverlayToggle(); // <-- nova função chamada aqui
  setupSmoothScroll();

  // Definir volume inicial de vídeo logo apenas ao tocar
  document.querySelectorAll('.logo-video').forEach(video => {
    video.addEventListener('play', () => {
      if (video.volume > 0.1) {
        video.volume = 0.1;
      }
    }, { once: true });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
});
