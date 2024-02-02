import { getLocalStorage } from "./utils.mjs";

export default class ShoppingCart {
    constructor (key, parentElement){
        this.key = key;
        this.parentElement = parentElement;
    }

    renderCartContents(){
        const cartItems = getLocalStorage(this.key);
        let htmlItems = "";
        if (cartItems == null) {
            document.querySelector(".product-list").innerHTML =
              "Ready to fill your cart with camping wonders. Let the shopping adventure begin!";
        } else {
            htmlItems = cartItems.map((item) => cartItemTemplate(item));
        }
        document.getElementsByClassName("cart-footer")[0].style.display = "block";
        const totalPrice = cartItems.reduce(
            (accumulator, currentValue) => accumulator + (currentValue.FinalPrice * currentValue.Quantity),
            0
        );

        document.querySelector(this.parentElement).innerHTML = htmlItems.join("");
        document.getElementsByClassName("cart-total")[0].innerHTML = `Total: $${totalPrice.toString()}`;
    }
}

function cartItemTemplate(item) {
    //console.log(item);
    const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimarySmall}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.Quantity}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
  
    return newItem;
}