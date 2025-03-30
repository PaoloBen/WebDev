document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json";
    const productContainer = document.getElementById("product-list");
    const cartContainer = document.getElementById("cart-items");
    const cart = {};

    async function fetchProducts() {
        try {
            const response = await fetch(API_URL);
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    function displayProducts(products) {
        productContainer.innerHTML = "";
        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image"/>
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
            `;
            productContainer.appendChild(productCard);
        });
    }

    function updateCartDisplay() {
        cartContainer.innerHTML = "";
        Object.values(cart).forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <span>${item.name} x${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            `;
            cartContainer.appendChild(cartItem);
        });
    }

    productContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-to-cart")) {
            const id = e.target.dataset.id;
            const name = e.target.dataset.name;
            const price = parseFloat(e.target.dataset.price);
            if (cart[id]) {
                cart[id].quantity++;
            } else {
                cart[id] = { id, name, price, quantity: 1 };
            }
            updateCartDisplay();
        }
    });

    cartContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-item")) {
            const id = e.target.dataset.id;
            delete cart[id];
            updateCartDisplay();
        }
    });

    fetchProducts();
});
