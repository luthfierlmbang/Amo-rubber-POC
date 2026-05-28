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
})