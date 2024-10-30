let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Calculate how much the user has scrolled
            let scrollDistance = Math.min(scrollTop / 400, 1);  // Cap at 1 (fully transparent)

            // Fade out the navbar as user scrolls down
            navbar.style.opacity = 1 - scrollDistance;

            lastScrollTop = scrollTop;
        });

        // Get the search icon, search bar, and close button
        const searchButton = document.querySelector('.search-button');
        const searchBar = document.getElementById('search-bar');
        const closeButton = document.getElementById('close-search');
        const body = document.body;

        // Function to toggle search bar visibility
        function toggleSearchBar() {
            searchBar.classList.toggle('active');
            if (searchBar.classList.contains('active')) {
                searchBar.style.display = 'flex'; // Show the search bar
                setTimeout(() => {
                    searchBar.style.opacity = '1'; // Make it visible smoothly
                }, 10);
                body.classList.add('blurred'); // Blur the background
            } else {
                searchBar.style.opacity = '0'; // Fade out
                setTimeout(() => {
                    searchBar.style.display = 'none'; // Hide the search bar
                }, 500); // Delay matches CSS transition
                body.classList.remove('blurred'); // Remove background blur
            }
        }

        // Click event for the search button
        searchButton.addEventListener('click', toggleSearchBar);

        // Click event for the close (X) button
        closeButton.addEventListener('click', toggleSearchBar);

        const menuIcon = document.getElementById('menuIcon');
        const menuOverlay = document.getElementById('menuOverlay');
        const menuClose = document.getElementById('menuClose');

        // Open the menu when the menu icon is clicked
        menuIcon.addEventListener('click', () => {
            menuOverlay.classList.add('active');
        });

        // Close the menu when the close icon is clicked
        menuClose.addEventListener('click', () => {
            menuOverlay.classList.remove('active');
        });

        //Navigate to login Page When Profile Logo is Clicked
        document.getElementById('menulogin').onclick = function() {
            window.location.href = '../profile/loginpage.html';
        };

//Dynamic Product Generation
document.addEventListener('DOMContentLoaded', function() {
    fetchProducts();
});

function fetchProducts() {
    fetch('http://192.168.43.100:3000/api/products') // Adjust URL based on your server
        .then(response => response.json())
        .then(data => {
            const productsGrid = document.getElementById('productsGrid');
            productsGrid.innerHTML = ''; // Clear existing products

            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.innerHTML = `
                    <img src="http://192.168.43.100:3000/${product.image_url}" alt="${product.name}"> <!-- Ensure URL is correct -->
                    <p class="product-title">${product.name}</p>
                    <p class="product-price">MWK ${product.price}</p>
                `;
                
                // Add click event to redirect to the product detail page
                productDiv.addEventListener('click', () => {
                    window.location.href = `../product-page/product-page.html?id=${product.id}`; // Update the URL as needed
                });

                productsGrid.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

