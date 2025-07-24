import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./Alert";
import darkModeToggle from "./darkModeToggle.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, element);
productList.init();

const myAlert = new Alert("../public/json/alerts.json");
myAlert.init();

darkModeToggle();
