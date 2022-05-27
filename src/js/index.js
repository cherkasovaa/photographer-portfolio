import i18Obj from './translate.js';

const burgerMenu = document.querySelector('.burger-menu');
const menu = document.querySelector('.navigation__list');
const navLinks = document.querySelectorAll('.navigation__item');
const imagesContainer = document.querySelector('.portfolio-items');
const seasonSwitchButtons = document.querySelectorAll('.btn_portfolio');
const languageSwitchButtons = document.querySelectorAll('.switch-language__btn');
const textData = document.querySelectorAll('[data-i18Obj]');
const switchThemeBtn = document.querySelector('.switch-theme');
const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
const skills = document.querySelector('.skills');
const portfolio = document.querySelector('.portfolio');
const video = document.querySelector('.video');
const price = document.querySelector('.price');
const contacts = document.querySelector('.contacts');
const footer = document.querySelector('.footer');
const navigationsLinks = document.querySelectorAll('.list');
const icons = document.querySelectorAll('.icon');
const titles = document.querySelectorAll('.title');
const contactTitle = document.querySelector('.contact-form__title');
const buttons = document.querySelectorAll('button');
const textareas = document.querySelectorAll('.contact-form__item');
const rsschool = document.querySelector('.rsschool');
const github = document.querySelector('.github');

const sectionsArray = [header, hero, skills, portfolio, video, price, contacts, footer];
const elements = [navigationsLinks, icons, titles, buttons, rsschool, github, textareas, burgerMenu, contactTitle];

const DARK = 'dark';
const LIGHT = 'light';
const ACTIVE = 'active';
const CHECK = 'check';
const LIGHT_THEME = 'light-theme';
const LIGHT_THEME_ICON = 'light-theme-icon';
const LIGHT_THEME_SECTION = 'light-theme-section';

let storageLang = getSettings('lang') || 'en';
let isLightTheme = getSettings('lightTheme') || DARK;

window.onload = loadSettings();

/*
*
* Burger menu
*
*/

burgerMenu.addEventListener('click', toggleMenu);
navLinks.forEach((link) => link.addEventListener('click', closeMenu));

function toggleMenu(e) {
  toggleClass(burgerMenu, ACTIVE);
  toggleClass(menu, ACTIVE);
}

function closeMenu(e) {
  if (burgerMenu.classList.contains(ACTIVE)) {
    burgerMenu.classList.remove(ACTIVE);
    menu.classList.remove(ACTIVE);
  }
}

/*
*
* Change images into portfolio section
*
*/

seasonSwitchButtons.forEach((btn) => btn.addEventListener('click', switchGallery));

function switchGallery(e) {
  const season = e.target;
  const lastSeason = imagesContainer.id;
  const node = createGallery(season.id);

  if (season.id !== lastSeason) {
    destroy();
    switchActiveBtn(season);

    imagesContainer.appendChild(node);
    imagesContainer.id = season.id;
  }
}

function switchActiveBtn(season) {
  seasonSwitchButtons.forEach((btn) => btn.classList.remove(ACTIVE));
  season.classList.add(ACTIVE);
}

function destroy() {
  const children = imagesContainer.children;
  let i = children.length - 1;

  while (children.length !== 0) {
    children[i].remove();
    i--;
  }
}

function defaultGallery() {
  const season = 'winter';
  const node = createGallery(season);
  imagesContainer.appendChild(node);
}

function createGallery(season) {
  const size = 6;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < size; i++) {
    fragment.append(createImageBlock(season, i + 1));
  }

  return fragment;
}

function createImageBlock(season, index) {
  const container = document.createElement('div');
  container.className = 'portfolio-item';

  const img = document.createElement('img');
  img.src = `./assets/img/portfolio/${season}/${index}.jpg`;
  img.setAttribute('alt', `picture of ${season}`);

  container.appendChild(img);

  return container;
}

/*
*
* switch languages
*
*/

languageSwitchButtons.forEach(btn => btn.addEventListener('click', switchLang));

function switchLang(e){
	const btn = e.target;
	const lang = btn.classList.contains(CHECK);
	
	if(!lang) {
		languageSwitchButtons.forEach(btn => btn.classList.remove(CHECK))
		btn.classList.add(CHECK);
    setSettings('lang', btn.id);
	}

  loadData(btn.id);
}

function loadSettings() {
  defaultGallery();

  languageSwitchButtons.forEach((btn) => checkActiveBtn(btn));

  loadData(storageLang);

  if (isLightTheme === LIGHT) {
    switchThemeBtn.classList.add(LIGHT_THEME_ICON);
    toggleLightTheme();
  }
}

function loadData(lang){
  textData.forEach((el, index) => {
    let text = i18Obj[`${lang}`][`${textData[index].dataset.i18obj}`];
    el.textContent = text;
  });
}

function checkActiveBtn(btn){
  storageLang === btn.id ? btn.classList.add(CHECK) 
                          : btn.classList.remove(CHECK)
}

/*
*
* Save settings
*
*/

function setSettings(key, value){
	window.localStorage.setItem(key, value);
}

function getSettings(key){
	return window.localStorage.getItem(key);
}

/*
*
*  Ripple effect
*
*/

buttons.forEach(btn => btn.addEventListener('click', function(e){
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
  
    const ripples = document.createElement('span');
    ripples.className = 'ripple';
  
    ripples.style.left = x + 'px';
    ripples.style.top = y + 'px';
  
    this.appendChild(ripples);
  
    setTimeout(() => ripples.remove(), 1000);
}));

/*
*
* switch theme
*
*/

switchThemeBtn.addEventListener('click', function(e){
  toggleClass(e.target, LIGHT_THEME_ICON);

  isLightTheme = switchThemeBtn.classList.contains(LIGHT_THEME_ICON) ? LIGHT : DARK;

  setSettings('lightTheme', isLightTheme);
  toggleLightTheme();
});

function toggleLightTheme(){
  sectionsArray.forEach((el) => toggleClass(el, LIGHT_THEME_SECTION));

  elements.forEach((el) => {
    el.length >= 1 ? el.forEach((item) => toggleClass(item, LIGHT_THEME)) : toggleClass(el, LIGHT_THEME);
  });
}

function toggleClass(elem, className){
  return elem.classList.toggle(`${className}`);
}
