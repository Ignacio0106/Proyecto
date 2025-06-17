document.addEventListener('DOMContentLoaded', function() {
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.2, // El elemento será visible en un 20% antes de animarse
        rootMargin: "0px 0px -50px 0px" // Reduce el tamaño del viewport inferior en 50px
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appeared'); // Añade una nueva clase 'appeared'
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // ... (código existente para faders) ...

    const header = document.querySelector('.main-header');
    const scrollThreshold = 50; // Cantidad de scroll en px para activar el cambio

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});