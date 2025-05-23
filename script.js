// Header che si riduce o scompare allo scroll
let lastScroll = 0;
const header = document.querySelector('.header');
const logo = document.querySelector('.logo');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Header shrink
    if (currentScroll > 100) {
        header.classList.add('shrink');
        logo.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
        logo.classList.remove('shrink');
    }

    // Header hide on scroll down
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('hide-header');
    } else {
        header.classList.remove('hide-header');
    }

    lastScroll = currentScroll;
});

// Smooth scroll solo per i link interni (es. #about)
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const headerHeight = document.querySelector('.header').offsetHeight;

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer per attivare il link corrente nel menu
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

function toggleSidebar() {
  const sidebar = document.getElementById('mobileSidebar');
  sidebar.classList.toggle('active');
}
