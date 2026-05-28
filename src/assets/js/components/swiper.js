/**
* Swiper Slider
* Enables carousels and sliders
* Requires swiper-bundle.min.js
*/



import Swiper from 'swiper/bundle';

export default (() => {

    const workSwiper = new Swiper('.project-swiper', {
        loop: true,
        speed: 800,
        slidesPerView: "auto",
        effect: "fade",
        spaceBetween: 30,
        allowTouchMove: false,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })

})()
