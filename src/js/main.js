
import { loadHeaderFooter } from './utils.mjs';;
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import Alert from './Alert';

loadHeaderFooter();

const dataSource = new ProductData('tents');
const element = document.querySelector('.product-list');
const productList = new ProductList('tents', dataSource, element);

const alert = new Alert('../public/json/alerts.json');
alert.init();

productList.init(); 
