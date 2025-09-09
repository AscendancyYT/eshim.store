const products = [
  { id: 1, name: "Brawl Pass", price: 69000, emoji: "🎟️" },
  { id: 2, name: "Brawl Pass Plus", price: 129000, emoji: "✨" },
  { id: 3, name: "Pro Pass", price: 199000, emoji: "🔥" },
  { id: 4, name: "Building an Iron Farm", price: 26000, emoji: "⛏️" },
  { id: 5, name: "Building a Shulker Farm", price: 34000, emoji: "📦" },
  { id: 6, name: "Minecraft Licence", price: 350000, emoji: "🎮" },
];

let cart = [];

function formatPrice(price) {
  return price.toLocaleString("uz-UZ") + " so'm";
}

function initStore() {
  renderProducts();
  createFloatingElements();
  setupScrollEffect();
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
            <div class="product-image">${product.emoji}</div>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">${formatPrice(product.price)}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                ADD TO CART
            </button>
        </div>
    `
    )
    .join("");
}

// Add to cart functionality
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();

  // Add visual feedback
  const button = event.target;
  button.style.transform = "scale(0.95)";
  button.innerHTML = "ADDED!";
  setTimeout(() => {
    button.style.transform = "scale(1)";
    button.innerHTML = "ADD TO CART";
  }, 500);
}

// Update cart UI
function updateCartUI() {
  const cartCount = document.getElementById("cartCount");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  cartCount.textContent = totalItems;

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <div>
                <div>${item.name}</div>
                <small>Qty: ${item.quantity} × ${formatPrice(
        item.price
      )}</small>
            </div>
            <button onclick="removeFromCart(${
              item.id
            })" style="background: none; border: none; color: #ff0055; cursor: pointer;">✕</button>
        </div>
    `
    )
    .join("");

  cartTotal.textContent = `Total: ${formatPrice(totalPrice)}`;
}

// Remove from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartUI();
}

// Toggle cart sidebar
function toggleCart() {
  const sidebar = document.getElementById("cartSidebar");
  sidebar.classList.toggle("open");
}

// Checkout function
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  alert(
    `Thank you for your purchase! Total: ${formatPrice(
      total
    )}\n\nThis is a demo - no actual payment processed.`
  );

  cart = [];
  updateCartUI();
  toggleCart();
}

// Smooth scroll to products
function scrollToProducts() {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

// Create floating elements
function createFloatingElements() {
  const container = document.querySelector(".floating-elements");

  setInterval(() => {
    const element = document.createElement("div");
    element.className = "floating-element";
    element.style.left = Math.random() * 100 + "%";
    element.style.animationDelay = "0s";
    element.style.animationDuration = Math.random() * 10 + 10 + "s";

    if (Math.random() > 0.5) {
      element.style.background = "rgba(255, 0, 255, 0.6)";
    }

    container.appendChild(element);

    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }, 15000);
  }, 200);
}

// Setup scroll effect for navbar
function setupScrollEffect() {
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// Submit contact form
function submitContactForm(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Simulate form submission
  const submitBtn = document.querySelector(".submit-btn");
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML = '<span>Sending...</span><div class="btn-glow"></div>';
  submitBtn.disabled = true;

  setTimeout(() => {
    alert(
      `Thank you ${name}! Your message has been sent successfully. We'll get back to you within 24 hours.`
    );
    document.getElementById("contactForm").reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 2000);
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  initStore();

  // Add contact form listener
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", submitContactForm);
  }
});

// Close cart when clicking outside
document.addEventListener("click", (e) => {
  const sidebar = document.getElementById("cartSidebar");
  const cartIcon = document.querySelector(".cart-icon");

  if (
    !sidebar.contains(e.target) &&
    !cartIcon.contains(e.target) &&
    sidebar.classList.contains("open")
  ) {
    sidebar.classList.remove("open");
  }
});
