'use strict';

//// Elements
const header = document.querySelector('.header');
const nav = document.querySelector('nav');
const logo = document.querySelector('.logo');
const navLinks = document.querySelector('.nav__links');
const about = document.getElementById('about');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const experienceMenu = document.querySelector('menu');
const experienceTabs = document.querySelectorAll('.btn--experience');
const experienceContents = document.querySelectorAll('.article--experience');
const projects = document.querySelector('.projects');
const inputName = document.querySelector('.form__input--name');
const inputEmail = document.querySelector('.form__input--email');
const inputTextarea = document.querySelector('.form__input--textarea');
const inputBtn = document.querySelector('.form__input--btn');

//// Functions
// Reveal sections
// const allNavLinks = document.querySelectorAll('.nav__link');

// const revealNav = function (entries, observer) {
//   const [entry] = entries;
//   if (!entry.isIntersecting) return;

//   entry.target.classList.remove('link--hidden');
// };

// const navObserver = new IntersectionObserver(revealNav, {
//   root: null,
//   threshold: 0,
// });

// allNavLinks.forEach((link) => {
//   navObserver.observe(link);
//   link.classList.add('link--hidden');
// });

// Sticky navigation - Interaction Observer API
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//// Event Handler
// Section navigation
navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

logo.addEventListener('click', function (e) {
  e.preventDefault();
  header.scrollIntoView({ behavior: 'smooth' });
});

// Button scrolling
btnScrollTo.addEventListener('click', function () {
  about.scrollIntoView({
    behavior: 'smooth',
  });
});

// Experience tap & content activation
experienceMenu.addEventListener('click', function (e) {
  const clickedTap = e.target.closest('button');
  if (!clickedTap) return;
  // Activate top
  experienceTabs.forEach((tab) => tab.classList.remove('active'));
  clickedTap.classList.add('active');
  // Activate content
  experienceContents.forEach((content) => content.classList.remove('active'));
  document
    .querySelector(`.ex-${clickedTap.dataset.tab}`)
    .classList.add('active');
});

// Project fase animation
const handleHover = function (e) {
  if (
    e.target.classList.contains('project__img') ||
    e.target.classList.contains('project__caption')
  ) {
    const link = e.target.closest('figure');
    const siblings = link.closest('.projects').querySelectorAll('figure');

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

projects.addEventListener('mouseover', handleHover.bind(0.3));
projects.addEventListener('mouseout', handleHover.bind(1));

// Contact form submit
// Nedd to find how to clean input value after submiting

// const form = document.querySelector('.form');
// inputBtn.addEventListener('click', function (e) {
//   // e.preventDefault();
//   // inputName.value = inputEmail.value = inputTextarea.value = '';
//   form.reset();
// });

// function submitReset() {
//   inputName.value = inputEmail.value = inputTextarea.value = '';
// }
