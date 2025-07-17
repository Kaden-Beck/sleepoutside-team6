import { loadHeaderFooter, getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

loadHeaderFooter();


const productId = getParam('id');
const category = getParam('category');
console.log('Product ID:', productId);
console.log('Category:', category);


const dataSource = new ProductData();
const productDetails = new ProductDetails(productId, dataSource, category);
productDetails.init();


// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById('addToCart')
//   .addEventListener('click', addToCartHandler);
