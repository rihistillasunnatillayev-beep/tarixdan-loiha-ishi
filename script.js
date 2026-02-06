// Expandable Content Functionality
document.addEventListener('DOMContentLoaded', () => {
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const expandableContent = document.getElementById(targetId);
            
            if (expandableContent) {
                const isExpanded = expandableContent.classList.contains('expanded');
                
                // Close ALL other expanded content globally
                const allButtons = document.querySelectorAll('.expand-btn');
                const allContents = document.querySelectorAll('.expandable-content');
                
                allButtons.forEach(otherBtn => {
                    if (otherBtn !== button) {
                        otherBtn.textContent = otherBtn.textContent.replace('▲', '▼');
                        otherBtn.classList.remove('active');
                    }
                });
                
                allContents.forEach(otherContent => {
                    if (otherContent !== expandableContent) {
                        otherContent.classList.remove('expanded');
                        otherContent.style.maxHeight = '0';
                    }
                });
                
                // Toggle current content
                if (isExpanded) {
                    expandableContent.classList.remove('expanded');
                    expandableContent.style.maxHeight = '0';
                    button.textContent = button.textContent.replace('▲', '▼');
                    button.classList.remove('active');
                } else {
                    expandableContent.classList.add('expanded');
                    expandableContent.style.maxHeight = expandableContent.scrollHeight + 'px';
                    button.textContent = button.textContent.replace('▼', '▲');
                    button.classList.add('active');
                    
                    // Smooth scroll to button
                    setTimeout(() => {
                        button.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 100);
                }
            }
        });
    });
    
    // Add resize observer to handle content height changes
    const resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
            if (entry.target.classList.contains('expanded')) {
                entry.target.style.maxHeight = entry.target.scrollHeight + 'px';
            }
        });
    });
    
    document.querySelectorAll('.expandable-content').forEach(content => {
        resizeObserver.observe(content);
    });
});

// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
    }, 1500);
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling
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

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scrolled');
    } else {
        header.classList.add('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.timeline-item, .ruler-card, .culture-item, .scholar-card, .gallery-item');
    animatedElements.forEach(el => observer.observe(el));
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    const floatingElements = document.querySelectorAll('.floating-element');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    floatingElements.forEach((element, index) => {
        const speed = 0.2 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Timeline Animation on Scroll
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 200);
        }
    });
}, { threshold: 0.3 });

timelineItems.forEach(item => timelineObserver.observe(item));

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title .title-line');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 2000);
    }
});

// Gallery Lightbox Effect
const galleryItems = document.querySelectorAll('.gallery-item');
let currentImageIndex = 0;

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openLightbox(index);
    });
});

function openLightbox(index) {
    currentImageIndex = index;
    // Lightbox implementation would go here
    console.log(`Opening lightbox for image ${index}`);
}

// Particle Animation for Hero Section
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';
    particle.style.width = Math.random() * 5 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = 'rgba(212, 175, 55, 0.6)';
    particle.style.borderRadius = '50%';
    particle.style.position = 'fixed';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1';
    particle.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out infinite`;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 5000);
}

// Create particles periodically
setInterval(createParticle, 500);

// Add particle styles
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    .particle {
        animation-timing-function: ease-in-out;
    }
`;
document.head.appendChild(particleStyles);

// Interactive Timeline Navigation
const timelineMarkers = document.querySelectorAll('.timeline-marker');
timelineMarkers.forEach(marker => {
    marker.addEventListener('click', () => {
        const content = marker.nextElementSibling;
        content.style.transform = 'scale(1.05)';
        setTimeout(() => {
            content.style.transform = 'scale(1)';
        }, 300);
    });
});

// Ruler Card Flip Animation
document.querySelectorAll('.ruler-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) rotateY(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateY(0)';
    });
});

// Culture Item Pulse Animation
document.querySelectorAll('.culture-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        icon.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            icon.style.animation = '';
        }, 500);
    });
});

// Mughal Comparison Chart Animation
const chartItems = document.querySelectorAll('.chart-item');
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = 'slideInRight 0.5s ease forwards';
            }, index * 100);
        }
    });
}, { threshold: 0.5 });

chartItems.forEach(item => chartObserver.observe(item));

// Add slideInRight animation
const slideInStyles = document.createElement('style');
slideInStyles.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(slideInStyles);

// Gallery Item Shuffle Animation
function shuffleGallery() {
    const gallery = document.querySelector('.gallery-grid');
    const items = Array.from(gallery.children);
    
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        gallery.appendChild(items[j]);
    }
    
    // Re-observe shuffled items
    document.querySelectorAll('.gallery-item').forEach(el => observer.observe(el));
}

// Add shuffle button (optional)
// const shuffleBtn = document.createElement('button');
// shuffleBtn.textContent = 'Galereyani aralashtirish';
// shuffleBtn.className = 'btn btn-primary';
// shuffleBtn.addEventListener('click', shuffleGallery);
// document.querySelector('.gallery-section .section-header').appendChild(shuffleBtn);

// Scroll Progress Indicator
function updateScrollProgress() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    
    // Create progress bar if it doesn't exist
    if (!document.querySelector('.scroll-progress')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #8B4513, #D4AF37);
            z-index: 9999;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);
    }
    
    document.querySelector('.scroll-progress').style.width = scrollProgress + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Mouse Trail Effect
let mouseTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    if (mouseTrail.length >= maxTrailLength) {
        const oldTrail = mouseTrail.shift();
        oldTrail.remove();
    }
    
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, rgba(212, 175, 55, 0.6), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        animation: fadeOut 1s ease forwards;
    `;
    
    document.body.appendChild(trail);
    mouseTrail.push(trail);
    
    setTimeout(() => {
        trail.remove();
        mouseTrail = mouseTrail.filter(t => t !== trail);
    }, 1000);
});

// Add fadeOut animation
const fadeOutStyles = document.createElement('style');
fadeOutStyles.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.5);
        }
    }
`;
document.head.appendChild(fadeOutStyles);

// Performance optimization - Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScroll = debounce(() => {
    updateScrollProgress();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Easter Egg: Konami Code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s ease';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 2000);
    
    // Create celebration particles
    for (let i = 0; i < 50; i++) {
        setTimeout(() => createParticle(), i * 50);
    }
}

// Add rainbow animation
const rainbowStyles = document.createElement('style');
rainbowStyles.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyles);

console.log('Buxoro Xonligi sayti muvaffaqiyatli yuklandi! 🎉');
