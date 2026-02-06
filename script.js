// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    initSmoothScroll();

    // Project carousel functionality
    initCarousel();

    // Header scroll effect
    initHeaderScroll();

    // Intersection Observer for animations
    initScrollAnimations();

    // Tech badges infinite scroll pause on hover
    initTechBadgesHover();
});

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Project carousel
function initCarousel() {
    const carousel = document.querySelector('.projects-carousel');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if (!carousel || !prevBtn || !nextBtn) return;

    const cards = carousel.querySelectorAll('.project-card');
    if (cards.length === 0) return;

    // Get the width of one card including gap
    function getScrollAmount() {
        const card = cards[0];
        const cardStyle = window.getComputedStyle(card);
        const cardWidth = card.offsetWidth;
        const gap = parseInt(window.getComputedStyle(carousel).gap) || 32;
        return cardWidth + gap;
    }

    // Update button states based on scroll position
    function updateButtonStates() {
        const scrollLeft = carousel.scrollLeft;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;

        prevBtn.style.opacity = scrollLeft <= 10 ? '0.5' : '1';
        prevBtn.style.cursor = scrollLeft <= 10 ? 'default' : 'pointer';

        nextBtn.style.opacity = scrollLeft >= maxScroll - 10 ? '0.5' : '1';
        nextBtn.style.cursor = scrollLeft >= maxScroll - 10 ? 'default' : 'pointer';
    }

    // Scroll to previous card
    prevBtn.addEventListener('click', () => {
        const scrollAmount = getScrollAmount();
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    // Scroll to next card
    nextBtn.addEventListener('click', () => {
        const scrollAmount = getScrollAmount();
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Update button states on scroll
    carousel.addEventListener('scroll', updateButtonStates);

    // Initialize button states
    updateButtonStates();

    // Optional: Enable drag scrolling
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Set initial cursor style
    carousel.style.cursor = 'grab';
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }

        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        header.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        lastScroll = currentScroll;
    });
}

// Scroll animations with Intersection Observer
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.expertise-card, .project-card, .testimonial-card, .about-content, .about-images'
    );

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Tech badges hover pause
function initTechBadgesHover() {
    const techBadges = document.querySelector('.tech-badges');
    if (!techBadges) return;

    techBadges.addEventListener('mouseenter', () => {
        techBadges.style.animationPlayState = 'paused';
    });

    techBadges.addEventListener('mouseleave', () => {
        techBadges.style.animationPlayState = 'running';
    });
}

// Form validation (if contact form exists)
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Basic validation
        let isValid = true;
        const errors = [];

        if (!data.name || data.name.trim() === '') {
            errors.push('Name is required');
            isValid = false;
        }

        if (!data.email || !isValidEmail(data.email)) {
            errors.push('Valid email is required');
            isValid = false;
        }

        if (!data.message || data.message.trim() === '') {
            errors.push('Message is required');
            isValid = false;
        }

        if (isValid) {
            // Submit form (replace with actual submission logic)
            console.log('Form submitted:', data);
            alert('Message sent successfully!');
            form.reset();
        } else {
            alert(errors.join('\n'));
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mobile menu toggle (if implemented)
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}
