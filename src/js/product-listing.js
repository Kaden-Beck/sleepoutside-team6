import { loadHeaderFooter, getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

loadHeaderFooter();


const rawCategory = getParam('category');

//convert numeric category to the name of the category
const categoryMap = {
    0: 'tents',
    1: 'sleeping-bags',
    2: 'hammocks',
    3: 'backpacks'
};


const category = categoryMap[rawCategory] || rawCategory;

console.log('Resolved category:', category); // check that category is string

const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');
const myListing = new ProductList(category, dataSource, listElement);

myListing.init();