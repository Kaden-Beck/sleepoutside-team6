import { getLocalStorage, setLocalStorage } from './utils.mjs';
import { getItemCount } from './cartCounter.mjs';
export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
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
    getItemCount();
  }

  renderProductDetails() {
  console.log(this.product); 

  productDetailsTemplate(this.product);

  if (this.product.discount === true || this.product.discountPercentage > 0) {
    const discountLabel = document.createElement("span");
    discountLabel.classList.add("discount-flag");
    discountLabel.textContent = "Sale!";

    const container = document.querySelector(".product-detail");
    if (container) {
      container.prepend(discountLabel);
    }
  }
}

}

function productDetailsTemplate(product) {
  document.querySelector('h2').textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector('#p-brand').textContent = product.Brand.Name;
  document.querySelector('#p-name').textContent = product.NameWithoutBrand;

  const productImage = document.getElementById('productImage');
  // Clean up path and force it to root-relative
  productImage.src = product.Images.PrimaryLarge;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById('productPrice').textContent = product.FinalPrice;
  document.getElementById('productColor').textContent =
    product.Colors[0].ColorName;
  document.getElementById('productDesc').innerHTML =
    product.DescriptionHtmlSimple;

  document.querySelector('#add-to-cart').dataset.id = product.Id;
}
