
/* =========================================================
   PRODUCT VIEWER SYSTEM (DRAWER)
   - Opens product detail drawer
   - Handles image gallery
   - Handles close behavior
   ========================================================= */


/* =========================================================
   1. OPEN DRAWER FUNCTION
========================================================= */
function openDrawer(product) {
  const drawer = document.getElementById("productDrawer");
  const overlay = document.getElementById("productDrawerOverlay");
  const content = document.getElementById("drawerContent");

  if (!product) return;

  /* -------------------------------
     SAFETY CHECK
  ------------------------------- */
  if (!product.images || product.images.length === 0) {
    product.images = ["placeholder.jpg"];
  }

  let mainImage = product.images[0];

  /* =========================================================
     2. RENDER PRODUCT CONTENT
  ========================================================= */
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
     3. SHOW DRAWER
  ========================================================= */
  drawer.classList.add("active");
  overlay.classList.add("active");
}


/* =========================================================
   4. CLOSE DRAWER
========================================================= */
function closeDrawer() {
  const drawer = document.getElementById("productDrawer");
  const overlay = document.getElementById("productDrawerOverlay");

  drawer.classList.remove("active");
  overlay.classList.remove("active");
}


/* =========================================================
   5. CHANGE IMAGE (THUMBNAILS)
========================================================= */
function changeImage(img) {
  const mainImg = document.getElementById("mainProductImage");

  if (!mainImg) return;

  mainImg.src = "../wooden-toys/product-images/" + img;
}


/* =========================================================
   6. CLICK OUTSIDE TO CLOSE
========================================================= */
document.addEventListener("click", function (e) {
  const overlay = document.getElementById("productDrawerOverlay");

  if (e.target === overlay) {
    closeDrawer();
  }
});
