<<<<<<< HEAD
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const dataSource = new ProductData('tents');
const element = document.querySelector(".product-list");
const productList = new ProductList("Tents", dataSource, element);

productList.init();
=======
import { loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import Alert from './Alert';

loadHeaderFooter();

const dataSource = new ProductData('tents');
const element = document.querySelector('.product-list');
const productList = new ProductList('tents', dataSource, element);

productList.init();

const myAlert = new Alert('../public/json/alerts.json');
myAlert.init();

// ✅ Dark mode toggle
import darkModeToggle from './darkModeToggle.mjs'; 
darkModeToggle();
>>>>>>> origin/main
