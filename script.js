const products = [
  {name: "iPhone 15 Pro", price: 6999, img: "ip15.jpg"},
  {name: "iPhone 15", price: 4999, img: "ip15p.jpg"},
  {name: "iPhone 14 Pro Max", price: 5999, img: "ip14.jpg"}
];

let cart = [];

function renderProducts(list) {
  const container = document.getElementById('product-list');
  if(!container) return;
  container.innerHTML = '';
  list.forEach((p, index) => {
    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.innerHTML = `
      <div class="card shadow product-card">
        <img src="${p.img}" class="card-img-top" alt="${p.name}">
        <div class="card-body">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text">Cena: ${p.price} PLN</p>
          <button class="btn btn-outline-primary w-100" onclick="addToCart(${index})">Kup teraz</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function addToCart(index) {
  const product = products[index];
  const existing = cart.find(item => item.name === product.name);
  if(existing) {
    existing.quantity += 1;
  } else {
    cart.push({...product, quantity: 1});
  }
  renderCart();
  const cartCanvas = new bootstrap.Offcanvas(document.getElementById('cartCanvas'));
  cartCanvas.show();
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  renderCart();
}

function changeQuantity(name, delta) {
  const item = cart.find(i => i.name === name);
  if(!item) return;
  item.quantity += delta;
  if(item.quantity <= 0) removeFromCart(name);
  renderCart();
}

function renderCart() {
  const container = document.getElementById('cart-items');
  const total = document.getElementById('cart-total');
  container.innerHTML = '';
  let sum = 0;
  cart.forEach(item => {
    sum += item.price * item.quantity;
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      <div>
        ${item.name} x${item.quantity} 
        <button class="btn btn-sm btn-success ms-2" onclick="changeQuantity('${item.name}', 1)">+</button>
        <button class="btn btn-sm btn-warning ms-1" onclick="changeQuantity('${item.name}', -1)">-</button>
        <button class="btn btn-sm btn-danger ms-1" onclick="removeFromCart('${item.name}')">Usuń</button>
      </div>
      <span>${item.price * item.quantity} PLN</span>
    `;
    container.appendChild(li);
  });
  total.textContent = sum;
}

renderProducts(products);

const searchInput = document.getElementById('search');
if(searchInput) {
  searchInput.addEventListener('input', () => {
    const filtered = products.filter(p => p.name.toLowerCase().includes(searchInput.value.toLowerCase()));
    renderProducts(filtered);
  });
}
