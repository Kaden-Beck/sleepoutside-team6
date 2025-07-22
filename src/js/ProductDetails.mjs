import { getLocalStorage, setLocalStorage } from './utils.mjs';

//dynamically import all the tent images
// const tentImages = import.meta.glob('../images/tents/*.{jpg,png,jpeg}', {
//   eager: true,
//   import: 'default',
// });

// function getProductImage(product) {
//   const imageFilename = product.Image.split('/').pop().toLowerCase();

//   for (const [path, url] of Object.entries(tentImages)) {
//     if (path.toLowerCase().endsWith(imageFilename)) {
//       return url;
//     }
//   }

//   return '/images/fallback.jpg'; // optional fallback
// }


export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails(); 
      document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage('so-cart') || [];
    cartItems.push(this.product);
    setLocalStorage('so-cart', cartItems);
  }

  addProductToWishlist() {
    const wishlistItems = getLocalStorage('so-wishlist') || [];
    
    // Verify if wishlisted item has already been wishlisted
    const alreadyWishlisted = wishlistItems.some(item => item.Id === this.product.Id);

    if (alreadyWishlisted) {
      alert('This product has already been wishlisted.');
      return;
    }

    wishlistItems.push(this.product);
    setLocalStorage('so-wishlist', wishlistItems);
    alert('Product has been added to wishlist!');
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector('h2').textContent = product.Brand.Name;
  document.querySelector('h3').textContent = product.NameWithoutBrand;

  const productImage = document.getElementById('productImage');
  // Clean up path and force it to root-relative
  productImage.src = product.Images.PrimaryLarge;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById('addToCart').dataset.id = product.Id;

  // Add Wishlist Button
  const wishlistAddButton = document.createElement('button');
  wishlistAddButton.id = 'addToWishlist';
  wishlistAddButton.textContent = 'Add this to your Wishlist!';
  
  const productDetails = document.querySelector('.product-details');
  productDetails.appendChild(wishlistAddButton);
}
