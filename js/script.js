document.addEventListener('DOMContentLoaded', () => {
    // --- AOS Initialization ---
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // --- DARK MODE LOGIC ---
    const body = document.body;
    const themeToggle = document.getElementById('checkbox');
    const localStorageKey = 'darkModeEnabled';

    // 1. Load saved preference
    const isDarkMode = localStorage.getItem(localStorageKey) === 'true';

    // Apply initial theme
    if (isDarkMode) {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    } else {
        body.classList.remove('dark-mode');
        themeToggle.checked = false;
    }

    // 2. Handle toggle click
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem(localStorageKey, 'true');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem(localStorageKey, 'false');
        }
    });
    // --- END DARK MODE LOGIC ---


    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            const menuToggle = document.querySelector('.menu-toggle');
            const nav = document.querySelector('.nav');
            if (menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#hero') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = document.querySelector('.header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset - 20;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveLink = () => {
        let current = '';
        const headerOffset = document.querySelector('.header').offsetHeight;
        const scrollPosition = window.scrollY + headerOffset + 50; 

        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition) {
                current = '#' + section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // --- Header Scroll Effect ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && nav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        }
    });
// --- Blokir Klik Kanan (Context Menu) ---
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    // Opsional: tampilkan pesan peringatan
    alert("Mau tau aja, atau mau tau bangeeeet?."); 
});

});