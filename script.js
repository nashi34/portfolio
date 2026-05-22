const translations = {
  'pt-PT': {
    'meta.title': 'Portefólio | David Lopes',
    'meta.description': 'Portefólio de David Lopes, front-end developer, UI designer e engenheiro multimédia.',
    'nav.aria': 'Navegação principal',
    'nav.menu': 'Abrir menu',
    'nav.home': 'Início',
    'nav.projects': 'Projetos',
    'nav.contacts': 'Contactos',
    'language.current': 'PT',
    'language.next': 'EN',
    'language.toggleAria': 'Switch to English',
    'hero.eyebrow': 'Front-End Development / UI Design / Multimédia',
    'hero.title': 'Olá, sou o David.',
    'hero.kicker': 'Front-end developer e UI designer com background em Engenharia de Multimédia.',
    'hero.text': 'Gosto de transformar ideias em interfaces claras, modernas e fáceis de usar, com atenção ao detalhe visual e à experiência do utilizador.',
    'hero.projectsCta': 'Ver projetos',
    'hero.contactCta': 'Contactar',
    'hero.panelAria': 'Resumo profissional',
    'hero.portraitLabel': 'Disponível para projetos criativos',
    'hero.areaLabel': 'Área',
    'hero.focusLabel': 'Foco',
    'hero.focusValue': 'Web design',
    'projects.eyebrow': 'Portefólio',
    'projects.title': 'Projetos selecionados',
    'projects.bannerAria': 'Abrir Banner Promocional TW',
    'projects.cubeAria': 'Abrir Cubo Rubik 3D',
    'projects.brandBookAria': 'Abrir Brand Book PDF',
    'projects.final.title': 'Onboarding do Projeto Final',
    'projects.final.text': 'Vídeo demonstrativo para apresentar o fluxo e a experiência do projeto final.',
    'projects.banner.title': 'Banner Promocional TW',
    'projects.banner.text': 'Design gráfico com foco em composição, tipografia e identidade visual.',
    'projects.logo.title': 'Logo Animado TW',
    'projects.logo.text': 'Animação de marca para reforçar movimento e personalidade visual.',
    'projects.cube.text': 'Render 3D com materiais, luz e composição visual para apresentação.',
    'projects.mobile.title': 'Projeto Mobile Ad',
    'projects.mobile.text': 'Formato vertical pensado para ritmo, leitura rápida e redes sociais.',
    'projects.report.title': 'Relatório Técnico',
    'projects.report.text': 'Documento completo com estrutura, identidade e decisão visual do projeto.',
    'tags.multimedia': 'Multimédia',
    'tags.video': 'Vídeo',
    'tags.animation': 'Animação',
    'tags.report': 'Relatório',
    'tags.documentation': 'Documentação',
    'contact.title': 'Vamos falar?',
    'footer.rights': '© 2025 David Lopes. Todos os direitos reservados.'
  },
  en: {
    'meta.title': 'Portfolio | David Lopes',
    'meta.description': 'Portfolio of David Lopes, front-end developer, UI designer and multimedia engineer.',
    'nav.aria': 'Main navigation',
    'nav.menu': 'Open menu',
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.contacts': 'Contact',
    'language.current': 'EN',
    'language.next': 'PT',
    'language.toggleAria': 'Mudar para português',
    'hero.eyebrow': 'Front-End Development / UI Design / Multimedia',
    'hero.title': 'Hi, I’m David.',
    'hero.kicker': 'Front-end developer and UI designer with a Multimedia Engineering background.',
    'hero.text': 'I like turning ideas into clear, modern and easy-to-use interfaces, with care for visual detail and user experience.',
    'hero.projectsCta': 'View projects',
    'hero.contactCta': 'Contact me',
    'hero.panelAria': 'Professional summary',
    'hero.portraitLabel': 'Available for creative projects',
    'hero.areaLabel': 'Area',
    'hero.focusLabel': 'Focus',
    'hero.focusValue': 'Web design',
    'projects.eyebrow': 'Portfolio',
    'projects.title': 'Selected projects',
    'projects.bannerAria': 'Open TW Promotional Banner',
    'projects.cubeAria': 'Open 3D Rubik Cube',
    'projects.brandBookAria': 'Open Brand Book PDF',
    'projects.final.title': 'Final Project Onboarding',
    'projects.final.text': 'Demo video presenting the flow and experience of the final project.',
    'projects.banner.title': 'TW Promotional Banner',
    'projects.banner.text': 'Graphic design focused on composition, typography and visual identity.',
    'projects.logo.title': 'TW Animated Logo',
    'projects.logo.text': 'Brand animation created to reinforce motion and visual personality.',
    'projects.cube.text': '3D render with materials, lighting and visual composition for presentation.',
    'projects.mobile.title': 'Mobile Ad Project',
    'projects.mobile.text': 'Vertical format designed for rhythm, quick reading and social media.',
    'projects.report.title': 'Technical Report',
    'projects.report.text': 'Complete document covering structure, identity and visual decisions for the project.',
    'tags.multimedia': 'Multimedia',
    'tags.video': 'Video',
    'tags.animation': 'Animation',
    'tags.report': 'Report',
    'tags.documentation': 'Documentation',
    'contact.title': 'Let’s talk?',
    'footer.rights': '© 2025 David Lopes. All rights reserved.'
  }
};

function setLanguage(language) {
  const dictionary = translations[language] || translations['pt-PT'];

  document.documentElement.lang = language;
  document.title = dictionary['meta.title'];

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  document.querySelectorAll('[data-i18n-attr]').forEach((element) => {
    element.dataset.i18nAttr.split(',').forEach((pair) => {
      const [attribute, key] = pair.split(':').map((value) => value.trim());
      if (attribute && dictionary[key]) {
        element.setAttribute(attribute, dictionary[key]);
      }
    });
  });

  const toggle = document.querySelector('[data-lang-toggle]');
  toggle?.setAttribute('aria-label', dictionary['language.toggleAria']);
  localStorage.setItem('portfolio-language', language);
}

function setupLanguageToggle() {
  const toggle = document.querySelector('[data-lang-toggle]');
  if (!toggle) return;

  const savedLanguage = localStorage.getItem('portfolio-language');
  const initialLanguage = savedLanguage === 'en' ? 'en' : 'pt-PT';
  setLanguage(initialLanguage);

  toggle.addEventListener('click', () => {
    const nextLanguage = document.documentElement.lang === 'en' ? 'pt-PT' : 'en';
    setLanguage(nextLanguage);
  });
}

function setupMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function setupRevealAnimations() {
  const items = document.querySelectorAll('.reveal, .project-card, .skill-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  items.forEach((item) => {
    item.classList.add('reveal');
    observer.observe(item);
  });
}

function setupImageModal() {
  document.querySelectorAll('button.image-button img').forEach((img) => {
    img.closest('button').addEventListener('click', () => {
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `
        <button class="close" type="button" aria-label="Fechar">&times;</button>
        <img class="modal-content" src="${img.src}" alt="${img.alt}">
      `;

      document.body.appendChild(modal);

      const closeModal = () => modal.remove();
      modal.querySelector('.close').addEventListener('click', closeModal);
      modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
      });
      document.addEventListener('keydown', function closeOnEscape(event) {
        if (event.key === 'Escape') {
          closeModal();
          document.removeEventListener('keydown', closeOnEscape);
        }
      });
    });
  });
}

function setupVideos() {
  const videos = document.querySelectorAll('.gallery-video');

  videos.forEach((video) => {
    video.muted = true;

    video.addEventListener('click', () => {
      video.muted = true;
      if (video.paused) {
        video.play();
      }
    });

    video.addEventListener('play', () => {
      video.muted = true;

      videos.forEach((otherVideo) => {
        if (otherVideo !== video && !otherVideo.paused) {
          otherVideo.pause();
        }
      });
    });

  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupLanguageToggle();
  setupMenu();
  setupRevealAnimations();
  setupImageModal();
  setupVideos();
});
