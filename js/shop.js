let categories = [];
let products = [];

function openDrawerById(id) {
  const product = products.find(p => p.id === id);
  openDrawer(product);
}

document.addEventListener("DOMContentLoaded", () => {
  loadData();
});

function loadData() {
  Promise.all([
    fetch("../data/wooden-toys.json").then(res => res.json()),
    fetch("../data/wooden-toys-products.json").then(res => res.json())
  ])
  .then(([catData, prodData]) => {

    categories = catData.categories || [];
    products = prodData || [];

    renderFilters();
    renderProducts("all");
  })
  .catch(err => {
    console.error("Data load error:", err);
    document.getElementById("productGrid").innerHTML =
      "<p style='text-align:center;color:red;'>Failed to load products</p>";
  });
}

let activeCategory = "all";

function renderFilters() {
  const container = document.querySelector(".category-filters");

  let html = `
    <button class="${activeCategory === 'all' ? 'active' : ''}"
    onclick="setCategory('all')">All Toys</button>
  `;

  categories.forEach(cat => {
    html += `
      <button class="${activeCategory === cat.slug ? 'active' : ''}"
      onclick="setCategory('${cat.slug}')">
        ${cat.name}
      </button>
    `;
  });

  container.innerHTML = html;
}

function setCategory(slug) {
  activeCategory = slug;
  renderFilters();
  renderProducts(slug);
}

function renderProducts(slug) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = "";

  let filteredProducts = [];

  if (slug === "all") {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter(p => {
    return p.category && p.category === slug;
    });
  }

  // ✅ EMPTY STATE (IMPORTANT UX FIX)
  if (filteredProducts.length === 0) {
    grid.innerHTML = `
      <div style="
        grid-column: 1 / -1;
        text-align: center;
        padding: 60px;
        color: #777;
      ">
        <h3 style="margin-bottom:10px;">No products yet</h3>
        <p>This category will be updated soon with new wooden toys.</p>
      </div>
    `;
    return;
  }

  // ✅ PRODUCT RENDER
  filteredProducts.forEach(p => {
    grid.innerHTML += `
      grid.innerHTML += `
      <div class="product-card" onclick="openDrawerById('${p.id}')">
        <img src="../wooden-toys/product-images/${p.image}" alt="${p.name} loading="lazy">

        <div class="product-info">
          <h3>${p.name}</h3>
          <p class="price">${p.price}</p>
          <p class="desc">${p.description}</p>
        </div>
      </div>
    `;
  });
}
