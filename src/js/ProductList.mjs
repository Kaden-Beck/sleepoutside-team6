import { renderListWithTemplate } from './utils.mjs';
import { showQuickView } from './quickView.mjs';

function productCardTemplate(product) {
  return `
    <li class='product-card'>
      <a href='/product_pages/?product=${product.Id}'>
        <img src='${product.Images.PrimaryMedium}' alt='${product.Name}'>
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class='product-card__price'>$${product.FinalPrice}</p>
      </a>
      <button class="quick-view-btn" data-product-id="${product.Id}">Quick View</button>

        <div class="quick-view-details" style="display: none;">
        <p>${product.DescriptionHtmlSimple || "No description available"}</p>
        <p class="product-color">${product.Colors[0].ColorName}</p>
        <p class="product-price">$${product.FinalPrice}</p>
        <button class="close-quick-view-btn">Close</button>
      </div>
    </li>
  `;
}


export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    document.querySelector('title').textContent = 'Sleep Outside | ' + this.category;

    this.quickViewListeners();
  }

  renderList(list) {
    // const htmlStrings = list.map(productCardTemplate);
    // this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));

    // apply use new utility function instead of the commented code above
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  quickViewListeners() {
  this.listElement.addEventListener('click', (event) => {
    if (event.target && event.target.matches('.quick-view-btn')) {
      const productId = event.target.getAttribute('data-product-id');
      this.showQuickView(productId, event.target);
    }

    if (event.target && event.target.matches('.close-quick-view-btn')) {
      const productCard = event.target.closest('.product-card');
      this.closeQuickView(productCard);
    }
  });
}

  showQuickView(productId, button) {
    const productCard = button.closest('.product-card');
    const quickViewDetails = productCard.querySelector('.quick-view-details');
    quickViewDetails.style.display = 'block';
    productCard.classList.add('quick-view-open');
  }

  closeQuickView(productCard) {
    const quickViewDetails = productCard.querySelector('.quick-view-details');
    quickViewDetails.style.display = 'none';
    productCard.classList.remove('quick-view-open');
  }
}