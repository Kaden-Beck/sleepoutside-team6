import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import Alert from './Alert';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

// Render products by category
const category = getParam('category');
const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');
const myList = new ProductList(category, dataSource, listElement);
myList.init();

// Update heading to match products
const pageHeading = document.querySelector('h2');
pageHeading.innerHTML = `Top Products: ${category}`;

// Create Alers
const myAlert = new Alert('../public/json/alerts.json');
myAlert.init();
