import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
      this.totalItems = 0;
    }
  
    init() {
      this.list = getLocalStorage(this.key);
      this.calculateItemSummary();
    }
  
    calculateItemSummary() {
      // calculate and display the total amount of the items in the cart, and the number of items.
      const summaryElement = document.querySelector(
        this.outputSelector + " #cartTotal"
      );
      const itemNumElement = document.querySelector(
        this.outputSelector + " #num-items"
      );
      this.totalItems = this.list.reduce((accumulator, item) => accumulator + item.Quantity, 0);
      itemNumElement.innerText = this.totalItems;
      // calculate the total of all the items in the cart
      const amounts = this.list.map((item) => (item.FinalPrice * item.Quantity));
      this.itemTotal = amounts.reduce((sum, item) => sum + item);
      summaryElement.innerText = "$" + this.itemTotal.toFixed(2);
    }
  
    calculateOrdertotal() {
      // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
      this.shipping = 10 + ((this.totalItems - 1) * 2);
      this.tax = (this.shipping + this.itemTotal) * 0.06;
      this.orderTotal = this.itemTotal + this.tax + this.shipping;
      // display the totals.
      this.displayOrderTotals();
    }
  
    displayOrderTotals() {
      // once the totals are all calculated display them in the order summary page
      const shipping = document.querySelector(this.outputSelector + " #shipping");
        const tax = document.querySelector(this.outputSelector + " #tax");
        const orderTotal = document.querySelector(
        this.outputSelector + " #orderTotal"
        );
        shipping.innerText = "$" + this.shipping.toFixed(2);
        tax.innerText = "$" + this.tax.toFixed(2);
        orderTotal.innerText = "$" + this.orderTotal.toFixed(2);
    }
  }
