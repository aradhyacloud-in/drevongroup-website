/* =========================================================
   PRODUCT VIEWER SYSTEM (DRAWER)
   - Opens product detail drawer
   - Handles image gallery
   - Handles close behavior
   ========================================================= */


/* =========================================================
   1. OPEN DRAWER FUNCTION
   Called from shop.js when product is clicked
========================================================= */
function openDrawer(product) {
  const drawer = document.getElementById("productDrawer");
  const overlay = document.getElementById("productDrawerOverlay");
  const content = document.getElementById("drawerContent");

  if (!product) return;

  // Set first image as main image
  let mainImage = product.images[0];

  /* =========================================================
     2. RENDER PRODUCT INSIDE DRAWER
  ========================================================= */
  content.innerHTML = `
    <!-- MAIN IMAGE -->
    <div class="main-image">
      <img id="mainProductImage"
           src="../wooden-toys/product-images/${mainImage}"
           alt="${product.name}">
    </div>

    <!-- THUMBNAIL GALLERY -->
    <div class="thumbnails">
      ${product.images.map(img => `
        <img src="../wooden-toys/product-images/${img}"
             onclick="changeImage('${img}')"
             alt="thumbnail">
      `).join("")}
    </div>

    <!-- PRODUCT NAME -->
    <h2>${product.name}</h2>

    <!-- PRICE -->
    <div class="price">${product.price}</div>

    <!-- DESCRIPTION -->
    <p>${product.description}</p>

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

  /* =========================================================
     3. OPEN DRAWER + OVERLAY
  ========================================================= */
  drawer.classList.add("active");
  overlay.classList.add("active");
}


/* =========================================================
   4. CLOSE DRAWER FUNCTION
========================================================= */
function closeDrawer() {
  document.getElementById("productDrawer").classList.remove("active");
  document.getElementById("productDrawerOverlay").classList.remove("active");
}


/* =========================================================
   5. IMAGE SWITCH FUNCTION (THUMBNAILS)
========================================================= */
function changeImage(img) {
  document.getElementById("mainProductImage").src =
    "../wooden-toys/product-images/" + img;
}


/* =========================================================
   6. CLICK OUTSIDE TO CLOSE DRAWER
========================================================= */
document.addEventListener("click", function (e) {
  const overlay = document.getElementById("productDrawerOverlay");

  if (e.target === overlay) {
    closeDrawer();
  }
});
