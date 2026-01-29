/* ============================================
   ROBERT HÄUSSLER - PORTFOLIO WEBSITE
   JavaScript: Navigation, Animations, EmailJS
   ============================================ */

// -------- Initialize EmailJS --------
emailjs.init("yIWNDp0aSuxbHRZ7-");

// -------- DOM Elements --------
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

// -------- Mobile Menu Toggle --------
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    }
});

// -------- Navbar Scroll Effect --------
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// -------- Active Nav Link on Scroll --------
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinkItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// -------- Scroll Animations (Intersection Observer) --------
const fadeElements = document.querySelectorAll('.fade-in');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => fadeObserver.observe(el));

// -------- Contact Form - EmailJS --------
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = this.from_name.value.trim();
    const email = this.from_email.value.trim();
    const subject = this.subject.value.trim();
    const message = this.message.value.trim();

    // Validate required fields
    if (!name || !email || !subject || !message) {
        showFormStatus('Please fill in all required fields.', 'error');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormStatus('Please enter a valid email address.', 'error');
        return;
    }

    // Set loading state
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').style.display = 'none';
    submitBtn.querySelector('.btn-loading').style.display = 'inline';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    // Send email via EmailJS
    emailjs.sendForm('service_hx5w1x7', 'template_7njhs2m', this)
        .then(function() {
            showFormStatus('Thank you! Your message has been sent. I\'ll get back to you soon.', 'success');
            contactForm.reset();
        }, function(error) {
            console.error('EmailJS error:', error);
            showFormStatus('Oops! Something went wrong. Please try again or email me directly at roberthaeussler.2006@gmail.com', 'error');
        })
        .finally(function() {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').style.display = 'inline';
            submitBtn.querySelector('.btn-loading').style.display = 'none';
        });
});

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type;
}

// -------- Smooth Scroll for CTA Buttons --------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
