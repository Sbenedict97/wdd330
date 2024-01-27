// Importing functions from utils.mjs
import { loadHeaderFooter, getParam } from "./utils.mjs";
// Importing ProductData and ProductList classes from respective files
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Load header and footer for the page
loadHeaderFooter();

// Get the category from the URL query parameters
const category = getParam("category");

// Create an instance of ProductData class
const dataSource = new ProductData();
// Select the element where the product listing will be rendered
const element = document.querySelector(".product-listing");
// Create an instance of ProductList class with category, dataSource, and element
const listing = new ProductList(category, dataSource, element);

// Initialize the product listing
listing.init();