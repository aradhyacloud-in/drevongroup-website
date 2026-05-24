let categories = [];
let products = [];

document.addEventListener("DOMContentLoaded", () => {
  loadData();
});

function loadData() {
  Promise.all([
    fetch("../data/wooden-toys.json").then(res => res.json()),
    fetch("../data/wooden-toys-products.json").then(res => res.json())
  ])
  .then(([catData, prodData]) => {
    categories = catData.categories;
    products = prodData;

    renderFilters();
    renderProducts("all");
  })
  .catch(err => console.error("Data load error:", err));
}

function renderFilters() {
  const container = document.querySelector(".category-filters");

  let html = `<button onclick="renderProducts('all')">All Toys</button>`;

  categories.forEach(cat => {
    html += `
      <button onclick="renderProducts('${cat.slug}')">
        ${cat.name}
      </button>
    `;
  });

  container.innerHTML = html;
}

function renderProducts(slug) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = "";

  let filteredProducts = [];

  if (slug === "all") {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter(p => p.category === slug);
  }

  if (filteredProducts.length === 0) {
    grid.innerHTML = `
      <div style="text-align:center;padding:40px;color:#666;">
        No products available in this category yet.
      </div>
    `;
    return;
  }

  filteredProducts.forEach(p => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="../wooden-toys/product-images/${p.image}" alt="${p.name}">

        <div class="product-info">
          <h3>${p.name}</h3>
          <p class="price">${p.price}</p>
          <p class="desc">${p.description}</p>
        </div>
      </div>
    `;
  });
}
