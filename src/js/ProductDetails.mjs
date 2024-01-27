import { setLocalStorage, getLocalStorage } from "./utils.mjs";

// Function to generate HTML template for product details
function productDetailsTemplate(product) {
  // Calculate discount percentage
  let discount = 100 - ((100 / product.SuggestedRetailPrice) * product.FinalPrice);
  discount = parseInt(discount);

  // Generate HTML template
  return `<section class="product-detail">
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image}"
      alt="Image of ${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice} (${discount}% off the Recommended Retail Price)</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
      ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  </section>`;
}

// Class definition for ProductDetails
export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId; // Product ID
    this.product = {}; // Object to store product details
    this.dataSource = dataSource; // Data source for product details
  }

  // Method to initialize the product details
  async init() {
    // Use data source to get details for the current product
    this.product = await this.dataSource.findProductById(this.productId);
    // Render the product details HTML
    this.renderProductDetails("main");
    // Add event listener to "Add to Cart" button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this)); // Using .bind(this) to ensure correct context
  }

  // Method to add product to cart
  addToCart() {
    let oldCart = getLocalStorage("so-cart") || []; // Get existing cart from local storage
    oldCart.push(this.product); // Add current product to cart
    setLocalStorage("so-cart", oldCart); // Store updated cart in local storage
  }

  // Method to render product details HTML
  renderProductDetails(selector) {
    const element = document.querySelector(selector); // Select parent element
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product) // Insert product details HTML into parent element
    );
  }
}
