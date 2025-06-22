// Configuração do Intersection Observer para animações de fade-in
function setupIntersectionObservers() {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  });

  const galleryObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target); // Para não disparar múltiplas vezes
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

// Efeito da navbar ao fazer scroll
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

// Lightbox para imagens da galeria
function setupGalleryLightbox() {
  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function () {
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `
        <span class="close" aria-label="Fechar">&times;</span>
        <img class="modal-content" src="${this.src}" alt="${this.alt}">
      `;
      document.body.appendChild(modal);

      // Mostrar modal
      modal.style.display = 'block';

      // Fechar modal
      const closeModal = () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
      };

      modal.querySelector('.close').addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    });
  });
}

// Pausa vídeos que saem da viewport
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

// Toggle overlay dos vídeos da galeria (esconder overlay quando vídeo toca)
function setupVideoOverlayToggle() {
  document.querySelectorAll('.gallery-video').forEach(video => {
    const container = video.closest('.video-container');
    if (!container) return;

    const overlay = container.querySelector('.overlay');
    if (!overlay) return;

    const hideOverlay = () => {
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
    };

    const showOverlay = () => {
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = 'auto';
    };

    video.addEventListener('play', hideOverlay);
    video.addEventListener('pause', showOverlay);
    video.addEventListener('ended', showOverlay);

    // Touch events para mobile
    video.addEventListener('touchstart', hideOverlay);
    video.addEventListener('touchend', () => {
      if (video.paused || video.ended) {
        showOverlay();
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

// Inicialização após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
  setupIntersectionObservers();
  setupNavbarScrollEffect();
  setupGalleryLightbox();
  setupVideoControls();
  setupVideoOverlayToggle();
  setupSmoothScroll();

  // Definir volume inicial de vídeos da galeria para som baixo
  document.querySelectorAll('.gallery-video').forEach(video => {
    video.volume = 0.05;
  });

  // Controle do menu mobile
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Fecha o menu ao clicar em qualquer link dentro dele (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
});
