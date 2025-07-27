// Enhanced Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    console.log('Hamburger clicked');
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Toggle body scroll
    if (navMenu.classList.contains('active')) {
        body.classList.add('menu-open');
        console.log('Menu opened');
    } else {
        body.classList.remove('menu-open');
        console.log('Menu closed');
    }
});

// Close menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Nav link clicked');
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('menu-open');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
            console.log('Menu closed by outside click');
        }
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('menu-open');
        console.log('Menu closed by escape key');
    }
});

// Prevent menu from closing when clicking inside menu
navMenu.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add staggered animation for child elements
            const children = entry.target.querySelectorAll('.project-card, .work-card, .stat-item');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.project-card, .work-card, .stat-item, .section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Enhanced hover effects for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.03)';
        card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    });
});

// Enhanced hover effects for work cards
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px)';
        card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
        card.style.background = 'rgba(255, 255, 255, 0.08)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        card.style.background = 'rgba(255, 255, 255, 0.05)';
    });
});

// Enhanced button click effects with ripple
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Enhanced parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-orb');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.02}deg)`;
    });
    
    // Parallax for large text overlay
    const largeText = document.querySelector('.large-name');
    if (largeText) {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        largeText.style.transform = `translateY(${yPos}px)`;
    }
});

// Enhanced typing animation with better timing
const typingText = document.getElementById('typing-text');
const cursor = document.querySelector('.cursor');
const textToType = "Hey, it's Seif";
const secondText = "Creative Developer";
let currentText = "";
let currentIndex = 0;
let isTyping = true;
let isSecondText = false;

function typeText() {
    console.log('Starting typing animation...');
    if (isTyping) {
        if (currentIndex < textToType.length) {
            currentText += textToType[currentIndex];
            typingText.textContent = currentText;
            console.log('Typing:', currentText);
            currentIndex++;
            setTimeout(typeText, 120); // Slightly slower for better readability
        } else {
            console.log('First text complete, starting second text...');
            // Wait a bit before starting the second text
            setTimeout(() => {
                isSecondText = true;
                currentText = "";
                currentIndex = 0;
                typeSecondText();
            }, 1500); // Longer pause
        }
    }
}

function typeSecondText() {
    if (currentIndex < secondText.length) {
        currentText += secondText[currentIndex];
        typingText.textContent = currentText;
        console.log('Typing second text:', currentText);
        currentIndex++;
        setTimeout(typeSecondText, 100);
    } else {
        console.log('Typing animation complete');
        // Keep the cursor blinking
        setTimeout(() => {
            cursor.style.animation = 'blink 1s infinite';
        }, 500);
    }
}

// Enhanced page load animation
window.addEventListener('load', () => {
    console.log('Page loaded, starting enhanced animations...');
    
    // Ensure the typing text element is visible
    if (typingText) {
        typingText.style.opacity = '1';
        typingText.style.visibility = 'visible';
        typingText.style.color = 'white';
        typingText.style.fontWeight = '700';
        typingText.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';
    }
    if (cursor) {
        cursor.style.opacity = '1';
        cursor.style.visibility = 'visible';
        cursor.style.color = '#4ecdc4';
        cursor.style.fontWeight = '700';
        cursor.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';
    }
    
    // Start typing animation with delay
    setTimeout(typeText, 800);
    
    // Animate background orbs
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        setTimeout(() => {
            orb.style.opacity = '1';
            orb.style.transform = 'scale(1)';
        }, index * 300);
    });
});

// Enhanced navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = 'none';
    }
});

// Enhanced skill tags animation
document.querySelectorAll('.tech-tag, .work-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
        this.style.boxShadow = '0 5px 15px rgba(255, 107, 107, 0.3)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
    });
});

// Add CSS for enhanced ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .gradient-orb {
        opacity: 0;
        transform: scale(0.8);
        transition: all 1s ease;
    }
`;
document.head.appendChild(style);

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Skill tags animation
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Timeline item animations
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
});

// Contact form validation (if you add a form later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Smooth reveal animations for sections
const revealSections = document.querySelectorAll('section');

const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section--visible');
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

revealSections.forEach(section => {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});

// Add CSS for section animations
const style = document.createElement('style');
style.textContent = `
    .section--hidden {
        opacity: 0;
        transform: translateY(8rem);
        transition: all 1s;
    }
    
    .section--visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(style);

// Counter animation for statistics (if you add them)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Initialize counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
});

// Observe counter elements (add data-target attribute to elements you want to animate)
document.querySelectorAll('[data-target]').forEach(counter => {
    counterObserver.observe(counter);
});

// Add smooth scroll behavior for all browsers
if ('scrollBehavior' in document.documentElement.style) {
    // Browser supports smooth scrolling
} else {
    // Fallback for older browsers
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add cursor trail effect (optional)
let mouseX = 0;
let mouseY = 0;
let cursorTrail = [];

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Create trail effect
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = mouseX + 'px';
    trail.style.top = mouseY + 'px';
    document.body.appendChild(trail);
    
    cursorTrail.push(trail);
    
    // Remove old trails
    if (cursorTrail.length > 10) {
        const oldTrail = cursorTrail.shift();
        oldTrail.remove();
    }
    
    // Animate trail
    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(0)';
    }, 100);
});

// Add CSS for cursor trail
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor-trail {
        position: fixed;
        width: 6px;
        height: 6px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.7;
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(cursorStyle);

console.log('Portfolio website loaded successfully! 🚀'); 