const a=document.getElementById("menu"),o=a.getElementsByClassName("menu__link");for(let e=0;e<o.length;e++)if(o[e].href===window.location.href){o[e].classList.add("active");break}const c=document.querySelector(".header");window.addEventListener("scroll",()=>{window.scrollY>c.offsetHeight?c.classList.add("scrolled"):c.classList.remove("scrolled")});new Swiper(".feedback .swiper",{slidesPerView:1,navigation:{nextEl:".slider-btn--next",prevEl:".slider-btn--prev"},breakpoints:{992:{slidesPerView:2}}});const d=(e,l)=>{e==null||e.forEach((t,n)=>{t==null||t.addEventListener("click",()=>{e.forEach(s=>{s.classList.remove("active")}),t.classList.add("active");let i=n;l.forEach((s,r)=>{s.classList.remove("active"),r===i&&s.classList.add("active")})})})},m=document.querySelectorAll(".bikes .tabs-nav__link"),u=document.querySelectorAll(".bikes .tabs-content");d(m,u);const v=document.querySelector(".mobile-nav-btn"),f=document.querySelector(".mobile-nav"),b=document.querySelector(".nav-icon");v.onclick=function(){f.classList.toggle("mobile-nav--open"),b.classList.toggle("nav-icon--active"),document.body.classList.toggle("no-scroll")};
