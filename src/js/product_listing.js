import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { getParam, loadElements } from './utils.mjs';

loadElements();

// Render products by category
const category = getParam('category');
const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');
const myList = new ProductList(category, dataSource, listElement);

myList.init();

// Update heading to match products
const pageHeading = document.querySelector('h2');

pageHeading.innerHTML = `Top Products: ${category}`;
