document.addEventListener('DOMContentLoaded', function() {
    // Creiamo dinamicamente l'elemento splash screen
    const splashScreen = document.createElement('div');
    splashScreen.className = 'splash-screen';
    
    // Creiamo il logo (assumendo che tu abbia un'immagine del logo)
    const logo = document.createElement('img');
    logo.className = 'splash-logo';
    logo.src = 'path/to/your/logo.png'; // Sostituisci con il percorso corretto al tuo logo
    logo.alt = 'Logo';
    
    // Aggiungiamo il logo alla splash screen
    splashScreen.appendChild(logo);
    
    // Aggiungiamo la splash screen al body come primo elemento
    document.body.prepend(splashScreen);
    
    // Dopo l'animazione, rimuoviamo l'elemento dalla DOM
    setTimeout(() => {
        splashScreen.addEventListener('animationend', function() {
            splashScreen.remove();
        });
    }, 1500); // 1.5 secondi come durata dell'animazione
});

// Manteniamo il resto dello script originale
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
