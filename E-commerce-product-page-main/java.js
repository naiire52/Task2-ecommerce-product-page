let cart = [];
let total = 0;

const badgeEl = document.getElementById('badge');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkout-button');

const addToCartBtn = document.getElementById('addToCart');
const quantityEl = document.getElementById('quantity');

const priceEl = document.querySelector('.price-section .price');
const nameEl = document.querySelector('.product-details .product-text');
const carouselInner = document.querySelector('.carousel-inner');

// Helper: get currently selected product price (strip discount span)
function getCurrentPrice() {
  return parseFloat(priceEl.textContent.replace(/[^0-9\.]/g, '')) || 0;
}

// Helper: get current main carousel image src
function getCurrentProductImage() {
  const activeImage = document.querySelector('.carousel-item.active img');
  return activeImage ? activeImage.src : '';
}

function updateCartDisplay() {
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.textContent = "Your cart is empty.";
    cartTotalEl.style.display = 'none';
    checkoutBtn.style.display = 'none';
    badgeEl.textContent = '0';
    return;
  }

  cartTotalEl.style.display = 'block';
  checkoutBtn.style.display = 'block';

  cart.forEach((item, index) => {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.className = 'd-flex align-items-center mb-2';

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;
    img.style.width = '50px';
    img.classList.add('me-2');

    const name = document.createElement('div');
    name.textContent = `${item.name} x ${item.quantity}`;
    name.classList.add('flex-grow-1');

    const price = document.createElement('div');
    price.textContent = `Ksh${(item.price * item.quantity).toFixed(2)}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-sm btn-outline-danger ms-2';
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', () => {
      total -= item.price * item.quantity;
      cart.splice(index, 1);
      updateCartDisplay();
    });

    cartItemDiv.append(img, name, price, deleteBtn);
    cartItemsContainer.appendChild(cartItemDiv);
  });

  total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotalEl.textContent = `Total: Ksh${total.toFixed(2)}`;
  badgeEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Add to cart handler
addToCartBtn.addEventListener('click', () => {
  const quantity = parseInt(quantityEl.textContent);
  if (!quantity || quantity === 0) return;

  const productName = nameEl.textContent;
  const price = getCurrentPrice();
  const productImage = getCurrentProductImage();

  // Check if product is already in cart
  const existingIndex = cart.findIndex(item => item.name === productName);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      name: productName,
      image: productImage,
      price: price,
      quantity: quantity
    });
  }

  total += price * quantity;
  updateCartDisplay();

  // Reset quantity display
  quantityEl.textContent = 0;

  // Reset global quantity variable if needed (assuming commerce.js manages it)
  if(typeof quantity !== 'undefined') {
    quantity = 0;
  }
});

// Initialize cart display on page load
updateCartDisplay();

