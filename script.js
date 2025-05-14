// Header che si riduce allo scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const logo = document.querySelector('.logo');
    if (window.scrollY > 100) {
        header.classList.add('shrink');
        logo.classList.add('shrink'); // Aggiunta riduzione logo al scroll
    } else {
        header.classList.remove('shrink');
        logo.classList.remove('shrink'); // Rimuovi la riduzione del logo
    }
});

// Smooth scroll con offset per l'header
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const headerHeight = document.querySelector('.header').offsetHeight;

        window.scrollTo({
            top: targetSection.offsetTop - headerHeight,
            behavior: 'smooth'
        });
    });
});

// Intersection Observer per gli elementi attivi
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScroll && currentScroll > 100) {
    header.classList.add('hide-header');
  } else {
    header.classList.remove('hide-header');
  }

  lastScroll = currentScroll;
});
