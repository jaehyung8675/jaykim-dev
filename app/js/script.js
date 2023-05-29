'use strict';
//////////////////////////////////////////
//// Elements
//////////////////////////////////////////

const header = document.querySelector('.header');
const nav = document.querySelector('nav');

const navBarIcon = document.querySelector('.navbar-icon');
const mainMenu = document.querySelector('.main-menu');
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');

const navLinks = document.querySelector('.nav__links');
const scrollToTop = document.querySelector('.logo');
const btnScrollToAbout = document.querySelector('.btn--scroll-to');
const scrollToAbout = document.getElementById('projects');

const experienceMenu = document.querySelector('.experience__menu');

const projects = document.querySelector('.projects');

//////////////////////////////////////////
//// Event Handler
//////////////////////////////////////////

// Sticky navigation
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

// Toggling navigation
navBarIcon.addEventListener('click', function () {
  navBarIcon.classList.toggle('active');
  mainMenu.classList.toggle('active');
  body.classList.toggle('overflowhidden');
  overlay.classList.toggle('hidden');
});

// Closing navigation
const closeMenu = function () {
  navBarIcon.classList.remove('active');
  mainMenu.classList.remove('active');
  body.classList.remove('overflowhidden');
  overlay.classList.add('hidden');
};

// Scrolling to Top
scrollToTop.addEventListener('click', function (e) {
  e.preventDefault();
  header.scrollIntoView({ behavior: 'smooth' });
  closeMenu();
});

// Button scrolling to about section
btnScrollToAbout.addEventListener('click', function (e) {
  const sectionAbout = scrollToAbout.getBoundingClientRect();

  window.scrollTo({
    left: sectionAbout.left + window.pageXOffset,
    top: sectionAbout.top - navHeight + window.pageYOffset,
    behavior: 'smooth',
  });
});

// Scroll to each section
navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  // if (e.target.classList.contains('nav__link')) {
  //   const id = e.target.getAttribute('href');
  //   document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  // }

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    const section = document.querySelector(id).getBoundingClientRect();

    window.scrollTo({
      left: section.left + window.pageXOffset,
      top: section.top - navHeight + window.pageYOffset,
      behavior: 'smooth',
    });
  }
  closeMenu();
});

// Experience tap & content activation
experienceMenu.addEventListener('click', function (e) {
  const experienceTaps = document.querySelectorAll('.experience__tab');
  const clickedTap = e.target.closest('button');
  const experienceContents = document.querySelectorAll('.experience__content');
  const tabBar = document.querySelector('.tab__bar');

  if (!clickedTap) return;
  // Activate top
  experienceTaps.forEach((tab) => tab.classList.remove('active'));
  clickedTap.classList.add('active');

  if (window.screen.width >= 640) {
    tabBar.style.transform = `translateY(${
      (clickedTap.dataset.tab - 1) * 51
    }px)`;
  } else {
    tabBar.style.transform = `translateX(${
      (clickedTap.dataset.tab - 1) * 150
    }px)`;
  }

  // Activate content
  experienceContents.forEach((content) => content.classList.remove('active'));
  document
    .querySelector(`.ex-${clickedTap.dataset.tab}`)
    .classList.add('active');
});

// Project fase animation
const handleHover = function (e) {
  if (e.target.classList.contains('project__link')) {
    const link = e.target.closest('.project');
    const siblings = link.closest('.projects').querySelectorAll('.project');

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

projects.addEventListener('mouseover', handleHover.bind(0.3));
projects.addEventListener('mouseout', handleHover.bind(1));
