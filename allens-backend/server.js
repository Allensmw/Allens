const express = require('express');
const mysql = require('mysql2/promise'); // Use mysql2 for promises
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const path = require('path'); // Require path module
require('dotenv').config(); // Load environment variables

const app = express();


// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

app.use(cors());

//Phone Bug Code
app.use(cors({
    origin: '*', // You can specify the exact address if needed, e.g., http://192.168.43.100:5500
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify upload destination
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Generate unique suffix
        const ext = path.extname(file.originalname); // Get the file extension
        cb(null, `${uniqueSuffix}${ext}`); // Save the file with unique name and original extension
    }
});

// File filter to only accept images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Specify allowed MIME types
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false); // Reject the file
    }
};

const upload = multer({ 
    storage: storage, 
    fileFilter: fileFilter // Apply file filter
});

// Middleware to parse JSON and enable CORS
app.use(bodyParser.json());
app.use(cors());

// MySQL Database connection setup
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};

// Test route
app.get('/', (req, res) => {
    res.send('Welcome to the Allens API');
});

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [results] = await connection.execute('SELECT * FROM products');
        await connection.end();
        res.json(results);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send(err);
    }
});

// Add a new product
app.post('/api/products', upload.single('image'), async (req, res) => {
    const { name, description, price, stock } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Store the image path if it exists

    try {
        const connection = await mysql.createConnection(dbConfig);
        const query = 'INSERT INTO products (name, description, price, image_url, stock) VALUES (?, ?, ?, ?, ?)';
        const [result] = await connection.execute(query, [name, description, price, imageUrl, stock]);
        await connection.end();
        res.json({ id: result.insertId });
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).json({ error: err.message });
    }
});

// Update a product
app.put('/api/products/:id', upload.single('image'), async (req, res) => {
    const productId = req.params.id;
    const { name, description, price, stock } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Store the image path if a new image is uploaded

    try {
        const connection = await mysql.createConnection(dbConfig);
        const query = 'UPDATE products SET name=?, description=?, price=?, image_url=?, stock=? WHERE id=?';
        await connection.execute(query, [name, description, price, imageUrl, stock, productId]);
        await connection.end();
        res.json({ success: true });
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).send(err);
    }
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const query = 'DELETE FROM products WHERE id=?';
        await connection.execute(query, [req.params.id]);
        await connection.end();
        res.json({ success: true });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).send(err);
    }
});


// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
};

app.use(errorHandler);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
