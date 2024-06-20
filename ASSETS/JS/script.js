// Array of product objects
const products = [
  {
    id: 1,
    name: "Product1",
    price: "10",
    image: ".\\ASSETS/images/IMG_1.jpeg",
  },
  {
    id: 2,
    name: "Product2",
    price: "20",
    image: ".\\ASSETS/images/IMG_2.jpeg",
  },
  {
    id: 3,
    name: "Product3",
    price: "30",
    image: ".\\ASSETS/images/IMG_3.jpeg",
  },
  {
    id: 4,
    name: "Product4",
    price: "40",
    image: ".\\ASSETS/images/IMG_4.jpeg",
  },
  {
    id: 5,
    name: "Product5",
    price: "10",
    image: ".\\ASSETS/images/IMG_5.jpeg",
  },
  {
    id: 6,
    name: "Product6",
    price: "20",
    image: ".\\ASSETS/images/IMG_6.jpeg",
  },
  {
    id: 7,
    name: "Product7",
    price: "30",
    image: ".\\ASSETS/images/IMG_7.jpeg",
  },
  {
    id: 8,
    name: "Product8",
    price: "40",
    image: ".\\ASSETS/images/IMG_8.jpeg",
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log(cart);

// Render products on the index page
if (document.getElementById("products")) {
  const productContainer = document.getElementById("products");
  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.className = "col-md-3 mb-4";

    productElement.innerHTML = `<div class="shadow">
          <img src="${product.image}" class="card-img-top rounded-circle "  alt="${product.name}">
          <div class="card-body text-white text-center">
            <h5 class="card-title ">${product.name}</h5>
            <p class="card-text">$${product.price}</p>
            <button class="btn btn-success" onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
        </div>`;
    productContainer.appendChild(productElement);
  });
}

// Render cart on cart page
if (document.getElementById("my-cart")) {
  updateCart();
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  cart.push(product);
  console.log(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCart() {
  const cartItemsContainer = document.getElementById("my-cart");
  const totalContainer = document.getElementById("total");

  if (cartItemsContainer && totalContainer) {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach((product, index) => {
      const cartItem = document.createElement("li");
      cartItem.className =
        "list-group-item d-flex justify-content-between align-items-center";
      cartItem.innerHTML = `<div class="cart-item-details">
            <img src="${product.image}" alt="${product.name}" class="img-thumbnail mr-3" style="width: 50px;">
            <span>${product.name} - $${product.price}</span>
          </div>
          <button class="btn btn-dark" onclick="removeFromCart(${index})">Remove</button>`;
      cartItemsContainer.appendChild(cartItem);
      total += parseFloat(product.price);
    });
    totalContainer.innerText = `TOTAL: $${total.toFixed(2)}`;
  }
}

function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.innerText = cart.length;
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  updateCartCount();
}

// Initial load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  if (document.getElementById("my-cart")) {
    updateCart();
  }
});
