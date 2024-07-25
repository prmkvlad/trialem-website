/* fixed header */
const headerEl = document.querySelector('.header');

window.addEventListener('scroll', () => {
	if (window.scrollY > headerEl.offsetHeight) {
		headerEl.classList.add('scrolled');
	} else {
		headerEl.classList.remove('scrolled');
	}
})

const swiper = new Swiper('.feedback .swiper', {
	slidesPerView: 2,

	navigation: {
		nextEl: '.slider-btn--next',
		prevEl: '.slider-btn--prev',
	}

});