import { getLocalStorage } from "./utils.mjs";

// Function to generate HTML template for a single cart item
function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

// Class definition for ShoppingCart
export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key; // Key to retrieve cart items from local storage
    this.parentSelector = parentSelector; // Selector for parent element where cart items will be rendered
  }

  // Method to render the contents of the shopping cart
  renderCartContents() {
    // Retrieve cart items from local storage
    const cartItems = getLocalStorage(this.key);
    // Generate HTML templates for each cart item
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    // Render HTML items in the parent element
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
  }
}