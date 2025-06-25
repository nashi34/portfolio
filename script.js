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

  // Corrigido o seletor .projects
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

function setupVideoPlayButton() {
  document.querySelectorAll('.video-container').forEach(container => {
    const video = container.querySelector('video');
    const playButton = container.querySelector('.play-button');

    if (!video || !playButton) return;

    // Clique no botão play
    playButton.addEventListener('click', e => {
      e.stopPropagation();  // impede clique passar para o vídeo
      video.play();
      playButton.style.display = 'none';
    });

    // Clique direto no vídeo
    video.addEventListener('click', () => {
      video.play();
      if (playButton.style.display !== 'none') {
        playButton.style.display = 'none';
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

// Inicialização dos - videos - sons
document.addEventListener('DOMContentLoaded', function () {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const screenWidth = window.innerWidth;

  let volume = 0.1; // valor padrão para desktop

  if (/android/i.test(userAgent)) {
    if (screenWidth <= 768) {
      volume = 0.4; // tlmvl Android
    } else {
      volume = 0.25; // tablet Android
    }
  } else if (/iPad|Tablet/i.test(userAgent)) {
    volume = 0.25; // iPad ou tablets em geral
  } else if (/iPhone/i.test(userAgent)) {
    volume = 0.4; // iPhone
  } else if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) {
    volume = 0.25; // iPad com iPadOS detectado como Mac
  }

  document.querySelectorAll('.logo-video').forEach(function (video) {
    video.addEventListener('play', function () {
      video.volume = volume;
    }, { once: true });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // ou 'open', conforme seu CSS
  });
});


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.video-container').forEach(container => {
    const video = container.querySelector('video');
    const button = container.querySelector('.play-button');

    if (!video || !button) return;

    button.addEventListener('click', () => {
      video.play();
      button.style.display = 'none';
    });

    video.addEventListener('play', () => {
      button.style.display = 'none';
    });

    video.addEventListener('pause', () => {
      button.style.display = 'flex';
    });

    video.addEventListener('ended', () => {
      button.style.display = 'flex';
    });
  });
});