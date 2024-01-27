// Importing functions from utils.mjs
import { getParam, loadHeaderFooter } from "./utils.mjs";
// Importing ProductData and ProductDetails classes from respective files
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Load header and footer for the page
loadHeaderFooter();

// Create an instance of ProductData class with category "tents"
const dataSource = new ProductData("tents");
// Get the productId from the URL query parameters
const productId = getParam("product");

// Create an instance of ProductDetails class with productId and dataSource
const product = new ProductDetails(productId, dataSource);
// Initialize the product details
product.init();