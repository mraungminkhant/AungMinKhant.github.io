// ================= NAVBAR SCROLL EFFECT =================
window.addEventListener("scroll", function () {
    const nav = document.querySelector("nav");

    if (window.scrollY > 40) {
        nav.classList.add("nav-scrolled");
    } else {
        nav.classList.remove("nav-scrolled");
    }
});

// ================= MOBILE MENU =================
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav ul");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

// Close menu after clicking a link
document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", () => {
        if (navMenu) {
            navMenu.classList.remove("active");
        }
    });
});

// ================= SCROLL REVEAL ANIMATION =================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(
    ".skill-card,.highlight-card,.contact-card,.about-card,.project-card"
).forEach(element => {
    element.classList.add("hidden");
    observer.observe(element);
});

// ================= ACTIVE NAVIGATION HIGHLIGHT =================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// ================= UNIVERSAL CAROUSEL SLIDERS =================
document.querySelectorAll(".project-slider-container").forEach(container => {
    const grid = container.querySelector(".project-grid");
    const nextBtn = container.querySelector(".next-btn");
    const prevBtn = container.querySelector(".prev-btn");

    if (grid && nextBtn && prevBtn) {

        nextBtn.addEventListener("click", () => {
            grid.scrollBy({
                left: 420,
                behavior: "smooth"
            });
        });

        prevBtn.addEventListener("click", () => {
            grid.scrollBy({
                left: -420,
                behavior: "smooth"
            });
        });
    }
});

// ================= UNIVERSAL FILTER =================
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        const targetId = button.dataset.target;
        const filter = button.dataset.filter;
        const targetGrid = document.getElementById(targetId);

        if (!targetGrid) return;

        // Remove active class from buttons in the same filter group
        button.closest(".project-filter")
            .querySelectorAll(".filter-btn")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const cards = targetGrid.querySelectorAll(".project-card");

        cards.forEach(card => {
            const category = card.dataset.category || "";

            card.classList.add("hide-animation");

            setTimeout(() => {
                if (filter === "all" || category.includes(filter)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }

                setTimeout(() => {
                    card.classList.remove("hide-animation");
                }, 50);

            }, 200);
        });

        targetGrid.scrollLeft = 0;
    });
});

// ================= DARK MODE =================
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    body.classList.add("dark");
} else if (savedTheme === "light") {
    body.classList.remove("dark");
} else {
    // First visit: use system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        body.classList.add("dark");
    }
}

// Update moon/sun icon
function updateThemeIcon() {
    if (!themeToggle) return;

    const icon = themeToggle.querySelector("i");

    if (body.classList.contains("dark")) {
        icon.className = "fa-solid fa-sun";
    } else {
        icon.className = "fa-solid fa-moon";
    }
}

updateThemeIcon();

// Toggle theme
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark");

        localStorage.setItem(
            "theme",
            body.classList.contains("dark") ? "dark" : "light"
        );

        updateThemeIcon();
    });
}

// ================= FIX ANCHOR LINKS FROM OTHER PAGES =================
window.addEventListener("load", () => {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);

        if (target) {
            setTimeout(() => {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 100);
        }
    }
});