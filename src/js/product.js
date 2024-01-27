import { getParam, loadHeaderFooter } from "./utils.mjs";
import productDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const productId = getParam("product");

productDetails(productId);