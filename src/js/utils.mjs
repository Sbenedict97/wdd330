// Function to select a single element in the DOM using a CSS selector
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Function to retrieve data from local storage by key
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Function to store data in local storage by key
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Function to retrieve a specific parameter from the URL query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// Function to render a list using a template function and insert it into the DOM
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);
  // Clear parentElement if clear flag is set to true
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// Function to insert HTML content into the DOM using a template
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  // Call callback function with data if provided
  if (callback) {
    callback(data);
  }
}

// Function to asynchronously load a template from a given path
async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// Function to dynamically load the header and footer into a page
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

// Function to set a click event listener on an element
export function setClick(selector, callback) {
  // Add event listeners for touchend and click events
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
