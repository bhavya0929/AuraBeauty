// ================= CART SYSTEM =================

let cart = JSON.parse(localStorage.getItem("auraBeautyCart")) || [];


// ================= ADD PRODUCT TO CART =================

document.addEventListener("click", function (event) {

    const button = event.target.closest(".cart-btn");

    // Ignore buttons that are not product Add to Cart buttons
    if (!button || !button.closest(".product-card")) {
        return;
    }

    const productCard = button.closest(".product-card");

    const nameElement = productCard.querySelector("h3");
    const priceElement = productCard.querySelector(".new-price");
    const imageElement = productCard.querySelector(".product-image");

    if (!nameElement || !priceElement || !imageElement) {
        console.error("Product information is incomplete.");
       return;
    }

    const name = nameElement.textContent.trim();

    const priceText = priceElement.textContent;
    const price = parseInt(priceText.replace(/[^\d]/g, ""), 10);

   const image = imageElement.getAttribute("src");

     if (!name || !Number.isFinite(price) || price <= 0 || !image) {
         console.error("Product information is invalid.");
         return;
    }

    const existingProduct = cart.find(
        product => product.name === name
    );

    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });

    }

    saveCart();

    alert(name + " added to cart 🛒");

});
// ================= SAVE CART =================
function saveCart() {

    localStorage.setItem(
        "auraBeautyCart",
        JSON.stringify(cart)
    );

    updateCartCount();
    displayCart();
}
function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (!cartCount) {
        return;
    }

    const totalItems = cart.reduce(
        (total, product) => total + product.quantity,
        0
    );

    cartCount.textContent = totalItems;
}
// ================= DISPLAY CART =================

function displayCart() {

    const cartContainer =
        document.getElementById("cart-container");

    const cartTotal =
        document.getElementById("cart-total");

    if (!cartContainer || !cartTotal) {
        return;
    }

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">

                <i class="fa-solid fa-cart-shopping" aria-hidden="true"></i>

                <h3>Your cart is empty</h3>

                <p>
                    Add some beautiful products to your cart.
                </p>

                <a href="shop.html" class="cart-btn">
                    Continue Shopping
                </a>

            </div>
        `;

        cartTotal.textContent = "₹0";

        return;
    }

    let total = 0;

    cart.forEach((product, index) => {

        const productTotal =
            product.price * product.quantity;

        total += productTotal;

        cartContainer.innerHTML += `

            <div class="cart-item">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="cart-item-image"
                >

                <div class="cart-item-details">

                    <h3>${product.name}</h3>

                    <p>
                        Price: ₹${product.price}
                    </p>

                    <div class="quantity-control">

                     <button
                        class="quantity-btn"
                        aria-label="Decrease quantity of ${product.name}"
                        onclick="decreaseQuantity(${index})">
                        −
                    </button>   
                    
                        <span>
                            ${product.quantity}
                        </span>

                        <button
                            class="quantity-btn"
                            aria-label="Increase quantity of ${product.name}"
                            onclick="increaseQuantity(${index})">
                            +
                        </button>

                    </div>

                    <strong>
                        ₹${productTotal}
                    </strong>

                </div>

                <button
                    class="remove-cart"
                    aria-label="Remove ${product.name} from cart"
                    onclick="removeFromCart(${index})">

                    <i class="fa-solid fa-trash" aria-hidden="true"></i>

                </button>

            </div>

        `;
    });

    cartTotal.textContent = "₹" + total;

}
// ================= INCREASE QUANTITY =================

function increaseQuantity(index) {

    cart[index].quantity += 1;

    saveCart();

}
// ================= DECREASE QUANTITY =================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity -= 1;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

}
// ================= REMOVE PRODUCT =================

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

}
// ================= LOAD CART =================
document.addEventListener("DOMContentLoaded", function () {

    displayCart();
    updateCartCount();

});
