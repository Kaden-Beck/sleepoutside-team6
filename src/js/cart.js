import { getLocalStorage } from './utils.mjs';




function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.FinalPrice * (item.quantity || 1),
    0
  );

  document.getElementById('cart-total').innerText = `Total: $${cartTotal.toFixed(2)}`;
}




function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='/product_pages/?product=${item.Id}'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
