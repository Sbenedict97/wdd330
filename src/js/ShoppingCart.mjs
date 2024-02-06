import { getLocalStorage, setLocalStorage, updateSuperscriptAmount } from "./utils.mjs";

export default class ShoppingCart {
    constructor (key, parentElement){
        this.key = key;
        this.parentElement = parentElement;
        this.total = 0;
    }

    renderCartContents(){
        const cartItems = getLocalStorage(this.key);
        //console.log(cartItems);
        let htmlItems = "";
        if (cartItems == null || cartItems.length == 0) {
          document.querySelector(".product-list").innerHTML =
            "Ready to fill your cart with camping wonders. Let the shopping adventure begin!";
          // Make Total and Checkout invisible
          document.getElementsByClassName("cart-footer")[0].style.display = "none";
        } else {
          htmlItems = cartItems.map((item) => cartItemTemplate(item));
          // Make Total and Checkout visible
          document.getElementsByClassName("cart-footer")[0].style.display = "block";

          // Calculate Total
          /*const amounts = cartItems.map((item) => item.FinalPrice * item.Quantity);
          this.total = amounts.reduce((sum, item) => sum + item);*/
          this.total = calcTotal(cartItems);

          document.querySelector(this.parentElement).innerHTML = htmlItems.join("");
          document.getElementsByClassName("cart-total")[0].innerHTML = `Total: $${this.total.toFixed(2)}`;

          // Update Quantity in Cart
          const updateQuantity = document.querySelectorAll(".quantity-button");
          updateQuantity.forEach(function(item) {
            item.addEventListener("click", function(){
              
              if (item.className == "quantity-button remove-qty"){
                updateQtyElement(cartItems, this.id, "remove");
              } else {
                updateQtyElement(cartItems, this.id, "add");
              }
              window.location.reload();
              // or just edit html and cart
            });
          });
        }       
    }
}

function cartItemTemplate(item) {
    //console.log(item);
    const newItem = `<li class="cart-card divider">
    <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
      <img
        src="${item.Images.PrimarySmall}"
        alt="${item.Name}"
      />
    </a>
    <a href="/product_pages/index.html?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <div class="cart-card__quantity">
      <button id="${item.Id}" class="quantity-button remove-qty">-</button>
      <p class="cart-card__quantity">qty: ${item.Quantity}</p>
      <button id="${item.Id}" class="quantity-button add-qty" >+</button>
    </div>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
  
    return newItem;
}

function updateQtyElement(cart, id, action) {
  cart.forEach(element => {
    if(id == element.Id){
      // Remove 1
      if (action =="remove"){
        element.Quantity--;
        if (element.Quantity == 0){
          // Remove item from Cart
          const index = cart.indexOf(element);
          cart.splice(index,1);
        }
      } else { // Add 1
        element.Quantity++;
      }
      // Update HTML Quantity and Total
      // Or just reload page

      setLocalStorage("so-cart", cart);
      updateSuperscriptAmount();
    }
  });
}

function calcTotal(cart){
  const amounts = cart.map((item) => item.FinalPrice * item.Quantity);
  const total = amounts.reduce((sum, item) => sum + item);
  return total;
}