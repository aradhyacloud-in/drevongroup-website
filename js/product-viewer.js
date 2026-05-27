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
let selectedQuantity = 1;


/* =========================================================
   1. OPEN DRAWER FUNCTION
========================================================= */
function openDrawer(product) {

  currentDrawerImageIndex = 0;
   
  const drawer = document.getElementById("productDrawer");
  const overlay = document.getElementById("productDrawerOverlay");
  const content = document.getElementById("drawerContent");

  if (!product) return;

  // SAFE IMAGE HANDLING
  if (!product.images || product.images.length === 0) {
    product.images = ["placeholder.jpg"];
  }

  let mainImage = product.images[0];
   selectedQuantity = 1;

content.innerHTML = `

<div class="product-modal-layout">

  <!-- LEFT SIDE -->
  <div class="product-modal-left">

    <!-- MAIN IMAGE -->
    <div class="main-image">
      <img id="mainProductImage"
           src="../wooden-toys/product-images/${mainImage}"
           alt="${product.name}">
    </div>

    <!-- THUMBNAILS -->
    <div class="thumbnails">

      ${product.images.map(img => `

        <img
          src="../wooden-toys/product-images/${img}"
          onclick="changeImage('${img}')"
          alt="thumbnail">

      `).join("")}

    </div>

  </div>

  <!-- RIGHT SIDE -->
  <div class="product-modal-right">

    <h2>${product.name}</h2>

    <div class="price">${product.price}</div>

    <p>${product.description}</p>

    <!-- PRODUCT NAVIGATION -->
    <div style="display:flex; gap:10px; margin-top:20px;">

     <button onclick="prevDrawerImage()" style="
        flex:1;
        padding:12px;
        border:none;
        background:#f2f2f2;
        cursor:pointer;
        border-radius:10px;
      ">

        ← Prev

      </button>

     <button onclick="nextDrawerImage()" style="
        flex:1;
        padding:12px;
        border:none;
        background:#f2f2f2;
        cursor:pointer;
        border-radius:10px;
      ">

        Next →

      </button>

    </div>

    <!-- QUANTITY -->
    <div class="quantity-selector">

      <button onclick="decreaseQuantity()">−</button>

      <span id="quantityValue">${selectedQuantity}</span>

      <button onclick="increaseQuantity()">+</button>

    </div>

    <!-- ADD TO CART -->
    <button
      onclick='addToCart(products[currentProductIndex], selectedQuantity)'
      style="
      margin-top:10px;
      padding:15px;
      width:100%;
      background:black;
      color:white;
      border:none;
      cursor:pointer;
      border-radius:12px;
      font-size:15px;
      font-weight:600;
    ">

      Add to Cart

    </button>

  </div>

</div>

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
     selectedQuantity = 1;

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

<!-- QUANTITY SELECTOR -->
         <div class="quantity-selector">
         
           <button onclick="decreaseQuantity()">−</button>
         
           <span id="quantityValue">${selectedQuantity}</span>
         
           <button onclick="increaseQuantity()">+</button>
         
         </div>

      <button onclick='addToCart(products[currentProductIndex], selectedQuantity)' style="
        margin-top:15px;
        padding:10px 15px;
        width:100%;
        background:black;
        color:white;
        border:none;
        cursor:pointer;
        border-radius:6px;
         ">
        Add to Cart
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
   4 CHANGE IMAGE (CLEAN ORIGINAL VERSION)
   ---------------------------------------------------------
   PURPOSE:
   - Only handle image switching
   - Keep existing fade effect
   - No extra logic that can break UI
========================================================= */

function changeImage(img) {

  const mainImg =
    document.getElementById("mainProductImage");

  if (!mainImg) return;

  /* FADE OUT */
  mainImg.style.opacity = "0";

  setTimeout(() => {

    mainImg.src =
      "../wooden-toys/product-images/" + img;

    /* FADE IN */
    mainImg.style.opacity = "1";

  }, 150);
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

/* =========================================================
   QUANTITY SYSTEM
========================================================= */

function increaseQuantity() {

  selectedQuantity++;

  updateQuantityUI();
}

function decreaseQuantity() {

  if (selectedQuantity > 1) {
    selectedQuantity--;
  }

  updateQuantityUI();
}

function updateQuantityUI() {

  const quantityElement =
    document.getElementById("quantityValue");

  if (!quantityElement) return;

  quantityElement.innerText = selectedQuantity;
}

/* =========================================================
   DRAWER IMAGE NAVIGATION
========================================================= */

let currentDrawerImageIndex = 0;

/* NEXT IMAGE */
function nextDrawerImage() {

  const product =
    products[currentProductIndex];

  if (!product || !product.images) return;

  currentDrawerImageIndex++;

  if (
    currentDrawerImageIndex >=
    product.images.length
  ) {
    currentDrawerImageIndex = 0;
  }

  updateDrawerMainImage(product);
}

/* PREVIOUS IMAGE */
function prevDrawerImage() {

  const product =
    products[currentProductIndex];

  if (!product || !product.images) return;

  currentDrawerImageIndex--;

  if (currentDrawerImageIndex < 0) {

    currentDrawerImageIndex =
      product.images.length - 1;
  }

  updateDrawerMainImage(product);
}

/* UPDATE MAIN IMAGE */
function updateDrawerMainImage(product) {

  const mainImage =
    document.getElementById("mainProductImage");

  if (!mainImage) return;

  mainImage.src =
    "../wooden-toys/product-images/" +
    product.images[currentDrawerImageIndex];
}

function clearActiveThumbs(thumbContainer) {
    const thumbs = thumbContainer.querySelectorAll(".thumbnail");
    thumbs.forEach(t => t.classList.remove("active-thumb"));
}

function setActiveThumb(thumb) {
    thumb.classList.add("active-thumb");
}
