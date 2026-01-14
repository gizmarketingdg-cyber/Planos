// Menu Mobile Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav__link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Header Scroll Effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 80) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq__question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Fechar todos os FAQs
        document.querySelectorAll('.faq__item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Abrir o FAQ clicado se não estava ativo
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Smooth Scroll com offset para o header fixo
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animação de entrada dos elementos
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

// Aplicar animação aos cards e elementos
const animatedElements = document.querySelectorAll('.about__card, .plano__card, .processo__step, .faq__item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contar números (para estatísticas futuras se necessário)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Destacar plano recomendado
const featuredPlan = document.querySelector('.plano__card--featured');
if (featuredPlan) {
    // Adicionar leve pulsação ao plano featured
    setInterval(() => {
        featuredPlan.style.transform = 'scale(1.05)';
        setTimeout(() => {
            featuredPlan.style.transform = 'scale(1.06)';
        }, 500);
    }, 2000);
}

// Validação básica para formulários futuros (se adicionar)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Loading state para botões
const ctaButtons = document.querySelectorAll('.btn');
ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Se for link externo, adicionar pequeno delay visual
        if (this.href && this.href.includes('wa.me')) {
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 300);
        }
    });
});

// Adicionar classe para elementos visíveis
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Prevenção de spam em clicks repetidos
let clickTimeout;
document.querySelectorAll('button, .btn').forEach(element => {
    element.addEventListener('click', function() {
        if (clickTimeout) return;
        
        clickTimeout = setTimeout(() => {
            clickTimeout = null;
        }, 500);
    });
});

console.log('Giz Marketing Digital - Landing Page loaded successfully! 🎨');