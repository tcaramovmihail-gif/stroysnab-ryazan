// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function openMobileMenu() {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', openMobileMenu);
mobileMenuClose.addEventListener('click', closeMobileMenu);

mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close mobile menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Chart animation on scroll
const chartBars = document.querySelectorAll('.chart-bar');

function animateCharts() {
    chartBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            bar.style.width = bar.classList.contains('chart-bar-us') ? '75%' : '100%';
        }
    });
}

window.addEventListener('scroll', animateCharts);
window.addEventListener('load', animateCharts);
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.backgroundColor = 'rgba(30, 58, 95, 0.98)';
    } else {
        header.style.backgroundColor = 'var(--primary)';
    }

    lastScroll = currentScroll;
});

// Form submission (demo)
const applicationForm = document.getElementById('applicationForm');

applicationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(applicationForm);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const message = formData.get('message');

    // Demo: show alert with form data
    alert(`Спасибо, ${name}!\n\nМы получили вашу заявку. Менеджер перезвонит вам по номеру ${phone} в течение 15 минут.\n\nВаш запрос: ${message || 'Не указано'}`);

    applicationForm.reset();
});

// Phone input mask (simple formatting)
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 1) {
        value = '+' + value;
    }

    if (value.length > 2) {
        value = value.slice(0, 2) + ' (' + value.slice(2);
    }
    if (value.length > 7) {
        value = value.slice(0, 7) + ') ' + value.slice(7);
    }
    if (value.length > 12) {
        value = value.slice(0, 12) + '-' + value.slice(12);
    }
    if (value.length > 15) {
        value = value.slice(0, 15) + '-' + value.slice(15);
    }

    e.target.value = value;
});
