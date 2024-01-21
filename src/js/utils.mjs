// Function to select the first element matching a CSS selector within a given parent element (default is document)
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Function to retrieve data from localStorage and parse it as JSON
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Function to store data in localStorage after converting it to a JSON string
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Function to retrieve a query parameter from the current URL
export function getParam(param) {
  // Get the full query string from the URL
  const queryString = window.location.search;
  // Parse the query string into a URLSearchParams object
  const urlParams = new URLSearchParams(queryString);
  // Get the value of the specified parameter
  const product = urlParams.get(param);
  return product;
}

// Function to render a list using a provided template function and insert it into a parent element
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  // Generate an array of HTML strings by mapping the template function over the list
  const htmlStrings = list.map(templateFn);

  // If clear is true, empty the content of the parent element before inserting the new content
  if (clear) {
    parentElement.innerHTML = "";
  }

  // Insert the HTML strings into the parent element at the specified position
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// Function to set click event listeners with touch event fallback
export function setClick(selector, callback) {
  // Add a touchend event listener to handle touch events
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });

  // Add a click event listener to handle click events
  qs(selector).addEventListener("click", callback);
}


