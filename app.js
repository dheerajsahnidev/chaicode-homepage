import { notifications } from "./allData.js";

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
  notificationBarSpanElem.innerHTML = notifications[i].notificationText;
  checkNowLink.href = notifications[i].notificationLink;
  i++;
  if (i >= notifications.length) i = 0;
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

const currencySymbol = "₹";
const priceDivArr = Array.from(document.querySelectorAll(".cohorts-section .cohorts-wrapper .cohort .price"));

priceDivArr.forEach((priceDiv) => {
  const priceAfterDiscountSpan = priceDiv.children[0];
  const priceAfterDiscountAmount = +priceDiv.children[0].innerText;

  const realPriceSpan = priceDiv.children[1];
  const realPriceAmount = +priceDiv.children[1].innerText;

  const savePercentDiv = priceDiv.children[2];

  const discount = realPriceAmount - priceAfterDiscountAmount;
  const discountPercent = Math.round((discount * 100) / realPriceAmount);

  priceAfterDiscountSpan.innerText = `${currencySymbol} ${priceAfterDiscountAmount}`;
  realPriceSpan.innerText = `${currencySymbol} ${realPriceAmount}`;

  savePercentDiv.innerText = `Save ${discountPercent}%`;
});

const startDateDivArr = Array.from(
  document.querySelectorAll(".cohorts-section .cohorts-wrapper .cohort .course-timeline .start-date")
);

startDateDivArr.forEach((startDateDiv) => {
  const textNode = [...startDateDiv.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);

  if (textNode) {
    textNode.textContent = `Starts ${textNode.textContent.trim()}`;
  }
});

///////////////// FOOTER ///////////////

const yearSpan = document.getElementById("year");
const currentYear = new Date().getFullYear();

yearSpan.innerText = currentYear;

///////////////// PAGES /////////////////

// mailto
const mailtoAnchorArr = Array.from(document.querySelectorAll(".mailto"));

mailtoAnchorArr.forEach((mailtoAnchor) => {
  mailtoAnchor.href = "mailto:team@chaicode.com";
  console.log("first")
});

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
