// Import the setLocalStorage function from the utils.mjs file
import { setLocalStorage } from "./utils.mjs";

// Function that generates the HTML template for product details
function productDetailsTemplate(product) {
  return `<section class="product-detail"> 
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
      ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  </section>`;
}

// Class that handles product details
export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {}; // Object that will store the product details
    this.dataSource = dataSource;
  }

  // Initialization method
  async init() {
    // Get product details from the data source
    this.product = await this.dataSource.findProductById(this.productId);

    // Render product details in the element with the selector "main"
    this.renderProductDetails("main");

    // Add a click event to the "Add to Cart" button to call the addToCart method
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  // Method executed when clicking the "Add to Cart" button
  addToCart() {
    // Add the product to the cart using the setLocalStorage function
    setLocalStorage("so-cart", this.product);
  }

  // Method that renders product details in the element specified by the selector
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    // Insert the HTML template of the product details at the beginning of the element
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }
}