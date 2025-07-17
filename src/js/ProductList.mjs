import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product, category) {
    const imgSrc = product.Image ? product.Image : product.Images?.PrimaryExtraLarge || 'default-image.jpg';
    return `<li class='product-card'>
        <a href='../product_pages/index.html?id=${product.Id}&category=${category}'>
            <img src='${imgSrc}' alt='Image of ${product.Name}'>
            <h2 class='card__brand'>${product.Brand?.Name || ''}</h2>
            <h3 class='card__name'>${product.Name}</h3>
            <p class='product-card__price'>$${product.FinalPrice}</p>
        </a>
    </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const products = await this.dataSource.getData(this.category);
        console.log('products:', products); // Should log an array of tents or backpacks
        if (Array.isArray(products)) {
            this.renderList(products);
        } else {
            console.error('No product data found for category:', this.category);
        }
        document.querySelector('.title').textContent = this.category;
    }
    // async init() {
    //     const list = await this.dataSource.getData(this.category);
    //     this.renderList(list);
    //     document.querySelector('.title').textContent = this.category;
    // }

    renderList(list) {
        renderListWithTemplate((product) => productCardTemplate(product, this.category), this.listElement, list);
    }


}