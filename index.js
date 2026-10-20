
"use strict";

// 1. Automatically update the copyright year
document.getElementById("year").textContent = new Date().getFullYear();

// 2. Mobile navigation menu
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// 3. Light and dark theme toggle
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    const isLight = document.body.classList.contains("light-theme");
    themeToggle.textContent = isLight ? "☾" : "☀";
    showToast(isLight ? "Light theme enabled" : "Dark theme enabled");
});

// 4. Typing text animation
const typingElement = document.getElementById("typing");
const phrases = [
    "Network Computing Student",
    "Aspiring Developer",
    "Technology Enthusiast"
];

let phraseIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeText() {
    const phrase = phrases[phraseIndex];

    typingElement.textContent = phrase.substring(0, characterIndex);

    if (!deleting) {
        characterIndex++;

        if (characterIndex > phrase.length) {
            deleting = true;
            setTimeout(typeText, 1300);
            return;
        }
    } else {
        characterIndex--;

        if (characterIndex < 0) {
            characterIndex = 0;
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
    }

    setTimeout(typeText, deleting ? 45 : 85);
}

typeText();

// 5. Project category filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.dataset.filter;

        filterButtons.forEach(item => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        projectCards.forEach(card => {
            const matches =
                category === "all" ||
                card.dataset.category === category;

            card.hidden = !matches;
        });
    });
});

// 6. Contact form validation
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formFeedback.textContent = "Please complete every field.";
        return;
    }

    if (message.length < 10) {
        formFeedback.textContent =
            "Please write a message of at least 10 characters.";
        return;
    }

    formFeedback.textContent =
        `Thank you, ${name}! Your demo form passed validation.`;

    showToast("Form validation successful!");
    contactForm.reset();
});

// 7. Back-to-top button
document.getElementById("backToTop").addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// 8. Toast notification
let toastTimer;

function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// 9. Highlight the navigation link for the current section
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
    let currentSection = "home";

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 150) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        const isActive = link.getAttribute("href") === `#${currentSection}`;
        link.classList.toggle("active", isActive);
    });
}

window.addEventListener("scroll", updateActiveLink, { passive: true });
updateActiveLink();

// 10. Reveal project and about cards as they enter the screen
const revealCards = document.querySelectorAll(
    ".about-card, .project-card"
);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealCards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(18px)";
        card.style.transition = "opacity 0.5s, transform 0.5s";
        observer.observe(card);
    });
}

console.log("Aiman's portfolio JavaScript loaded successfully!");
