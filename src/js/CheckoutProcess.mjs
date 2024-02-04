import { getLocalStorage, setLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  const simplifiedItems = items.map((item) =>{
    return{
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: item.Quantity,
    };
  });
  return simplifiedItems;
}

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
      this.calculateOrdertotal();
    }
  
    calculateItemSummary() {
      const numItems  = 0;      
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
      this.tax = this.itemTotal * 0.06;
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

    async checkout() {
    const formElement = document.forms["place_order"];
  
    const json = formDataToJSON(formElement);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);
    try {
      const res = await services.checkout(json);
      console.log(res);
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");
    } catch (err) {
      // get rid of any preexisting alerts.
      removeAllAlerts();
      for (let message in err.message) {
        alertMessage(err.message[message]);
      }
        console.log(err);
      }
    }
  }
