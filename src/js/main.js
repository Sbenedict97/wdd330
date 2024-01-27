import ProductData from "./ProductData.mjs";

import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");




loadHeaderFooter();
