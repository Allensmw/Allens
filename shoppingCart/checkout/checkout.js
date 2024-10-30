const orderItems = [
    { name: "Product 1", price: 19.99, quantity: 2 },
    { name: "Product 2", price: 29.99, quantity: 1 },
    { name: "Product 3", price: 39.99, quantity: 1 }
];

function displayOrderSummary() {
    const orderItemsContainer = document.getElementById('order-items');
    let total = 0;

    orderItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.classList.add('order-item');
        itemElement.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>MWK ${itemTotal.toFixed(2)}</span>
        `;
        orderItemsContainer.appendChild(itemElement);
    });

    document.getElementById('total-amount').textContent = total.toFixed(2);
}

function handleSubmit(event) {
    event.preventDefault();
    alert('Order placed successfully!');
}

function togglePaymentFields() {
    const creditCardFields = document.getElementById('credit-card-fields');
    const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    if (selectedPaymentMethod === 'credit-card') {
        creditCardFields.style.display = 'block';
    } else {
        creditCardFields.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayOrderSummary();
    document.getElementById('checkout-form').addEventListener('submit', handleSubmit);

    const paymentOptions = document.querySelectorAll('input[name="payment-method"]');
    paymentOptions.forEach(option => {
        option.addEventListener('change', togglePaymentFields);
    });

    togglePaymentFields();
});