// Import the getParam function from the utils module
import { getParam } from "./utils.mjs";

// Import the ProductData and ProductDetails classes from their respective modules
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Create a new instance of the ProductData class with the category "tents"
const dataSource = new ProductData("tents");

// Get the product ID from the URL parameters using the getParam function
const productId = getParam("product");

// Create a new instance of the ProductDetails class with the obtained productId
// and the dataSource to fetch product details
const product = new ProductDetails(productId, dataSource);

// Initialize the product details by calling the init method
product.init();