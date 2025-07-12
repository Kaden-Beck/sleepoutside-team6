import { getLocalStorage, setLocalStorage } from './utils.mjs';

//dynamically import all the tent images
const tentImages = import.meta.glob('../images/tents/*.{jpg,png,jpeg}', {
  eager: true,
  import: 'default',
});

function getProductImage(product) {
  const imageFilename = product.Image.split('/').pop().toLowerCase();

  for (const [path, url] of Object.entries(tentImages)) {
    if (path.toLowerCase().endsWith(imageFilename)) {
      return url;
    }
  }

  return "/images/fallback.jpg"; // optional fallback
}


export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails(); hy.
      document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage('so-cart') || [];
    cartItems.push(this.product);
    setLocalStorage('so-cart', cartItems);
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
  productImage.src = getProductImage(product);
  productImage.alt = product.NameWithoutBrand;

  document.getElementById('productPrice').textContent = product.FinalPrice;
  document.getElementById('productColor').textContent =
    product.Colors[0].ColorName;
  document.getElementById('productDesc').innerHTML =
    product.DescriptionHtmlSimple;

  document.getElementById('addToCart').dataset.id = product.Id;
}
