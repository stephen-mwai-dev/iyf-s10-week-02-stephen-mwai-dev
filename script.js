const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme
const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
body.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    if (theme === 'dark') {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
}

// --- NEW: Mobile Menu Toggle Logic ---
const mobileBtn = document.getElementById('mobile-menu-btn');
const navContent = document.querySelector('.nav-content');

mobileBtn.addEventListener('click', () => {
    navContent.classList.toggle('active');
    
    // Toggle the icon between bars and times (X)
    const mobileIcon = mobileBtn.querySelector('i');
    if (navContent.classList.contains('active')) {
        mobileIcon.classList.replace('fa-bars', 'fa-times');
    } else {
        mobileIcon.classList.replace('fa-times', 'fa-bars');
    }
});

// Close menu when a navigation link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navContent.classList.remove('active');
        mobileBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
    });
});

// --- Scroll Reveal Effect ---
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "all 0.8s ease-out";
    observer.observe(section);
});
