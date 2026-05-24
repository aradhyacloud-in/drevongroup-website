let categories = [];

document.addEventListener("DOMContentLoaded", () => {
  loadShopData();
});

function loadShopData() {
  fetch("../data/wooden-toys.json")
    .then(res => res.json())
    .then(data => {
      categories = data.categories;

      renderFilters();
      renderProducts("all");
    })
    .catch(err => console.error("JSON Load Error:", err));
}

function renderFilters() {
  const container = document.querySelector(".category-filters");

  let html = `<button onclick="renderProducts('all')">All Toys</button>`;

  categories.forEach(cat => {
    if (cat.slug !== "all") {
      html += `<button onclick="renderProducts('${cat.slug}')">${cat.name}</button>`;
    }
  });

  container.innerHTML = html;
}

function renderProducts(slug) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = "";

  // Since no products yet, show placeholder UI
  let message = "";

  if (slug === "all") {
    message = "Select a category to view products.";
  } else {
    const category = categories.find(c => c.slug === slug);
    message = `No products added yet in "${category?.name || "this category"}"`;
  }

  grid.innerHTML = `
    <div style="
      text-align:center;
      padding:40px;
      color:#666;
      font-size:16px;
    ">
      ${message}
    </div>
  `;
}
