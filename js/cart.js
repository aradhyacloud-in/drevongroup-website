
/* =========================================
   CART SYSTEM
========================================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================================
   SAVE CART
========================================= */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

/* =========================================
   ADD TO CART
========================================= */
function addToCart(product, quantity = 1) {

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity
    });
  }

  saveCart();
 
}

/* =========================================
   UPDATE CART COUNT
========================================= */
function updateCartCount() {
  const countElement = document.getElementById("cartCount");

  if (!countElement) return;

  let total = 0;

  cart.forEach(item => {
    total += item.quantity;
  });

  countElement.innerText = total;
}

/* =========================================
   INIT CART COUNT
========================================= */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});
