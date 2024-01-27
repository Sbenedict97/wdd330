import { renderListWithTemplate } from "./utils.mjs";

// Function to generate HTML template for a single product card
function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

// Class definition for ProductListing
export default class ProductListing {
  constructor(category, dataSource, listElement) {
    // We pass in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.category = category; // Category of products
    this.dataSource = dataSource; // Data source for products
    this.listElement = listElement; // Element where product list will be rendered
  }

  // Method to initialize the product listing
  async init() {
    // Our dataSource will return a Promise, so we can use await to resolve it.
    const list = await this.dataSource.getData();
    // Filter the list of products
    const filteredList = filterProducts(list);
    // Render the filtered list
    this.renderList(filteredList);
  }

  // Method to render the list of products
  renderList(list) {
    // Render the list using the productCardTemplate and renderListWithTemplate function
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}

// Function to filter the list of products based on specific product IDs
function filterProducts(list) {
  return list.filter((product) => ["880RR", "985RF", "985PR", "344YJ"].includes(product.Id));
}