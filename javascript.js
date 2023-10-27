document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.querySelector('.products');
    const cartItemsContainer = document.querySelector('.cart-items');
    const checkoutButton = document.getElementById('checkout');

    async function fetchAndDisplayProductData() {
        try {
            const response = await fetch('https://fakestoreapi.com/products/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const products = await response.json();
            productsContainer.innerHTML = '';

            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-category">${product.category}</p>
                    <p class="product-description">${product.description}</p>
                    <img src="${product.image}" alt="${product.title}">
                    <div class="product-price-container">
                        <h3 class="product-price">$${product.price}</h3>
                        <a href="#!" class="add-to-cart"><ion-icon name="cart-outline"></ion-icon></a>
                    </div>
                `;

                productsContainer.appendChild(productElement);
            });
        } catch (error) {
            console.error('Error fetching and displaying products:', error);
        }
    }

    const cart = [];

    function addToCart(productId) {
        const product = products.find(p => p.id == productId);
        if (product) {
            cart.push(product);
            renderCart();
        }
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.textContent = `${item.title} - $${item.price}`;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    checkoutButton.addEventListener('click', function () {
        // Simulate a successful checkout by clearing the cart
        cart.length = 0;
        renderCart();
        alert('Payment successful. Your order has been placed.');
    });

    productsContainer.addEventListener('click', event => {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = event.target.getAttribute('data-id');
            addToCart(productId);
        }
    });

    // Fetch products when the page loads
    fetchAndDisplayProductData();
});
