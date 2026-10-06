// Select all wishlist buttons
const wishlistButtons = document.querySelectorAll(".wishlist-btn");

// Get wishlist from localStorage
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Add click event to every heart button
wishlistButtons.forEach(button => {

    button.addEventListener("click", function () {

        const product = {
            id: this.dataset.id,
            name: this.dataset.name,
            price: this.dataset.price,
            image: this.dataset.image
        };

        // Check if already added
        const exists = wishlist.find(item => item.id === product.id);

        if (!exists) {
            wishlist.push(product);

            localStorage.setItem("wishlist", JSON.stringify(wishlist));

            alert(product.name + " added to wishlist ❤️");
        } else {
            alert("Already in wishlist!");
        }

    });

});

// =======================
// Display Wishlist Page
// =======================

const wishlistContainer = document.getElementById("wishlist-items");

if (wishlistContainer) {

    if (wishlist.length === 0) {

     wishlistContainer.innerHTML = `
    <p class="empty-wishlist">Your wishlist is empty.</p>
`;

    } else {

        wishlistContainer.innerHTML = "";

        wishlist.forEach(product => {

            wishlistContainer.innerHTML += `
                <div class="product-card">

                    <img
                       src="${product.image}"
                       alt="${product.name}"
                       class="product-image"
                    >
                    <h3>${product.name}</h3>

                    <div class="price">
                        ₹${product.price}
                    </div>

                    <button
                        class="cart-btn remove-btn"
                        data-id="${product.id}"
                        aria-label="Remove ${product.name} from wishlist">
                        Remove
                    </button>

                </div>
            `;

        });

        // Remove item
        document.querySelectorAll(".remove-btn").forEach(button => {

            button.addEventListener("click", function () {

                const id = this.dataset.id;

                wishlist = wishlist.filter(item => item.id !== id);

                localStorage.setItem("wishlist", JSON.stringify(wishlist));

                location.reload();

            });

        });

    }

}