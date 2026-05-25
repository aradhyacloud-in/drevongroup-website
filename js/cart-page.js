/* =========================================
   RENDER CART PAGE
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();
});

function renderCartPage() {

  const container = document.getElementById("cartItems");

  if (!container) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // EMPTY CART
  if (cart.length === 0) {
    container.innerHTML = `
      <div style="
        text-align:center;
        padding:60px;
        color:#777;
      ">
        <h2>Your cart is empty</h2>
        <p>Add some beautiful wooden toys.</p>
      </div>
    `;
    return;
  }

  // RENDER ITEMS
  let html = "";

  cart.forEach((item, index) => {

    html += `
      <div class="cart-item">

        <img src="../wooden-toys/product-images/${item.image}">

        <div class="cart-info">
          <h3>${item.name}</h3>

          <p>Quantity: ${item.quantity}</p>

          <p>${item.price}</p>

          <button onclick="removeFromCart(${index})">
            Remove
          </button>
        </div>

      </div>
    `;
  });

  container.innerHTML = html;
}

/* =========================================
   REMOVE ITEM
========================================= */

function removeFromCart(index) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCartPage();
}
