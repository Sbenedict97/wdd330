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
    }
  
    init() {
      this.list = getLocalStorage(this.key);
      this.calculateItemSummary();
    }
  
    calculateItemSummary() {
      const numItems  = 0;      
      // calculate and display the total amount of the items in the cart, and the number of items.
      this.list.forEach(element => {
        this.itemTotal += element.Quantity * element.FinalPrice;
        numItems += element.Quantity;
      });  
    }
  
    calculateOrdertotal() {
      // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
      // Tax = Subtotal * 0.06
      this.tax = (this.itemTotal * 0.06).toFixed(2);
      // Shipping = (numberItems * 2) + 8
      this.shipping = (this.list.length() * 2) + 8;
    
      // display the totals.
      this.displayOrderTotals();
    }
  
    displayOrderTotals() {
      // once the totals are all calculated display them in the order summary page
      this.orderTotal = (this.itemTotal + this.tax + this.shipping).toFixed(2);
    }
  }
