window.removeFromCart = removeFromCart;
window.removeProductByName = removeProductByName;

let cartData = [];

function updateCartPage() {
  cartData = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.querySelector("#cartContainer");
  const emptyCartContainer = document.querySelector(".empty-cart");

  if (cartData.length === 0) {
    cartContainer.style.display = "none";
    if (emptyCartContainer) {
      emptyCartContainer.style.display = "block";
    }
  } else {
    cartContainer.style.display = "block";
    if (emptyCartContainer) {
      emptyCartContainer.style.display = "none";
    }

    cartContainer.innerHTML = "";

    cartData.forEach((movie) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("product-in-cart");
      const price = movie.on_sale ? movie.prices.sale_price / 100 : movie.prices.price / 100;
    
      cartItem.innerHTML = `
        <div class="content-wrap">
          <div class="your-purchase">
            <img src="${movie.images[0].src}" alt="${movie.name}" />
            <div class="your-purchase-content">
              <h3>${movie.name}</h3>
              <h3>Price: ${formatPrice(price)}</h3>
              <div class="remove-product-container">
                <h4 class="remove-product" onclick="removeFromCart('${movie.name}')">Remove</h4>
              </div>
            </div>
            <div class="total-price" id="total_${movie.name}">${formatPrice(price * (movie.quantity || 1))}</div>
          </div>
        </div>
      `;
      cartContainer.appendChild(cartItem);
    
      const removeProductButton = cartItem.querySelector(".remove-product");
      removeProductButton.removeEventListener("click", () => removeProductByName(movie.name));
      removeProductButton.addEventListener("click", () => removeFromCart(movie.name));
    });
  }
}

function formatPrice(price) {
  return price.toLocaleString('nb-NO', { style: 'currency', currency: 'NOK', minimumFractionDigits: 2 });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartPage();
  updateCartItemCount();
});


export function updateCartItemCount() {
  cartData = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemCount = document.getElementById("cartItemCount");

  if (cartData.length > 0) {
    if (cartItemCount) {
      const totalQuantity = cartData.reduce((total, movie) => total + (movie.quantity || 1), 0);
      cartItemCount.textContent = totalQuantity;
      cartItemCount.style.display = "inline-block";
    }
  } else {
    if (cartItemCount) {
      cartItemCount.style.display = "none";
    }
  }
}

const backToLastPageLink = document.getElementById("backToLastPage");

if (backToLastPageLink) {
  backToLastPageLink.addEventListener("click", () => {
    window.history.back();
  });
}

function updateCartSummary() {
  cartData = JSON.parse(localStorage.getItem("cart")) || [];
  const yourOrderContainer = document.getElementById("yourOrderContainer");
  const totalDetailsContainer = document.getElementById("totalDetails");

  yourOrderContainer.innerHTML = "";
  totalDetailsContainer.innerHTML = "";

  let orderTotal = 0;
  let shippingTotal = 0;

  cartData.forEach((movie) => {
    let price;
    if (movie.on_sale) {
      price = movie.prices.sale_price / 100; 
    } else {
      price = movie.prices.price / 100;
    }

    orderTotal += price;

    const checkoutProduct = document.createElement("div");
    checkoutProduct.classList.add("checkout-product");
    checkoutProduct.innerHTML = `
      <h4>${movie.name}</h4>
      <h4>${formatPrice(price)}</h4>
    `;
    yourOrderContainer.appendChild(checkoutProduct);
  });

  let total = orderTotal + shippingTotal;

  totalDetailsContainer.innerHTML = `
    <div>
      <p>${formatPrice(orderTotal)}</p>
      <p>${formatPrice(shippingTotal)}</p>
      <p>${formatPrice(total)}</p>
    </div>
  `;
}


document.addEventListener("DOMContentLoaded", () => {
  updateCartPage();
  updateCartItemCount();
  updateCartSummary();
});

function updateCart() {
  updateCartPage();
  updateCartItemCount();
  updateCartSummary();
}

function updateCartItem(name, quantity) {
  const movie = cartData.find((m) => m.name === name);

  if (movie) {
    movie.quantity = parseInt(quantity) || 1;

    const cartItem = document.querySelector(`.product-in-cart h3:contains('${name}')`);
    if (cartItem) {
      const quantityInput = cartItem.parentElement.querySelector("input[name='quantity']");
      const priceElement = cartItem.parentElement.querySelector(".total-price");

      if (quantityInput) {
        quantityInput.value = movie.quantity;
      }

      if (priceElement) {
        const totalPrice = movie.prices.price * movie.quantity;
        priceElement.textContent = `$${(totalPrice / 100).toFixed(2)}`;
      }
    }

    updateCartSummary();
  }
}

export function removeFromCart(name) {
  let existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  const indexToRemove = existingCart.findIndex((movie) => movie.name === name);

  if (indexToRemove !== -1) {
    existingCart.splice(indexToRemove, 1);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    updateCart();
    removeProductFromSummary(name);
  }
}

export function removeProductFromSummary(name) {
  const checkoutProducts = document.querySelectorAll('.checkout-product h4');
  
  checkoutProducts.forEach((product) => {
    if (product.textContent.includes(name)) {
      const checkoutProductToRemove = product.closest('.checkout-product');
      if (checkoutProductToRemove) {
        checkoutProductToRemove.remove();
        updateTotalDetails();
      }
    }
  });
}

export function removeProductByName(name) {
  const cartItemToRemove = document.querySelector(`.product-in-cart h3:contains('${name}')`);
  if (cartItemToRemove) {
    cartItemToRemove.closest('.product-in-cart').remove();
  }
}

