function updateCartCount() {
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cartData.length;

  const cartCountElement = document.getElementById("cartCount");
  if (cartCountElement) {
    cartCountElement.textContent = cartCount.toString();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});