import Alert from './Alert';
import { getItemCount } from "./cartCounter.mjs";
import darkModeToggle from './darkModeToggle.mjs'


// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

// get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

export function renderListWithTemplate(template, parentElement, list, position = 'afterbegin', clear = false) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = '';
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}



export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate('../partials/header.html');
  const headerElement = document.getElementById('main-header');
  renderWithTemplate(headerTemplate, headerElement);

  const footerTemplate = await loadTemplate('../partials/footer.html');
  const footerElement = document.getElementById('main-footer');
  renderWithTemplate(footerTemplate, footerElement);
}

export async function loadElements() {
  await loadHeaderFooter();
  // Create alerts
  const myAlert = new Alert("../public/json/alerts.json");
  myAlert.init();
  // Show item count
  getItemCount();
  // Dark Mode Toggle
  darkModeToggle();
}