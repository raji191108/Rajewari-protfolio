
// NAVIGATION MENU

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    menuBtn.setAttribute("aria-expanded", navLinks.classList.contains("show"));
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuBtn.setAttribute("aria-expanded", "false");
    });
});


// DARK / LIGHT MODE

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    themeBtn.textContent = isDark ? "☀" : "☾";
    themeBtn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");

    localStorage.setItem("portfolioTheme", isDark ? "dark" : "light");
});


// RESTORE THEME

const savedTheme = localStorage.getItem("portfolioTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀";
    themeBtn.setAttribute("aria-label", "Switch to light theme");
}


// TYPING ANIMATION

const typingElement = document.getElementById("typing");

const words = [
    "Web Developer",
    "CSE Student",
    "Creative Thinker",
    "UI/UX Enthusiast"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {
        typingElement.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }

    } else {
        typingElement.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, deleting ? 50 : 100);
}

typeEffect();


// SCROLL REVEAL ANIMATION

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll(".reveal").forEach(element => {
    observer.observe(element);
});


// SCROLL PROGRESS AND ACTIVE SECTION

const scrollProgress = document.getElementById("scrollProgress");
const sections = document.querySelectorAll("main section[id]");
const sectionLinks = document.querySelectorAll(".nav-links a");

function updateScrollState() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight * 100 : 0;
    scrollProgress.style.width = `${progress}%`;

    let activeSection = "home";
    sections.forEach(section => {
        if (section.getBoundingClientRect().top <= window.innerHeight * 0.35) {
            activeSection = section.id;
        }
    });

    sectionLinks.forEach(link => {
        const isActive = link.getAttribute("href") === `#${activeSection}`;
        link.classList.toggle("active", isActive);
        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", updateScrollState);
updateScrollState();


// POINTER-RESPONSIVE HERO BACKGROUND

const hero = document.querySelector(".hero");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!reduceMotion.matches) {
    hero.addEventListener("pointermove", event => {
        if (event.pointerType === "touch") return;

        const bounds = hero.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width * 100;
        const y = (event.clientY - bounds.top) / bounds.height * 100;
        hero.style.setProperty("--pointer-x", `${x}%`);
        hero.style.setProperty("--pointer-y", `${y}%`);
    });

    hero.addEventListener("pointerleave", () => {
        hero.style.removeProperty("--pointer-x");
        hero.style.removeProperty("--pointer-y");
    });
}


// COPY EMAIL

const copyBtn = document.getElementById("copyEmail");

copyBtn.addEventListener("click", async () => {

    const email = document.getElementById("emailText").textContent;

    try {
        await navigator.clipboard.writeText(email);
        copyBtn.textContent = "Copied!";

        setTimeout(() => {
            copyBtn.textContent = "Copy";
        }, 2000);

    } catch {
        copyBtn.textContent = "Copy unavailable";
    }
});


// CONTACT FORM DEMO

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value;

    document.getElementById("formMessage").textContent =
        `Thank you, ${name}! This is a demo form. Connect a backend to receive messages.`;

    contactForm.reset();

});


// CURRENT YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();
