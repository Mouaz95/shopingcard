




let cartItems = JSON.parse(localStorage.getItem('cartitems')) || [];

function addTocard(productCart) {
  const name = productCart.querySelector('.product-name').textContent;
  const priceText = productCart.querySelector('.product-price').textContent;
  const price = parseFloat(priceText.replace('$', ''));
  const imageSrc = productCart.querySelector('.product-image').src;

  const existingItem = cartItems.find((item) => item.name === name);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({
      name,
      price,
      quantity: 1,
      image: imageSrc
    });
  }

  updatelocalstorage();
  updatecartdisplay();
}

// Remove item from cart
function removeitem(thename) {
  cartItems = cartItems.filter((item) => item.name.trim().toLowerCase() !== thename.trim().toLowerCase());
  updatelocalstorage();
  updatecartdisplay();
}

// Update quantity of an item
function changequantity(itemName, change) {
  const item = cartItems.find((item) => item.name === itemName);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeitem(itemName);
    } else {
      updatelocalstorage();
      updatecartdisplay();
    }
  }
}

// Display cart items
function updatecartdisplay() {
  const cartlist = document.querySelector('.cart-items');
  const totalElement = document.querySelector('#total-price');
  const totalCount = document.querySelector('.cart-count');

  cartlist.innerHTML = '';

  let total = 0;
  let itemCount = 0;

  cartItems.forEach((item) => {
    total += item.price * item.quantity;
    itemCount += item.quantity;

    const li = document.createElement('li');
    li.classList.add('cart-item');
    li.innerHTML = `
      <img src="${item.image}" alt="" class="item-image">
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price} x ${item.quantity}</div>
      </div>
      <div class="quantity-controls">
        <button onclick="changequantity('${item.name}', -1)">-</button>
        <button onclick="changequantity('${item.name}', 1)">+</button>
      </div>
      <button class="remove" onclick="removeitem('${item.name}')">x</button>
    `;

    li.style.listStyle = 'none';
    cartlist.appendChild(li);
  });

  totalElement.textContent = total.toFixed(2);
  totalCount.textContent = itemCount;
}

// Store cart data in local storage
function updatelocalstorage() {
  localStorage.setItem('cartitems', JSON.stringify(cartItems));
}

// Open & Close Cart Modal
let carticon = document.querySelector('.cart-icon');
let cartmodel = document.querySelector('.card-model');
let cartclose = document.querySelector('.close-btn');

carticon.addEventListener('click', () => {
  cartmodel.classList.add("open-cart");
});

cartclose.addEventListener('click', () => {
  cartmodel.classList.remove("open-cart");
});

// Load cart items on page load
document.addEventListener('DOMContentLoaded', updatecartdisplay);






