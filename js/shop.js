
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
      
      ${getBadgeByCategory(p.category)}
      
        
            <div class="product-image-wrapper">
            
              <!-- PREV IMAGE -->
              <button
                class="card-image-nav left"
                onclick="event.stopPropagation(); prevCardImage('${p.id}')">
            
                ←
            
              </button>
            
              <!-- PRODUCT IMAGE -->
              <img
                id="cardImage-${p.id}"
                src="../wooden-toys/product-images/${image}"
                alt="${p.name}"
                loading="lazy">
            
              <!-- NEXT IMAGE -->
              <button
                class="card-image-nav right"
                onclick="event.stopPropagation(); nextCardImage('${p.id}')">
            
                →
            
              </button>
            
            </div>
        
         
            <div class="product-info">
         
           <h3>${p.name}</h3>
         
           <p class="price">${p.price}</p>
         
           <p class="desc">${p.description}</p>
         
           <!-- GRID QUANTITY -->
           <div class="grid-quantity">
         
             <button onclick="event.stopPropagation(); decreaseGridQty('${p.id}')">
               −
             </button>
         
             <span id="gridQty-${p.id}">1</span>
         
             <button onclick="event.stopPropagation(); increaseGridQty('${p.id}')">
               +
             </button>
         
           </div>
         
           <!-- GRID ADD TO CART -->
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
   CATEGORY BADGE SYSTEM
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
   GRID PRODUCT QUANTITY SYSTEM
========================================================= */

let gridQuantities = {};

/* INCREASE GRID QTY */
function increaseGridQty(productId) {

  if (!gridQuantities[productId]) {
    gridQuantities[productId] = 1;
  }

  gridQuantities[productId]++;

  updateGridQtyUI(productId);
}

/* DECREASE GRID QTY */
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

/* ADD GRID PRODUCT TO CART */
function addGridProductToCart(productId) {

  const product =
    products.find(p => p.id === productId);

  if (!product) return;

  const quantity =
    gridQuantities[productId] || 1;

  addToCart(product, quantity);
}

/* =========================================================
   PRODUCT CARD IMAGE SLIDER
========================================================= */

let cardImageIndexes = {};

/* NEXT IMAGE */
function nextCardImage(productId) {

  const product =
    products.find(p => p.id === productId);

  if (!product || !product.images) return;

  if (!cardImageIndexes[productId]) {
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

  if (!cardImageIndexes[productId]) {
    cardImageIndexes[productId] = 0;
  }

  cardImageIndexes[productId]--;

  if (cardImageIndexes[productId] < 0) {
    cardImageIndexes[productId] =
      product.images.length - 1;
  }

  updateCardImage(productId);
}

/* UPDATE IMAGE */
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
