document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
});

function fetchProducts() {
    fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(products => {
            const tableBody = document.querySelector('#productTable tbody');
            tableBody.innerHTML = ''; // Clear existing rows

            products.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.description}</td>
                    <td>${product.price}</td>
                    <td>${product.stock}</td>
                    <td>
                        <button onclick="editProduct(${product.id})">Edit</button>
                        <button onclick="deleteProduct(${product.id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

function editProduct(id) {
    // Redirect to edit product page (you'll create this later)
    window.location.href = `edit-product.html?id=${id}`;
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        fetch(`http://localhost:3000/api/products/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    fetchProducts(); // Refresh the product list
                } else {
                    alert('Error deleting product');
                }
            });
    }
}

//Form Data Handling
document.getElementById('addProductForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('price', parseFloat(document.getElementById('price').value));
    formData.append('stock', parseInt(document.getElementById('stock').value));
    formData.append('image', document.getElementById('image').files[0]);

    fetch('http://localhost:3000/api/products', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            alert('Product added successfully!');
            window.location.href = 'index.html'; // Redirect to the dashboard
        } else {
            alert('Error adding product');
        }
    })
    .catch(error => console.error('Error:', error));
});


//Fetch Data For Editing
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (productId) {
        fetchProduct(productId);
    }
});

function fetchProduct(id) {
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(response => response.json())
        .then(product => {
            document.getElementById('productId').value = product.id;
            document.getElementById('name').value = product.name;
            document.getElementById('description').value = product.description;
            document.getElementById('price').value = product.price;
            document.getElementById('stock').value = product.stock;
        })
        .catch(error => console.error('Error fetching product:', error));
}

// Handle form submission for editing product
document.getElementById('editProductForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData();
    const productId = document.getElementById('productId').value;
    formData.append('name', document.getElementById('name').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('price', parseFloat(document.getElementById('price').value));
    formData.append('stock', parseInt(document.getElementById('stock').value));
    
    // Only append the image if a new one is selected
    const imageFile = document.getElementById('image').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }

    fetch(`http://localhost:3000/api/products/${productId}`, {
        method: 'PUT',
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            alert('Product updated successfully!');
            window.location.href = 'index.html'; // Redirect to the dashboard
        } else {
            alert('Error updating product');
        }
    })
    .catch(error => console.error('Error:', error));
});
