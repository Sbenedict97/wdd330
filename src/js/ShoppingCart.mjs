import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function ShoppingCart() {
  const cartItems = getLocalStorage("so-cart");
  const outputEl = document.querySelector(".product-list");
  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);

  itemsInCart(cartItems);
  const total = calculateListTotal(cartItems);
  displayCartTotal(total);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="delete-product">❌</span>
</li>`;

  return newItem;
}

function itemsInCart(cartItems) {
  let numberInCart = 0;
  if (cartItems !== null) {
    for (let i = 0; i < cartItems.length; i++) {
      numberInCart += 1;
    }
  }

  showNumberOfCartItems(numberInCart);
}

function showNumberOfCartItems(list) {
  console.log("Total Items: ", list);

  if (list >= 1) {
    let el = document.getElementById("numberOfItems");
    el.classList.add("cart_numOfItems");
    document.getElementById("total_items_in_cart").innerHTML = list;
  }
}

function displayCartTotal(total) {
  if (total > 0) {
    // show our checkout button and total if there are items in the cart.
    document.querySelector(".list-footer").classList.remove("hide");
    document.querySelector(".list-total").innerText += ` $${total}`;
  } else {
    document.querySelector(".list-footer").classList.add("hide");
  }
}

function calculateListTotal(list) {
  const amounts = list.map((item) => item.FinalPrice);
  const total = amounts.reduce((sum, item) => sum + item, 0);
  return total;
}

