// Import the ProductData and ProductList classes from their respective modules
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Create a new instance of the ProductData class with the category "tents"
const dataSource = new ProductData("tents");

// Find the HTML element with the class "product-list"
const element = document.querySelector(".product-list");

// Create a new instance of the ProductList class with the category "Tents",
// the dataSource, and the HTML element to render the product list
const listing = new ProductList("Tents", dataSource, element);

// Initialize the product list by calling the init method
listing.init();
