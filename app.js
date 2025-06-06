import { notificationsData, cohortsData, testimonialsData, topicsCloudData } from "./allData.js";

///////////// DARK & LIGHT MODE //////////////

// get color scheme mode
function getColorSchemeMode() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// set light mode & dark mode theme
const logoImg = document.querySelector("header .logo img");
const [cohorts, udemy, docs, reviews] = Array.from(document.querySelectorAll("header nav a img"));
const lightAndDarkModeBtn = document.querySelector("header section .light-and-dark-mode-btn img");

function setTheme() {
  if (window.localStorage.getItem("theme") === "dark") {
    return setThemeToDarkMode();
  } else if (window.localStorage.getItem("theme") === "light") {
    return setThemeToLightMode();
  }

  if (getColorSchemeMode() === "dark") {
    return setThemeToDarkMode();
  } else {
    return setThemeToLightMode();
  }
}

setTheme();

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", setTheme);

// update everthing according to light mode
function setThemeToLightMode() {
  logoImg.src = "/images/chaicode-light-mode.svg";

  cohorts.src = "/images/cohorts-light-mode.svg";
  udemy.src = "/images/udemy-light-mode.svg";
  docs.src = "/images/docs-light-mode.svg";
  reviews.src = "/images/reviews-light-mode.svg";

  lightAndDarkModeBtn.src = "/images/dark-mode.svg";

  document.documentElement.classList.remove("dark-mode");
  document.documentElement.classList.add("light-mode");
}

// update everthing according to dark mode
function setThemeToDarkMode() {
  logoImg.src = "/images/chaicode-dark-mode.svg";

  cohorts.src = "/images/cohorts-dark-mode.svg";
  udemy.src = "/images/udemy-dark-mode.svg";
  docs.src = "/images/docs-dark-mode.svg";
  reviews.src = "/images/reviews-dark-mode.svg";

  lightAndDarkModeBtn.src = "/images/light-mode.svg";

  document.documentElement.classList.remove("light-mode");
  document.documentElement.classList.add("dark-mode");
}

// toggle to light and dark mode using lightAndDarkModeBtn
lightAndDarkModeBtn.addEventListener("click", () => {
  const currentTheme = window.localStorage.getItem("theme") || getColorSchemeMode();
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  window.localStorage.setItem("theme", newTheme);
  setTheme();
});

////////////// NOTIFICATION BAR ////////////////

// notification cancel button logic
const notificationBar = document.querySelector(".notification-bar");
const notificationBarSpanElem = document.querySelector(".notification-bar span");
const checkNowLink = document.querySelector(".notification-bar .check-now-link");
const cancelBtn = document.querySelector(".notification-bar .cancel-btn");

let i = 0;
const intervalID = setInterval(() => {
  notificationBarSpanElem.innerHTML = notificationsData[i].notificationText;
  checkNowLink.href = notificationsData[i].notificationLink;
  i++;
  if (i >= notificationsData.length) i = 0;
}, 4000);

cancelBtn.addEventListener("click", () => {
  notificationBar.classList.add("hide");
  clearInterval(intervalID);
});

/////////////// HEADER ////////////////

// set .scrolled class to header and change its background dynamically
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 25) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/////////////// HERO SECTION //////////////

// adjust hero section height dynamically
function adjustHeroSectionHeight() {
  const notificationBar = document.querySelector(".notification-bar");
  const header = document.querySelector("header");
  const heroSection = document.querySelector(".hero-section");

  const notificationBarHeight = notificationBar ? notificationBar.offsetHeight : 0;
  const headerHeight = header ? header.offsetHeight : 0;

  const totalHeight = notificationBarHeight + headerHeight;

  heroSection.style.minHeight = `calc(100vh - ${totalHeight}px)`;
}

window.addEventListener("load", adjustHeroSectionHeight);

window.addEventListener("resize", adjustHeroSectionHeight);

//////////////// COHORTS SECTION /////////////////

const cohortsWrapper = document.querySelector(".cohorts-section .cohorts-wrapper");

if (cohortsWrapper) createAllCohorts();

function createAllCohorts() {
  const cohortsWrapperFragment = document.createDocumentFragment();

  cohortsData.forEach((cohortData) => {
    const cohort = document.createElement("div");
    cohort.classList.add("cohort");

    const iframeWrapper = document.createElement("div");
    iframeWrapper.classList.add("iframe-wrapper");

    const iframe = document.createElement("iframe");
    iframe.src = cohortData.ytVideoEmbedIframe.src;
    iframe.title = cohortData.ytVideoEmbedIframe.title;
    iframe.frameborder = "0";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerpolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = "true";

    iframeWrapper.appendChild(iframe);

    const tags = document.createElement("div");
    tags.classList.add("tags");
    cohortData.tags.push("+1");
    cohortData.tags.forEach((tag) => {
      const span = document.createElement("span");
      span.innerText = tag;
      tags.appendChild(span);
    });

    iframeWrapper.appendChild(tags);

    const h3 = document.createElement("h3");
    h3.innerText = cohortData.heading;

    const p = document.createElement("p");
    p.innerText = cohortData.description;

    const courseTimeline = document.createElement("div");
    courseTimeline.classList.add("course-timeline");

    const startDate = document.createElement("div");
    startDate.classList.add("start-date");
    const calenderImg = document.createElement("img");
    calenderImg.src = "/images/start-date.svg";
    calenderImg.alt = "calender";
    const startDateTextNode = document.createTextNode(`Starts ${cohortData.startDate}`);
    startDate.appendChild(calenderImg);
    startDate.appendChild(startDateTextNode);

    courseTimeline.appendChild(startDate);

    const duration = document.createElement("div");
    duration.classList.add("duration");
    const clockImg = document.createElement("img");
    clockImg.src = "/images/duration.svg";
    clockImg.alt = "clock";
    const durationTextNode = document.createTextNode(cohortData.duration);
    duration.appendChild(clockImg);
    duration.appendChild(durationTextNode);

    courseTimeline.appendChild(duration);

    const price = document.createElement("div");
    price.classList.add("price");

    const priceAfterDiscount = document.createElement("span");
    priceAfterDiscount.classList.add("price-after-discount");
    priceAfterDiscount.innerText = `₹ ${cohortData.priceAfterDiscount}`;
    price.appendChild(priceAfterDiscount);

    const realPrice = document.createElement("span");
    realPrice.classList.add("real-price");
    realPrice.innerText = `₹ ${cohortData.realPrice}`;
    price.appendChild(realPrice);

    const savePercent = document.createElement("div");
    savePercent.classList.add("save-percent");
    const discount = +cohortData.realPrice - +cohortData.priceAfterDiscount;
    const discountPercent = Math.round((discount * 100) / +cohortData.realPrice);
    savePercent.innerText = `Save ${discountPercent}%`;
    price.appendChild(savePercent);

    const a = document.createElement("a");
    a.classList.add("buy-now");
    a.innerText = "Buy Now";
    a.href = cohortData.buyNowLink;

    const live = document.createElement("div");
    live.classList.add("live");
    const liveTextNode = document.createTextNode("Live ");
    const blinker = document.createElement("span");
    blinker.classList.add("blinker");
    live.appendChild(liveTextNode);
    live.appendChild(blinker);

    const elementsToBeAppended = [iframeWrapper, h3, p, courseTimeline, price, a, live];

    elementsToBeAppended.forEach((element) => {
      cohort.appendChild(element);
    });

    cohortsWrapperFragment.appendChild(cohort);
  });

  cohortsWrapper.appendChild(cohortsWrapperFragment);
}

//////////////////// FOR TESTIMONIALS SECTION /////////////////

const testimonialsWrapper = document.querySelector(".testimonials-section .testimonails-wrapper");

if (testimonialsWrapper) createAllTestimonials();

function createAllTestimonials() {
  const testimonialsWrapperFragment = document.createDocumentFragment();

  testimonialsData.forEach((testimonialData) => {
    const testimonial = document.createElement("div");
    testimonial.classList.add("testimonial");

    const userInfoWrapper = document.createElement("div");
    userInfoWrapper.classList.add("user-info-wrapper");

    const avatar = document.createElement("div");
    avatar.classList.add("avatar");

    const img = document.createElement("img");
    img.src = testimonialData.userAvatar;
    img.alt = "user avatar";

    avatar.appendChild(img);

    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");

    const h3 = document.createElement("h3");
    h3.classList.add("user-name");
    h3.innerText = testimonialData.userName;

    userInfo.appendChild(h3);

    const p = document.createElement("p");
    p.classList.add("user-profession");
    p.innerText = testimonialData.userProfession;

    userInfo.appendChild(p);

    userInfoWrapper.appendChild(avatar);
    userInfoWrapper.appendChild(userInfo);

    const testimonialComment = document.createElement("div");
    testimonialComment.classList.add("testimonial-comment");
    testimonialComment.innerText = testimonialData.testimonialComment;

    const rating = document.createElement("div");
    rating.classList.add("rating");

    const yellowStars = +testimonialData.ratingStars <= 5 ? +testimonialData.ratingStars : 5;
    const grayStars = +(5 - yellowStars);

    [yellowStars, grayStars].forEach((stars, index) => {
      for (let i = 1; i <= stars; i++) {
        const img = document.createElement("img");
        img.src = index === 0 ? "/images/rating-star-yellow.svg" : "/images/rating-star-gray.svg";
        img.alt = index === 0 ? "rating star yellow" : "rating star gray";

        rating.appendChild(img);
      }
    });

    const elementsToBeAppended = [userInfoWrapper, testimonialComment, rating];

    elementsToBeAppended.forEach((element) => {
      testimonial.appendChild(element);
    });

    testimonialsWrapperFragment.appendChild(testimonial);
  });

  testimonialsWrapper.appendChild(testimonialsWrapperFragment);
}

///////////////////// KEY BENEFITS SECTION ///////////////////

const aluminiNetworkCanvas = document.getElementById("aluminiNetworkCanvas");

if (aluminiNetworkCanvas) createAluminiNetworkAnimation();

function createAluminiNetworkAnimation() {
  const width = (aluminiNetworkCanvas.width = aluminiNetworkCanvas.offsetWidth);
  const height = (aluminiNetworkCanvas.height = 300);

  const ctx = aluminiNetworkCanvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#ffa500");
  gradient.addColorStop(1, "#ea580c");

  class Circle {
    constructor(x, y, r, dx, dy) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.dx = dx;
      this.dy = dy;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.closePath();
    }
    update() {
      if (this.x + this.r > width || this.x - this.r < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.r > height || this.y - this.r < 0) {
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y += this.dy;
      this.draw();
    }
  }

  const circleArr = [];
  for (let i = 0; i < 20; i++) {
    let r = Math.floor(Math.random() * 20) + 1;
    let x = Math.random() * (width - r * 2) + r;
    let y = Math.random() * (height - r * 2) + r;
    let dx = (Math.random() - 0.5) * 5;
    let dy = (Math.random() - 0.5) * 5;

    circleArr.push(new Circle(x, y, r, dx, dy));
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < circleArr.length; i++) {
      for (let j = i + 1; j < circleArr.length; j++) {
        const c1 = circleArr[i];
        const c2 = circleArr[j];

        const dx = c1.x - c2.x;
        const dy = c1.y - c2.y;
        const distance = Math.hypot(dx, dy);

        const maxDistance = 180;

        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance;
          ctx.strokeStyle = `rgba(255, 165, 0, ${opacity})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(c1.x, c1.y);
          ctx.lineTo(c2.x, c2.y);
          ctx.stroke();
          ctx.closePath();
        }
      }
    }

    for (const circle of circleArr) {
      circle.update();
    }
  }

  animate();
}

///////////////////// TOPICS CLOUD SECTION ///////////////////

const topicsWrapper = document.querySelector(".topics-cloud-section .topics-wrapper");

if (topicsWrapper) createAllTopics();

function createAllTopics() {
  const topicsWrapperFragment = document.createDocumentFragment();

  topicsCloudData.forEach((topicCloudData) => {
    const a = document.createElement("a");
    a.classList.add("topic");
    a.href = topicCloudData.topicYTVideoLink;
    a.target = "_blank";

    const img = document.createElement("img");
    if (topicCloudData.bg) {
      img.classList.add("bg");
    }
    img.src = topicCloudData.topicImg.src;
    img.alt = topicCloudData.topicImg.alt;

    a.appendChild(img);

    const span = document.createElement("span");
    span.innerText = topicCloudData.topicName;

    a.appendChild(span);

    topicsWrapperFragment.appendChild(a);
  });

  topicsWrapper.appendChild(topicsWrapperFragment);
}

///////////////// FOOTER ///////////////

const yearSpan = document.getElementById("year");

if (yearSpan) {
  const currentYear = new Date().getFullYear();
  yearSpan.innerText = currentYear;
}

///////////////// PAGES /////////////////

// mailto
const mailtoAnchorArr = Array.from(document.querySelectorAll(".mailto"));

if (mailtoAnchorArr) {
  mailtoAnchorArr.forEach((mailtoAnchor) => {
    mailtoAnchor.href = "mailto:team@chaicode.com";
  });
}

///////////////// EXTRA FEATURES /////////////////

// mouse trails logic
document.addEventListener("mousemove", (e) => {
  const dot = document.createElement("div");
  dot.classList.add("trail-dot");
  dot.style.top = `${e.clientY}px`;
  dot.style.left = `${e.clientX}px`;
  document.body.appendChild(dot);

  setTimeout(() => {
    dot.remove();
  }, 500);
});

// change iframe background acc. to online and offline
if (!window.navigator.onLine) {
  const youtubeIframeWrapper = document.querySelector(".iframe-wrapper");
  const youtubeIframe = document.querySelector(".iframe-wrapper iframe");

  youtubeIframeWrapper.classList.add("offline");
  youtubeIframe.style.display = "none";
}

// smartphone hover animation 3D effect
const smartphone = document.querySelector(".download-app-section .app-info-wrapper .left .smartphone");

if (smartphone) createSmartphoneAnimation();

function createSmartphoneAnimation() {
  const motionMatchMedia = window.matchMedia("(prefers-reduced-motion)");
  const THRESHOLD = 15;

  function handleHover(e) {
    const { clientX, clientY, currentTarget } = e;
    const { clientWidth, clientHeight } = currentTarget;
    const offsetLeft = currentTarget.getBoundingClientRect().left;
    const offsetTop = currentTarget.getBoundingClientRect().top;

    const horizontal = (clientX - offsetLeft) / clientWidth;
    const vertical = (clientY - offsetTop) / clientHeight;
    const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
    const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);

    smartphone.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;
  }

  function resetStyles(e) {
    smartphone.style.transform = `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
  }

  if (!motionMatchMedia.matches) {
    smartphone.addEventListener("mousemove", handleHover);
    smartphone.addEventListener("mouseleave", resetStyles);
  }
}
