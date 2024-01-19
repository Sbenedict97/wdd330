import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const datasource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductListing("tents", datasource, element);

listing.init();
