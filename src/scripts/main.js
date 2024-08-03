/* header dynamic links*/

const navMenu = document.getElementById('menu');
const links = navMenu.getElementsByClassName('menu__link');

for (let i = 0; i < links.length; i++) {
	if (links[i].href === window.location.href) {
		links[i].classList.add('active');
		break;
	}
}

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
	slidesPerView: 1,
	navigation: {
		nextEl: '.slider-btn--next',
		prevEl: '.slider-btn--prev',
	},
	breakpoints: {
		992: {
			slidesPerView: 2
		}
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

/* burger */

const navBtn = document.querySelector('.mobile-nav-btn');
const nav = document.querySelector('.mobile-nav');
const menuIcon = document.querySelector('.nav-icon');

navBtn.onclick = function () {
	nav.classList.toggle('mobile-nav--open');
	menuIcon.classList.toggle('nav-icon--active');
	document.body.classList.toggle('no-scroll');
};