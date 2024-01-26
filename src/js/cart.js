import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems == null) {
    document.querySelector(".product-list").innerHTML =
      "Ready to fill your cart with camping wonders. Let the shopping adventure begin!";
  } else {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    document.getElementsByClassName("cart-footer")[0].style.display = "block";
    const totalPrice = cartItems.reduce(
      (accumulator, currentValue) => accumulator + currentValue.FinalPrice,
      0
    );
    // console.log(totalPrice); this line was set to test.
    document.getElementsByClassName(
      "cart-total"
    )[0].innerHTML = `Total: $${totalPrice.toString()}`;
  }
}

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

renderCartContents();
