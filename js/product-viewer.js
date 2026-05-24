function openDrawer(product) {
  const drawer = document.getElementById("productDrawer");
  const overlay = document.getElementById("productDrawerOverlay");
  const content = document.getElementById("drawerContent");

  if (!product) return;

  content.innerHTML = `
    <img src="../wooden-toys/product-images/${product.image}" alt="${product.name}">

    <h2>${product.name}</h2>

    <div class="price">${product.price}</div>

    <p>${product.description}</p>

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
}

function closeDrawer() {
  document.getElementById("productDrawer").classList.remove("active");
  document.getElementById("productDrawerOverlay").classList.remove("active");
}

/* Close when clicking outside drawer */
document.addEventListener("click", function (e) {
  const drawer = document.getElementById("productDrawer");
  const overlay = document.getElementById("productDrawerOverlay");

  if (e.target === overlay) {
    closeDrawer();
  }
});
