import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from './utils.mjs';

function renderCartContents() {
<<<<<<< HEAD
  const cartItems = getLocalStorage('so-cart') || [];

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
=======
  const cartItems = getCartContents();

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  document.querySelectorAll('.remove-button').forEach((button) => {
    let buttonId = button.getAttribute('data-id');
    button.addEventListener('click', () => {
      removeItemById(buttonId);
      renderCartContents();
    });
  });
>>>>>>> origin/main

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.FinalPrice * (item.quantity || 1),
    0,
  );

  document.getElementById('cart-total').innerText =
    `Total: $${cartTotal.toFixed(2)}`;
}

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1 
    <span class='remove-button' data-id='${item.Id}'>
      <strong>X</strong>
    </span>
  </p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

<<<<<<< HEAD
renderCartContents();
=======
function getCartContents() {
  return getLocalStorage('so-cart') || [];
}

function removeItemById(itemId) {
  let cartContents = getCartContents();
  let removedItem = false;
  let index = 0;
  cartContents.forEach((item) => {
    if (item.Id == itemId && !removedItem) {
      removedItem = true;
    } else if (!removedItem) {
      index++;
    }
  });
  cartContents.splice(index, 1);
  setLocalStorage('so-cart', cartContents);
}

loadHeaderFooter();

renderCartContents();
>>>>>>> origin/main
