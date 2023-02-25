'use strict';

//// Elements
const header = document.querySelector('.header');
const nav = document.querySelector('nav');
const logo = document.querySelector('.logo');
const navLinks = document.querySelector('ul');
const about = document.getElementById('about');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const experienceMenu = document.querySelector('menu');
const experienceTabs = document.querySelectorAll('.btn--experience');
const experienceContents = document.querySelectorAll('.article--experience');

//// Functions
// Sticky navigation - Interaction Observer API

// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => console.log(entry));
// };

// const obsOptions = {
//   root: null,
//   threshold: 0,
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(about);

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
  if (e.target.classList.contains('link')) {
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

//
function sendEmail() {
  const serviceID = 'service_2v7h2lg';
  const templateID = 'template_wtxthue';

  const emailData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  };

  emailjs.send('service_2v7h2lg', 'template_wtxthue', emailData).then((res) => {
    console.log(emailData.name);
    // alert('Your message sent successfully!' + res.status);
  });
}
