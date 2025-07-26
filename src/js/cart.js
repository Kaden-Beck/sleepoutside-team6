import { getLocalStorage, setLocalStorage, loadElements } from './utils.mjs';
import { getItemCount } from './cartCounter.mjs';

loadElements();

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  getItemCount();

  // ✅ Quantity update listener
  document.querySelectorAll('.cart-qty').forEach((input) => {
    input.addEventListener('change', (e) => {
      const productId = e.target.dataset.id;
      const newQty = parseInt(e.target.value);

      let cart = getLocalStorage('so-cart') || [];
      cart = cart.map((item) => {
        if (item.Id === productId) {
          return { ...item, quantity: newQty };
        }
        return item;
      });

      setLocalStorage('so-cart', cart);
      renderCartContents(); // Re-render with updated data
    });
  });

  // ✅ Remove item listener
  document.querySelectorAll('.remove-item').forEach((button) => {
    button.addEventListener('click', (e) => {
      const span = e.target.closest('.remove-item');
      if (!span) return;

      const id = span.dataset.id;

      let cart = getLocalStorage('so-cart') || [];
      cart = cart.filter((item) => item.Id !== id);
      setLocalStorage('so-cart', cart);
      renderCartContents(); // Re-render without the removed item
    });
  });

  // ✅ Update total
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
    <img src='${item.Images.PrimaryMedium}' alt='${item.Name}'>
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>Quantity:
  <input type='number' class='cart-qty' data-id='${item.Id}' min='1' value='${item.quantity || 1}' />
    <span class='remove-item' data-id='${item.Id}'>
      <strong>X</strong>
    </span>
  </p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

renderCartContents();
