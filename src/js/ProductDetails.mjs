export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
      
    }
    

    addProductToCart(product) {
        const cart = getLocalStorage('so-cart') || [];
        cart.push(product);
        setLocalStorage('so-cart', cart);
      }
    
    async init() {
        document.getElementById('addToCart')
            .addEventListener('click', this.addToCart.bind(this));
        this.addProductToCart(this.productId);
    }

    addProductToCart(product) {
        const cart = getLocalStorage('so-cart') || [];
        cart.push(product);
        setLocalStorage('so-cart', cart);
    }
      
    renderProductDetails() {

    }
    
  }
  