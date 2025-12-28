// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const country = document.getElementById('country').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validation
    if (!email || !phone || !message) {
        if (formMessage) showFormMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        if (formMessage) showFormMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) {
        if (formMessage) showFormMessage('Please enter a valid phone number.', 'error');
        return;
    }
    
    // Simulate form submission
    if (formMessage) showFormMessage('Sending message...', 'success');
    
    // In a real application, you would send this data to a server
    setTimeout(() => {
        if (formMessage) {
            showFormMessage('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        if (contactForm) contactForm.reset();
    }, 1000);
});
}

function showFormMessage(message, type) {
    if (!formMessage) return;
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Auto-hide after 5 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            if (formMessage) formMessage.style.display = 'none';
        }, 5000);
    }
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .product-card, .testimonial-card, .cert-card, .destination-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.floor(target) + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                if (target && !stat.dataset.animated) {
                    stat.dataset.animated = 'true';
                    stat.textContent = '0+';
                    animateCounter(stat, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add active class to current section in navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    const scrollY = window.pageYOffset;
    const headerHeight = document.querySelector('.header').offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 50;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = sectionId;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Performance: Debounce scroll events
let ticking = false;
function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateActiveNav();
            ticking = false;
        });
        ticking = true;
    }
}

// Use debounced scroll event
window.addEventListener('scroll', onScroll, { passive: true });
updateActiveNav();

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// Enhanced Scroll Animations with Intersection Observer
const scrollObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger animation for multiple elements (subtle delay)
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, Math.min(index * 50, 300)); // Cap delay at 300ms
            scrollObserver.unobserve(entry.target);
        }
    });
}, scrollObserverOptions);

// Initialize scroll animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to sections
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            section.classList.add('fade-in-left');
        } else {
            section.classList.add('fade-in-right');
        }
        scrollObserver.observe(section);
    });

    // Animate cards with stagger effect
    const cards = document.querySelectorAll('.feature-card, .product-card, .testimonial-card, .cert-card, .destination-card, .service-item');
    cards.forEach((card, index) => {
        card.classList.add('fade-in-up');
        scrollObserver.observe(card);
    });

    // Animate section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.classList.add('fade-in-up');
        scrollObserver.observe(header);
    });
});

// Optimize images: Lazy load with intersection observer
if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers without native lazy loading
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Mobile-specific optimizations
if (window.innerWidth <= 768) {
    // Reduce animation complexity on mobile
    const style = document.createElement('style');
    style.textContent = `
        * {
            animation-duration: 0.3s !important;
            transition-duration: 0.3s !important;
        }
    `;
    document.head.appendChild(style);
}

// Preload critical resources
const preloadLink = document.createElement('link');
preloadLink.rel = 'preload';
preloadLink.as = 'style';
preloadLink.href = 'styles.css';
document.head.appendChild(preloadLink);

