const products = [
  { name: "iPhone 15 Pro", price: 6999, img: "ip15.jpg" },
  { name: "iPhone 15", price: 4999, img: "ip15p.jpg" },
  { name: "iPhone 14 Pro Max", price: 5999, img: "ip14.jpg" }
];

function renderProducts(list) {
  const container = document.getElementById('product-list');
  if (!container) return;
  container.innerHTML = '';
  
  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.innerHTML = `
      <div class="card shadow product-card h-100">
        <img src="${p.img}" class="card-img-top" alt="${p.name}">
        <div class="card-body text-center">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text">Cena: ${p.price} PLN</p>
          <a href="#" class="btn btn-outline-primary">Kup teraz</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

renderProducts(products);

const searchInput = document.getElementById('search');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    renderProducts(filtered);
  });
}
