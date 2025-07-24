// DOM Elements
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const typewriterCode = document.getElementById('typewriter-code');
const typingText = document.querySelector('.typing-text');
const statNumbers = document.querySelectorAll('.stat-number');

// Custom Cursor
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
});

// Smooth cursor follower
function updateCursorFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
    requestAnimationFrame(updateCursorFollower);
}
updateCursorFollower();

// Cursor hover effects
document.querySelectorAll('a, button, .project-card, .skill-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(1.5)';
        cursorFollower.style.transform += ' scale(1.2)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
        cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(1.2)', '');
    });
});

// Navigation scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link
    updateActiveNavLink();
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navigation link click handler
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        scrollToSection(sectionId);
    });
});

// Typewriter effect for hero code
const codeLines = [
    "const developer = {",
    "  name: 'bbinxx',",
    "  role: 'Full-Stack Developer',",
    "  skills: [",
    "    'Node.js', 'React', 'Flutter',",
    "    'MongoDB', 'Express.js'",
    "  ],",
    "  currentFocus: 'Building amazing apps',",
    "  coffee: '☕'.repeat(Infinity),",
    "  passion: 'Creating digital magic'",
    "};"
];

let lineIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typewriterEffect() {
    if (lineIndex < codeLines.length) {
        const currentLine = codeLines[lineIndex];
        
        if (!isDeleting && charIndex < currentLine.length) {
            typewriterCode.textContent += currentLine[charIndex];
            charIndex++;
            setTimeout(typewriterEffect, 50);
        } else if (!isDeleting && charIndex === currentLine.length) {
            if (lineIndex < codeLines.length - 1) {
                typewriterCode.textContent += '\n';
                lineIndex++;
                charIndex = 0;
                setTimeout(typewriterEffect, 200);
            } else {
                // Start over after a pause
                setTimeout(() => {
                    typewriterCode.textContent = '';
                    lineIndex = 0;
                    charIndex = 0;
                    typewriterEffect();
                }, 3000);
            }
        }
    }
}

// Start typewriter effect when page loads
window.addEventListener('load', () => {
    setTimeout(typewriterEffect, 1000);
});

// Typing text animation
const typingTexts = [
    'Full-Stack Developer',
    'Mobile App Developer',
    'Creative Problem Solver',
    'Tech Enthusiast',
    'Code Artisan'
];

let textIndex = 0;
let currentText = '';
let isTyping = true;

function typeText() {
    const targetText = typingTexts[textIndex];
    
    if (isTyping) {
        if (currentText.length < targetText.length) {
            currentText += targetText[currentText.length];
            typingText.textContent = currentText;
            setTimeout(typeText, 100);
        } else {
            isTyping = false;
            setTimeout(typeText, 2000);
        }
    } else {
        if (currentText.length > 0) {
            currentText = currentText.slice(0, -1);
            typingText.textContent = currentText;
            setTimeout(typeText, 50);
        } else {
            isTyping = true;
            textIndex = (textIndex + 1) % typingTexts.length;
            setTimeout(typeText, 500);
        }
    }
}

// Start typing animation
setTimeout(typeText, 2000);

// Counter animation for stats
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            
            // Animate counters when stats section is visible
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
            }
            
            // Add stagger effect for skill items
            if (entry.target.classList.contains('skill-item')) {
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-card, .skill-category, .project-card, .contact-card, .stat-item').forEach(el => {
    observer.observe(el);
});

// Observe stat numbers
statNumbers.forEach(stat => {
    observer.observe(stat);
});

// Initialize skill items for stagger animation
document.querySelectorAll('.skill-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(item);
});

// Hamburger menu toggle
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth scroll for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const onclick = btn.getAttribute('onclick');
        if (onclick && onclick.includes('scrollToSection')) {
            e.preventDefault();
            const sectionId = onclick.match(/'([^']+)'/)[1];
            scrollToSection(sectionId);
        }
    });
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto close
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.2;
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1000);
        }
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or menus
        hamburger.classList.remove('active');
    }
    
    // Navigation with arrow keys
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        const currentSection = document.querySelector('.nav-link.active');
        if (currentSection) {
            const nextSection = currentSection.nextElementSibling;
            if (nextSection) {
                nextSection.click();
            }
        }
    }
    
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        const currentSection = document.querySelector('.nav-link.active');
        if (currentSection) {
            const prevSection = currentSection.previousElementSibling;
            if (prevSection) {
                prevSection.click();
            }
        }
    }
});

// Performance optimization - debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
const debouncedScrollHandler = debounce(() => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Preload images
    const images = [
        // Add any image URLs here if you have them
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    const stats = document.querySelectorAll('.stat-number');
    const animateStats = () => {
        stats.forEach(stat => {
            const count = +stat.getAttribute('data-count');
            let current = 0;
            const increment = Math.ceil(count / 50);
            const update = () => {
                current += increment;
                if (current > count) current = count;
                stat.textContent = current;
                if (current < count) requestAnimationFrame(update);
            };
            update();
        });
    };
    // Trigger animation when stats are in view
    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateStats();
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        observer.observe(aboutStats);
    }
});

// Service Worker Registration (for PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Dark mode toggle (optional feature)
function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
    const isDark = !document.body.classList.contains('light-mode');
    localStorage.setItem('darkMode', isDark);
}

// Load saved theme
const savedTheme = localStorage.getItem('darkMode');
if (savedTheme === 'false') {
    document.body.classList.add('light-mode');
}

// Add resize handler for responsive adjustments
window.addEventListener('resize', debounce(() => {
    // Handle any responsive adjustments here
    updateActiveNavLink();
}, 250));