
let categories = [];
let products = [];
let activeCategory = "all";

/* =========================================================
   INIT
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  loadData();
});

/* =========================================================
   LOAD JSON DATA
========================================================= */
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

    const grid = document.getElementById("productGrid");
    if (grid) {
      grid.innerHTML = `
        <p style="text-align:center;color:red;">
          Failed to load products
        </p>
      `;
    }
  });
}

/* =========================================================
   OPEN DRAWER BY ID
========================================================= */
function openDrawerById(id) {
  const index = products.findIndex(p => p.id === id);

  if (index === -1) return;

  currentProductIndex = index;   // IMPORTANT: sync index
  openDrawer(products[index]);
}

/* =========================================================
   RENDER CATEGORY FILTERS
========================================================= */
function renderFilters() {
  const container = document.querySelector(".category-filters");
  if (!container) return;

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

/* =========================================================
   CHANGE CATEGORY
========================================================= */
function setCategory(slug) {
  activeCategory = slug;
  renderFilters();
  renderProducts(slug);
}

/* =========================================================
   RENDER PRODUCTS
========================================================= */
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

  /* EMPTY STATE */
  if (!filteredProducts.length) {
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

  /* PRODUCTS */
  filteredProducts.forEach(p => {

    const image = (p.images && p.images.length)
      ? p.images[0]
      : "placeholder.jpg";

    grid.innerHTML += `
      <div class="product-card" onclick="openDrawerById('${p.id}')">

        <img 
          src="../wooden-toys/product-images/${image}" 
          alt="${p.name}" 
          loading="lazy">

        <div class="product-info">
          <h3>${p.name}</h3>
          <p class="price">${p.price}</p>
          <p class="desc">${p.description}</p>
        </div>

      </div>
    `;
  });
}
