// OUR CART
let cart = [];

// ADD ITEMS
function addToCart(name, price) {

    let item = cart.find(product => product.name === name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    renderCart();

    document.getElementById("order-message").innerText =
        name + " added to your cart!";
}

// INCREASE QUANTITY
function increaseQuantity(name) {

    let item = cart.find(product => product.name === name);

    if (item) {
        item.quantity++;
    }

    renderCart();
}

// DECREASE QUANTITY
function decreaseQuantity(name) {

    let item = cart.find(product => product.name === name);

    if (item) {
        item.quantity--;

        if (item.quantity <= 0) {
            cart = cart.filter(product => product.name !== name);
        }
    }

    renderCart();
}

// DISPLAY CART
function renderCart() {

    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    let cartCount = document.getElementById("cart-count");

    cartItems.innerHTML = "";

    let total = 0;
    let totalQuantity = 0;

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty. Add something delicious!</p>';

    } else {

        cart.forEach(function(item) {

            let itemTotal = item.price * item.quantity;

            total += itemTotal;
            totalQuantity += item.quantity;

            cartItems.innerHTML += `
                <div class="cart-item">

                    <div>
                        <p><strong>${item.name}</strong></p>
                        <p>₹${item.price} x ${item.quantity}</p>
                        <p>Subtotal: ₹${itemTotal}</p>
                    </div>

                    <div class="quantity-controls">
                        <button onclick="decreaseQuantity('${item.name}')">−</button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseQuantity('${item.name}')">+</button>
                    </div>

                </div>
            `;
        });
    }

    cartTotal.innerText = "Total: ₹" + total;
    cartCount.innerText = totalQuantity;
}

// CLEAR CART
function clearCart() {

    cart = [];
    renderCart();

    document.getElementById("order-message").innerText =
        "Your cart has been cleared.";
}

// DEMO CHECKOUT
function checkout() {

    let message = document.getElementById("order-message");

    if (cart.length === 0) {

        message.innerText = "Please add something to your cart first!";
        return;
    }

    let total = 0;

    cart.forEach(function(item) {
        total += item.price * item.quantity;
    });

    message.innerText =
        "Demo order successful! Your total is ₹" + total +
        ". Thank you for visiting The Little Bean! ☕";

    cart = [];
    renderCart();
}