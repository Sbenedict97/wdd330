// Import the getLocalStorage function from the utils.mjs file
import { getLocalStorage } from "./utils.mjs";

// Function that renders the contents of the shopping cart
function renderCartContents() {
  // Retrieve cart items from local storage
  const cartItems = getLocalStorage("so-cart");

  // Generate HTML for each cart item using the cartItemTemplate function
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  // Set the innerHTML of the element with the class "product-list" to the joined HTML items
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

// Function that generates HTML for a single cart item
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

// Call the renderCartContents function to display the cart contents
renderCartContents();
