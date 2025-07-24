import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./Alert";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const myList = new ProductList(category, dataSource, listElement);
myList.init();

const myAlert = new Alert("../public/json/alerts.json");
myAlert.init();

const pageHeading = document.querySelector("h2");
pageHeading.innerHTML = `Top Products: ${category}`;
