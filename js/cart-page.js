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
   let totalItems = 0;
   let subtotal = 0;

  cart.forEach((item, index) => {
      totalItems += item.quantity;
      
      /* REMOVE ₹ SYMBOL FOR CALCULATION */
      const numericPrice =
        Number(item.price.replace(/[^\d]/g, ""));
      
      subtotal += numericPrice * item.quantity;
     
    html += `
      <div class="cart-item">

        <img src="../wooden-toys/product-images/${item.image}">

        <div class="cart-info">
          <h3>${item.name}</h3>

         <div class="cart-quantity">

           <button onclick="decreaseCartQuantity(${index})">
             −
           </button>
         
           <span>${item.quantity}</span>
         
           <button onclick="increaseCartQuantity(${index})">
             +
           </button>
         
         </div>
          
          <p>${item.price}</p>

          <button onclick="removeFromCart(${index})">
            Remove
          </button>
        </div>

      </div>
    `;
  });

  container.innerHTML = html;
   document.getElementById("summaryItems").innerText =
   totalItems;
   
   document.getElementById("summaryTotal").innerText =
     "₹" + subtotal;
}

/* =========================================
   REMOVE ITEM
========================================= */

function removeFromCart(index) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCartPage();
   updateCartCount();
}
/* =========================================
   INCREASE CART QUANTITY
========================================= */

function increaseCartQuantity(index) {

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  cart[index].quantity++;

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCartPage();

  updateCartCount();
}


/* =========================================
   DECREASE CART QUANTITY
========================================= */

function decreaseCartQuantity(index) {

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCartPage();

  updateCartCount();
}
