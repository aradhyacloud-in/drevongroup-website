let categories = [];

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});

function loadProducts() {
  fetch("/data/wooden-toys.json")
    .then(res => res.json())
    .then(data => {
      categories = data.categories;
      renderFilters();
      renderProducts("all");
    })
    .catch(err => console.error("JSON Load Error:", err));
}

function renderFilters() {
  const container = document.querySelector(".category-filters");

  let html = `<button onclick="renderProducts('all')">All Toys</button>`;

  categories.forEach(cat => {
    html += `<button onclick="renderProducts('${cat.slug}')">${cat.name}</button>`;
  });

  container.innerHTML = html;
}

function renderProducts(slug) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = "";

  let products = [];

  if (slug === "all") {
    categories.forEach(cat => {
      products.push(...cat.products);
    });
  } else {
    const category = categories.find(c => c.slug === slug);
    products = category ? category.products : [];
  }

  products.forEach(p => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="/wooden-toys/product-images/${p.image}" alt="${p.name}">
        
        <div class="product-info">
          <h3>${p.name}</h3>
          <p class="price">${p.price}</p>
          <p class="desc">${p.description}</p>
        </div>
      </div>
    `;
  });
}
