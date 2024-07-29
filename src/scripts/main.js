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

/* tabs */

const showTabs = (tabsNav, tabsContent) => {
	tabsNav?.forEach((navLink, index) => {
		navLink?.addEventListener('click', () => {
			tabsNav.forEach((link) => {
				link.classList.remove('active');
			})
			navLink.classList.add('active');

			let navIndex = index;

			tabsContent.forEach((contentItem, index) => {
				contentItem.classList.remove('active');

				if (index === navIndex) {
					contentItem.classList.add('active');
				}
			});
		});
	});
};

const tabsNav = document.querySelectorAll('.bikes .tabs-nav__link');
const tabsContent = document.querySelectorAll('.bikes .tabs-content');
showTabs(tabsNav, tabsContent);