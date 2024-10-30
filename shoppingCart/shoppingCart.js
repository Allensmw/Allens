const cartItems = [
    { id: 1, name: 'Product 1', price: 5000, image: 'https://via.placeholder.com/60' },
    { id: 2, name: 'Product 2', price: 8000, image: 'https://via.placeholder.com/60' },
    { id: 3, name: 'Product 3', price: 3000, image: 'https://via.placeholder.com/60' }
];

const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="item-info">
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="item-price">MWK ${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div class="quantity">
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <input type="number" value="${item.quantity || 1}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-item" onclick="removeItem(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);

        total += item.price * (item.quantity || 1);
    });

cartTotalElement.textContent = `MWK ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

}

function updateQuantity(itemId, change) {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
        item.quantity = (item.quantity || 1) + (typeof change === 'number' ? change : parseInt(change) - (item.quantity || 1));
        if (item.quantity < 1) item.quantity = 1;
        renderCartItems();
    }
}

function removeItem(itemId) {
    const index = cartItems.findIndex(item => item.id === itemId);
    if (index !== -1) {
        cartItems.splice(index, 1);
        renderCartItems();
    }
}

renderCartItems();

document.getElementById('checkout-btn').addEventListener('click', function() {
    // Redirect to the checkout page
    window.location.href = 'checkout/checkout.html';
});
