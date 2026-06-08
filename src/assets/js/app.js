/*
Template Name: Manufactt - Manufacturing Services Website TailwindCSS 4 Template
Version: 1.0.0
Author: Unifato
Website: https://unifato.com/
Email: unifato.themes@gmail.com
File: App js
*/



// Preline Plugin File Import
import "preline";


import './components/gallery';
import './components/animation';
import './components/swiper';
import './components/catalog-filter';

var stickyNav = document.querySelector(".nav-sticky")
var waFloat = document.getElementById("wa-float")

if (stickyNav) {
    window.addEventListener("scroll", function () {
        var scTop = window.pageYOffset || document.documentElement.scrollTop

        if (scTop >= 100) {
            stickyNav.classList.add("nav-sticky-on")
            if (waFloat) {
                waFloat.classList.remove("opacity-0", "invisible")
                waFloat.classList.add("opacity-100", "visible")
            }
        } else {
            stickyNav.classList.remove("nav-sticky-on")
            if (waFloat) {
                waFloat.classList.add("opacity-0", "invisible")
                waFloat.classList.remove("opacity-100", "visible")
            }
        }
    })
}


document.addEventListener("DOMContentLoaded", () => {
    // Add page-loaded class to body to trigger CSS fade-in transition
    document.body.classList.add("page-loaded");

    // Scroll-Triggered Entrance Animations (Framer-like scroll animations)
    const setupScrollAnimations = () => {
        // Helper to identify background/decorator elements that should NOT be animated
        const isBackgroundElement = (el) => {
            return (
                el.classList.contains("pointer-events-none") ||
                el.classList.contains("absolute") ||
                el.className.includes("bg-[url") ||
                el.className.includes("noise") ||
                el.tagName === "VIDEO" ||
                el.classList.contains("opacity-4") ||
                el.classList.contains("opacity-7") ||
                el.closest(".pointer-events-none")
            );
        };

        // Target grid containers for stagger effect
        const staggerContainers = [
            ".grid",
            ".flex-wrap.justify-center"
        ];

        staggerContainers.forEach(containerSelector => {
            document.querySelectorAll(containerSelector).forEach(container => {
                if (isBackgroundElement(container)) return;
                
                // Only stagger if it has multiple children
                if (container.children.length > 1) {
                    container.classList.add("scroll-animate-stagger");
                }
            });
        });

        // Target individual blocks inside sections (under container/container-full)
        const individualElements = [
            ".container > div",
            ".container-full > div",
            "section h1",
            "section h2",
            ".product-card"
        ];

        individualElements.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                if (isBackgroundElement(el)) return;
                
                // Avoid double animation
                if (
                    el.closest(".scroll-animate") ||
                    el.closest(".scroll-animate-stagger") ||
                    el.classList.contains("scroll-animate-stagger") ||
                    (el.parentElement && el.parentElement.classList.contains("scroll-animate-stagger"))
                ) {
                    return;
                }
                el.classList.add("scroll-animate");
            });
        });

        // Set up IntersectionObserver to trigger animations when elements enter viewport
        const observerOptions = {
            root: null,
            rootMargin: "0px 0px -8% 0px", // Trigger when 8% inside the viewport
            threshold: 0.05
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    obs.unobserve(entry.target); // Trigger only once for performance
                }
            });
        }, observerOptions);

        // Observe both individual animations and stagger containers
        document.querySelectorAll(".scroll-animate, .scroll-animate-stagger").forEach(el => {
            observer.observe(el);
        });
    };

    setupScrollAnimations();

    if (window.HSStaticMethods) {
        window.HSStaticMethods.autoInit();
    }

    const current = window.location.pathname.split("/").pop() || "index.html"

    document.querySelectorAll("#navbar a[href]").forEach((link) => {
        const target = link.getAttribute("href")?.split("/").pop()
        if (target === current) {
            link.classList.add("active")
        }
    })

    document.querySelectorAll("#offcanvasSidebar ul a[href]").forEach((link) => {
        const target = link.getAttribute("href")?.split("/").pop()
        if (target === current) {
            link.classList.add("active")
        }
    })

    // Page Exit Transition
    document.addEventListener("click", (e) => {
        const anchor = e.target.closest("a");
        if (!anchor) return;

        const href = anchor.getAttribute("href");
        const target = anchor.getAttribute("target");

        // Check if it's a valid internal navigation link
        if (
            href &&
            !href.startsWith("#") &&
            !href.startsWith("javascript:") &&
            !href.startsWith("tel:") &&
            !href.startsWith("mailto:") &&
            !href.startsWith("https://wa.me") &&
            target !== "_blank" &&
            (href.startsWith("/") || !href.includes("://")) &&
            !e.metaKey && // Allow Cmd/Ctrl + Click to open in new tab
            !e.ctrlKey
        ) {
            e.preventDefault();
            document.body.classList.remove("page-loaded");
            document.body.classList.add("page-fading-out");
            setTimeout(() => {
                window.location.href = href;
            }, 300); // match transition duration in CSS
        }
    });
})

// Initialize immediately if DOM is already parsed (typical in Vite development mode)
if (window.HSStaticMethods) {
    window.HSStaticMethods.autoInit();
}
if (document.readyState === "interactive" || document.readyState === "complete") {
    document.body.classList.add("page-loaded");
}

// Reset classes if user navigates via browser Back/Forward cache (BFcache)
window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        document.body.classList.remove("page-fading-out");
        document.body.classList.add("page-loaded");
    }
});