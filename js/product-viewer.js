
/* =========================================================
   PRODUCT VIEWER SYSTEM (DRAWER)
   - Opens product detail drawer
   - Handles image gallery
   - Handles close behavior
   - NOW: supports next/prev product switching
   ========================================================= */


/* =========================================================
   GLOBAL STATE
========================================================= */
let currentProductIndex = null;


/* =========================================================
   1. OPEN DRAWER FUNCTION
========================================================= */
function openDrawer(product) {
  const drawer = document.getElementById("productDrawer");
  const overlay = document.getElementById("productDrawerOverlay");
  const content = document.getElementById("drawerContent");

  if (!product) return;

  // SAFE IMAGE HANDLING
  if (!product.images || product.images.length === 0) {
    product.images = ["placeholder.jpg"];
  }

  let mainImage = product.images[0];

  content.innerHTML = `
    <!-- MAIN IMAGE -->
    <div class="main-image">
      <img id="mainProductImage"
           src="../wooden-toys/product-images/${mainImage}"
           alt="${product.name}">
    </div>

    <!-- THUMBNAILS -->
    <div class="thumbnails">
      ${product.images.map(img => `
        <img src="../wooden-toys/product-images/${img}"
             onclick="changeImage('${img}')"
             alt="thumbnail">
      `).join("")}
    </div>

    <!-- TITLE -->
    <h2>${product.name}</h2>

    <!-- PRICE -->
    <div class="price">${product.price}</div>

    <!-- DESCRIPTION -->
    <p>${product.description}</p>

    <!-- NAVIGATION BUTTONS (NEW) -->
    <div style="display:flex; gap:10px; margin-top:10px;">
      <button onclick="prevProduct()" style="
        flex:1;
        padding:10px;
        border:none;
        background:#eee;
        cursor:pointer;
        border-radius:6px;
      ">← Prev</button>

      <button onclick="nextProduct()" style="
        flex:1;
        padding:10px;
        border:none;
        background:#eee;
        cursor:pointer;
        border-radius:6px;
      ">Next →</button>
    </div>

    <!-- ACTION BUTTON -->
    <button style="
      margin-top:15px;
      padding:10px 15px;
      width:100%;
      background:black;
      color:white;
      border:none;
      cursor:pointer;
      border-radius:6px;
    ">
      Add to Cart (Coming Soon)
    </button>
  `;

  drawer.classList.add("active");
  overlay.classList.add("active");
  content.classList.add("drawer-content-show");
}


/* =========================================================
   2. UPDATE DRAWER (NEW - NO REOPENING)
========================================================= */
function updateDrawer(product) {
  const content = document.getElementById("drawerContent");

  if (!product) return;

  // START FADE OUT
  content.classList.remove("drawer-content-show");
  content.classList.add("drawer-content-fade");

  setTimeout(() => {

    // SAFE IMAGE HANDLING
    if (!product.images || product.images.length === 0) {
      product.images = ["placeholder.jpg"];
    }

    let mainImage = product.images[0];

    // UPDATE CONTENT
    content.innerHTML = `
      <div class="main-image">
        <img id="mainProductImage"
             src="../wooden-toys/product-images/${mainImage}">
      </div>

      <div class="thumbnails">
        ${product.images.map(img => `
          <img src="../wooden-toys/product-images/${img}"
               onclick="changeImage('${img}')">
        `).join("")}
      </div>

      <h2>${product.name}</h2>

      <div class="price">${product.price}</div>

      <p>${product.description}</p>

      <div style="display:flex; gap:10px; margin-top:10px;">
        <button onclick="prevProduct()" style="
          flex:1;
          padding:10px;
          border:none;
          background:#eee;
          cursor:pointer;
          border-radius:6px;
        ">← Prev</button>

        <button onclick="nextProduct()" style="
          flex:1;
          padding:10px;
          border:none;
          background:#eee;
          cursor:pointer;
          border-radius:6px;
        ">Next →</button>
      </div>

      <button style="
        margin-top:15px;
        padding:10px 15px;
        width:100%;
        background:black;
        color:white;
        border:none;
        cursor:pointer;
        border-radius:6px;
      ">
        Add to Cart (Coming Soon)
      </button>
    `;

    // FADE IN
    content.classList.remove("drawer-content-fade");
    content.classList.add("drawer-content-show");

  }, 150);
}

/* =========================================================
   3. CLOSE DRAWER
========================================================= */
function closeDrawer() {
  document.getElementById("productDrawer").classList.remove("active");
  document.getElementById("productDrawerOverlay").classList.remove("active");
}


/* =========================================================
   4. CHANGE IMAGE (THUMBNAILS)
========================================================= */
function changeImage(img) {
  const mainImg = document.getElementById("mainProductImage");

  if (!mainImg) return;

  mainImg.src = "../wooden-toys/product-images/" + img;
}


/* =========================================================
   5. CLICK OUTSIDE TO CLOSE
========================================================= */
document.addEventListener("click", function (e) {
  const overlay = document.getElementById("productDrawerOverlay");

  if (e.target === overlay) {
    closeDrawer();
  }
});


/* =========================================================
   6. NEXT / PREV PRODUCT (AMAZON STYLE)
========================================================= */
function nextProduct() {
  if (currentProductIndex === null) return;

  currentProductIndex = (currentProductIndex + 1) % products.length;
  updateDrawer(products[currentProductIndex]);
}

function prevProduct() {
  if (currentProductIndex === null) return;

  currentProductIndex =
    (currentProductIndex - 1 + products.length) % products.length;

  updateDrawer(products[currentProductIndex]);
}
