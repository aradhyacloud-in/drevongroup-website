console.log("shop.js loaded");

let categories = [];
let products = [];
let activeCategory = "all";
let searchQuery = "";

/* =========================================================
   INIT
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  loadData();
   console.log("initSearch running");
  initSearch();
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
   applyFilters();
  })

  .catch(err => {

    console.error("Data load error:", err);

    const grid = document.getElementById("productGrid");

    if (grid) {

      grid.innerHTML = `
        <p style="
          text-align:center;
          color:red;
          padding:40px;
        ">
          Failed to load products
        </p>
      `;
    }
  });
}

/* =========================================================
   OPEN DRAWER
========================================================= */
function openDrawerById(id) {

  const index =
    products.findIndex(p => p.id === id);

  if (index === -1) return;

  currentProductIndex = index;

  openDrawer(products[index]);
}

/* =========================================================
   RENDER CATEGORY FILTERS
========================================================= */
function renderFilters() {

  const container =
    document.querySelector(".category-filters");

  if (!container) return;

  let html = `
    <button
      class="${activeCategory === "all" ? "active" : ""}"
      onclick="setCategory('all')">

      All Toys

    </button>
  `;

  categories.forEach(cat => {

    html += `
      <button
        class="${activeCategory === cat.slug ? "active" : ""}"
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

  const grid =
    document.getElementById("productGrid");

  if (!grid) return;

  grid.innerHTML = "";

  let filteredProducts = [];

  if (slug === "all") {

    filteredProducts = products;

  } else {

    filteredProducts =
      products.filter(p => p.category === slug);
  }

  /* EMPTY STATE */
  if (!filteredProducts.length) {

    grid.innerHTML = `
      <div style="
        grid-column:1/-1;
        text-align:center;
        padding:60px;
        color:#777;
      ">
        <h3>No products yet</h3>
        <p>
          This category will be updated soon.
        </p>
      </div>
    `;

    return;
  }

  /* PRODUCTS */
  filteredProducts.forEach(p => {

    const image =
      (p.images && p.images.length)
        ? p.images[0]
        : "placeholder.jpg";

    grid.innerHTML += `

      <div
        class="product-card"
        onclick="openDrawerById('${p.id}')">

        ${getBadgeByCategory(p.category)}

        <!-- IMAGE WRAPPER -->
        <div class="product-image-wrapper">

          <!-- PREV -->
          <button
            class="card-image-nav left"
            onclick="event.stopPropagation(); prevCardImage('${p.id}')">

            ←

          </button>

          <!-- IMAGE -->
          <img
            id="cardImage-${p.id}"
            src="../wooden-toys/product-images/${image}"
            alt="${p.name}"
            loading="lazy">

          <!-- NEXT -->
          <button
            class="card-image-nav right"
            onclick="event.stopPropagation(); nextCardImage('${p.id}')">

            →

          </button>

        </div>

        <!-- INFO -->
        <div class="product-info">

          <h3>${p.name}</h3>

          <p class="price">${p.price}</p>

          <p class="desc">${p.description}</p>

          <!-- QUANTITY -->
          <div class="grid-quantity">

            <button
              onclick="event.stopPropagation(); decreaseGridQty('${p.id}')">

              −

            </button>

            <span id="gridQty-${p.id}">
              1
            </span>

            <button
              onclick="event.stopPropagation(); increaseGridQty('${p.id}')">

              +

            </button>

          </div>

          <!-- ADD TO CART -->
          <button
            class="grid-cart-btn"
            onclick="event.stopPropagation(); addGridProductToCart('${p.id}')">

            Add to Cart

          </button>

        </div>

      </div>
    `;
  });
}

/* =========================================================
   CATEGORY BADGES
========================================================= */
function getBadgeByCategory(category) {

  switch(category) {

    case "early-explorers":
      return `<div class="product-badge">Sensory Play</div>`;

    case "little-builders":
      return `<div class="product-badge">Motor Skills</div>`;

    case "heritage-culture":
      return `<div class="product-badge">Heritage Toy</div>`;

    case "nature-decor":
      return `<div class="product-badge">Nursery Decor</div>`;

    case "educational-montessori":
      return `<div class="product-badge">Montessori</div>`;

    default:
      return "";
  }
}

/* =========================================================
   GRID QUANTITY SYSTEM
========================================================= */
let gridQuantities = {};

/* INCREASE */
function increaseGridQty(productId) {

  if (!gridQuantities[productId]) {
    gridQuantities[productId] = 1;
  }

  gridQuantities[productId]++;

  updateGridQtyUI(productId);
}

/* DECREASE */
function decreaseGridQty(productId) {

  if (!gridQuantities[productId]) {
    gridQuantities[productId] = 1;
  }

  if (gridQuantities[productId] > 1) {
    gridQuantities[productId]--;
  }

  updateGridQtyUI(productId);
}

/* UPDATE UI */
function updateGridQtyUI(productId) {

  const qtyElement =
    document.getElementById(`gridQty-${productId}`);

  if (!qtyElement) return;

  qtyElement.innerText =
    gridQuantities[productId] || 1;
}

/* =========================================================
   GRID ADD TO CART
========================================================= */
function addGridProductToCart(productId) {

  const product =
    products.find(p => p.id === productId);

  if (!product) return;

  const qty =
    gridQuantities[productId] || 1;

  addToCart(product, qty);
}

/* =========================================================
   CARD IMAGE SLIDER
========================================================= */
let cardImageIndexes = {};

/* NEXT IMAGE */
function nextCardImage(productId) {

  const product =
    products.find(p => p.id === productId);

  if (!product || !product.images) return;

  if (cardImageIndexes[productId] == null) {
    cardImageIndexes[productId] = 0;
  }

  cardImageIndexes[productId]++;

  if (
    cardImageIndexes[productId] >=
    product.images.length
  ) {
    cardImageIndexes[productId] = 0;
  }

  updateCardImage(productId);
}

/* PREVIOUS IMAGE */
function prevCardImage(productId) {

  const product =
    products.find(p => p.id === productId);

  if (!product || !product.images) return;

  if (cardImageIndexes[productId] == null) {
    cardImageIndexes[productId] = 0;
  }

  cardImageIndexes[productId]--;

  if (cardImageIndexes[productId] < 0) {

    cardImageIndexes[productId] =
      product.images.length - 1;
  }

  updateCardImage(productId);
}

/* UPDATE CARD IMAGE */
function updateCardImage(productId) {

  const product =
    products.find(p => p.id === productId);

  if (!product) return;

  const imageElement =
    document.getElementById(`cardImage-${productId}`);

  if (!imageElement) return;

  const currentIndex =
    cardImageIndexes[productId] || 0;

  imageElement.src =
    "../wooden-toys/product-images/" +
    product.images[currentIndex];
}

/* =========================================================
   SEARCH FUNCTIONALITY
========================================================= */
function initSearch() {

  const input = document.getElementById("searchInput");
  const icon = document.getElementById("searchIcon");

  console.log("Search init:", input, icon); // DEBUG

  if (!input) return;

  input.addEventListener("input", () => {

 searchQuery = input.value.toLowerCase().trim();
   applyFilters();
  });

  if (icon) {
    icon.addEventListener("click", () => {

      searchQuery = input.value.toLowerCase().trim();

      if (searchQuery === "") {
        renderProducts(activeCategory);
      } else {
        applyFilters();
      }
    });
  }
}

/* APPLY CATEGORY + SEARCH TOGETHER */
function applyFilters() {

  let filtered = products;

  /* CATEGORY FILTER */
  if (activeCategory !== "all") {
    filtered = filtered.filter(
      p => p.category === activeCategory
    );
  }

  /* SEARCH FILTER */
  if (searchQuery) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery)
    );
  }

  renderFilteredProducts(filtered, activeCategory);
}

/* RENDER FILTERED PRODUCTS (SEARCH + CATEGORY) */

function renderFilteredProducts(list, category) {

  const grid = document.getElementById("productGrid");

  if (!grid) return;

  grid.innerHTML = "";

  if (!list.length) {

    grid.innerHTML = `
      <div style="
        grid-column:1/-1;
        text-align:center;
        padding:60px;
        color:#777;
      ">
        <h3>No products found</h3>
        <p>Try a different search or category</p>
      </div>
    `;

    return;
  }

  list.forEach(p => {

    const image =
      (p.images && p.images.length)
        ? p.images[0]
        : "placeholder.jpg";

    grid.innerHTML += `

      <div
        class="product-card"
        onclick="openDrawerById('${p.id}')">

        ${getBadgeByCategory(p.category)}

        <div class="product-image-wrapper">

          <button class="card-image-nav left"
            onclick="event.stopPropagation(); prevCardImage('${p.id}')">
            ←
          </button>

          <img
            id="cardImage-${p.id}"
            src="../wooden-toys/product-images/${image}"
            alt="${p.name}"
            loading="lazy">

          <button class="card-image-nav right"
            onclick="event.stopPropagation(); nextCardImage('${p.id}')">
            →
          </button>

        </div>

        <div class="product-info">

          <h3>${p.name}</h3>
          <p class="price">${p.price}</p>
          <p class="desc">${p.description}</p>

        </div>

      </div>
    `;
  });
}
