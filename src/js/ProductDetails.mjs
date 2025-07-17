import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource, category) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.category = category;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId, this.category);
    console.log("Fetching product with ID:", this.productId);

    this.renderProductDetails();
    document.getElementById('add-to-cart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage('so-cart') || [];
    cartItems.push(this.product);
    setLocalStorage('so-cart', cartItems);
  }

  renderProductDetails() {
    console.log('Product to render:', this.product);
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  // Category (optional, fallback to empty string)
  document.querySelector('#p-category').textContent =
    product.Category ? product.Category.charAt(0).toUpperCase() + product.Category.slice(1) : '';

  // Brand (optional chaining)
  document.querySelector('#p-brand').textContent = product.Brand?.Name || '';

  // Name
  document.querySelector('#p-name').textContent = product.NameWithoutBrand || product.Name || '';

  // Image (handle both formats)
  const productImage = document.querySelector('#p-image');
  productImage.src = product.Image || product.Images?.PrimaryExtraLarge || 'default-image.jpg';
  productImage.alt = product.NameWithoutBrand || product.Name || '';

  // Price (fallback to USD if FinalPrice missing)
  const price = product.FinalPrice || product.ListPrice || product.SuggestedRetailPrice || 0;
  const euroPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Number(price) * 0.85);
  document.querySelector('#p-price').textContent = euroPrice;

  // Color (optional chaining)
  document.querySelector('#p-color').textContent = product.Colors?.[0]?.ColorName || '';

  // Description
  document.querySelector('#p-description').innerHTML = product.DescriptionHtmlSimple || '';

  // Add to cart button
  document.querySelector('#add-to-cart').dataset.id = product.Id;
}
