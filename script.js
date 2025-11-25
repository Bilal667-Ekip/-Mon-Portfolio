/* ============================================
   PORTFOLIO CYBERSÉCURITÉ - STEPHEN BILAL
   Animations & Interactions Avancées
   ============================================ */

// =============================================
// 1. CANVAS MATRIX RAIN EFFECT (Optimisé + Parallaxe)
// =============================================
const canvas = document.getElementById('canvas-container');
const ctx = canvas.getContext('2d');

let mouseX = 0;
let mouseY = 0;
let isMouseMoving = false;
let mouseTimeout;

// Resize canvas to window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Matrix characters
const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/\\[]{}();:.,!@#$%^&*';
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);
const drops = [];

// Initialize drops
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
}

// Mouse movement tracking for parallax effect
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseMoving = true;
    
    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => {
        isMouseMoving = false;
    }, 100);
});

// Draw function for Matrix effect
function drawMatrix() {
    // Trail effect (fade out previous characters)
    ctx.fillStyle = 'rgba(2, 12, 27, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        
        // Parallax effect based on mouse position
        let xOffset = 0;
        if (isMouseMoving) {
            const distance = Math.abs(i * fontSize - mouseX);
            xOffset = (mouseX - canvas.width / 2) / canvas.width * 20 * (1 - distance / canvas.width);
        }
        
        // Vary colors for cyber effect
        if (Math.random() > 0.98) {
            ctx.fillStyle = '#FFF'; // Bright flashes
        } else if (Math.random() > 0.95) {
            ctx.fillStyle = '#00b4d8'; // Secondary color (blue)
        } else {
            ctx.fillStyle = '#64ffda'; // Primary color (green)
        }
        
        // Draw character with parallax offset
        ctx.fillText(text, i * fontSize + xOffset, drops[i] * fontSize);

        // Reset drop to top randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        
        drops[i]++;
    }
}

// Start Matrix animation
setInterval(drawMatrix, 33); // ~30fps for smooth performance

// =============================================
// 2. CURSEUR PERSONNALISÉ INTERACTIF
// =============================================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    
    // Delayed follower for smooth trail effect
    setTimeout(() => {
        cursorFollower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    }, 100);
});

// Enlarge cursor on hover over interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .cert-card, .roadmap-step');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(1.5)';
        cursorFollower.style.transform += ' scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
        cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(1.5)', '');
    });
});

// =============================================
// 3. EFFET TYPER (Machine à écrire) AMÉLIORÉ
// =============================================
const typerText = document.getElementById('typer-text');
const textToType = "Etudiant en Réseaux & Télécommunications.";
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    if (!isDeleting && charIndex < textToType.length) {
        // Typing
        typerText.textContent = textToType.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100 + Math.random() * 100; // Variable speed for realism
    } else if (isDeleting && charIndex > 0) {
        // Deleting (optional, currently disabled)
        typerText.textContent = textToType.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        // Stay on complete text
        typingSpeed = 3000; // Wait before restart (currently stays)
        // isDeleting = !isDeleting; // Uncomment to enable loop
    }
    
    setTimeout(typeWriter, typingSpeed);
}

// Start typewriter effect after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// =============================================
// 4. SCROLL REVEAL (Apparition en cascade)
// =============================================
const revealElements = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const delay = element.getAttribute('data-reveal-delay') || 0;
            
            setTimeout(() => {
                element.classList.add('revealed');
            }, delay);
            
            // Unobserve after revealing (one-time animation)
            revealObserver.unobserve(element);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

// =============================================
// 5. SMOOTH SCROLL POUR LES ANCRES
// =============================================
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

// =============================================
// 6. EFFETS PARALLAXE AU SCROLL
// =============================================
let scrollY = window.scrollY;

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    
    // Parallax effect on canvas
    canvas.style.transform = `translateY(${scrollY * 0.5}px)`;
    
    // Fade canvas on scroll
    const fadeStart = 100;
    const fadeEnd = 500;
    const opacity = Math.max(0.05, Math.min(0.15, 0.15 - (scrollY - fadeStart) / (fadeEnd - fadeStart) * 0.1));
    canvas.style.opacity = opacity;
});

// =============================================
// 7. ANIMATION DES COMPTEURS (si nécessaire)
// =============================================
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

// =============================================
// 8. INTERACTIONS AVANCÉES SUR LES CARTES
// =============================================
const projectCards = document.querySelectorAll('.project-card');
const certCards = document.querySelectorAll('.cert-card');

// 3D tilt effect on project cards
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Certification cards pulse effect on hover
certCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.animation = 'pulse-glow 1.5s infinite';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.animation = '';
    });
});

// =============================================
// 9. GLITCH EFFECT SUR LE NOM (avancé)
// =============================================
const glitchName = document.querySelector('.glitch-name');

function createGlitchClones() {
    const glitchClone1 = glitchName.cloneNode(true);
    const glitchClone2 = glitchName.cloneNode(true);
    
    glitchClone1.style.position = 'absolute';
    glitchClone2.style.position = 'absolute';
    glitchClone1.style.left = '0';
    glitchClone2.style.left = '0';
    glitchClone1.style.top = '0';
    glitchClone2.style.top = '0';
    glitchClone1.style.color = '#64ffda';
    glitchClone2.style.color = '#00b4d8';
    glitchClone1.style.zIndex = '-1';
    glitchClone2.style.zIndex = '-1';
    
    glitchName.style.position = 'relative';
    glitchName.appendChild(glitchClone1);
    glitchName.appendChild(glitchClone2);
    
    // Random glitch animation
    setInterval(() => {
        if (Math.random() > 0.95) {
            glitchClone1.style.left = (Math.random() - 0.5) * 10 + 'px';
            glitchClone2.style.left = (Math.random() - 0.5) * 10 + 'px';
            
            setTimeout(() => {
                glitchClone1.style.left = '0';
                glitchClone2.style.left = '0';
            }, 50);
        }
    }, 100);
}

// Activate enhanced glitch on hover
glitchName.addEventListener('mouseenter', createGlitchClones);

// =============================================
// 10. PARTICLE EFFECT ON BUTTONS (optionnel)
// =============================================
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '5px';
    particle.style.height = '5px';
    particle.style.backgroundColor = '#64ffda';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.boxShadow = '0 0 10px #64ffda';
    
    document.body.appendChild(particle);
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 3;
    const life = 500 + Math.random() * 500;
    
    let opacity = 1;
    const startTime = Date.now();
    
    function animateParticle() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / life;
        
        if (progress >= 1) {
            particle.remove();
            return;
        }
        
        const currentX = parseFloat(particle.style.left);
        const currentY = parseFloat(particle.style.top);
        
        particle.style.left = currentX + Math.cos(angle) * velocity + 'px';
        particle.style.top = currentY + Math.sin(angle) * velocity - 1 + 'px';
        particle.style.opacity = 1 - progress;
        
        requestAnimationFrame(animateParticle);
    }
    
    animateParticle();
}

// Add particle effect to primary buttons
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createParticle(
                    rect.left + Math.random() * rect.width,
                    rect.top + Math.random() * rect.height
                );
            }, i * 50);
        }
    });
});

// =============================================
// 11. CHARGEMENT PROGRESSIF DES IMAGES (si ajoutées)
// =============================================
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// =============================================
// 12. EASTER EGG - KONAMI CODE
// =============================================
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
    // Matrix goes crazy!
    canvas.style.opacity = '0.5';
    document.body.style.animation = 'glitch 0.3s infinite';
    
    setTimeout(() => {
        canvas.style.opacity = '0.15';
        document.body.style.animation = '';
    }, 3000);
    
    // Show message
    const message = document.createElement('div');
    message.textContent = '🎮 EASTER EGG ACTIVATED! 🎮';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.padding = '30px 50px';
    message.style.background = 'rgba(100, 255, 218, 0.95)';
    message.style.color = '#020c1b';
    message.style.fontSize = '2rem';
    message.style.fontFamily = 'var(--font-head)';
    message.style.borderRadius = '10px';
    message.style.zIndex = '10000';
    message.style.boxShadow = '0 0 50px rgba(100, 255, 218, 1)';
    message.style.animation = 'zoomIn 0.5s ease';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => message.remove(), 500);
    }, 2500);
}

// =============================================
// 13. PERFORMANCE MONITORING
// =============================================
console.log('%c🚀 Portfolio chargé avec succès!', 'color: #64ffda; font-size: 16px; font-weight: bold;');
console.log('%c💻 Design Cyber-Elite par Stephen Bilal', 'color: #00b4d8; font-size: 12px;');
console.log('%c🔒 Spécialisé en Cybersécurité & Réseaux', 'color: #8892b0; font-size: 12px;');

// Log performance metrics
window.addEventListener('load', () => {
    const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
    console.log(`⚡ Page chargée en ${loadTime}ms`);
});

// =============================================
// END OF SCRIPT
// =============================================
