const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve static files

// API Routes
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    db.run(
        `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
        [name, email, password],
        function (err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ error: 'Email already exists' });
                }
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({ success: true, userId: this.lastID, name, email });
        }
    );
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }

    // Note: Storing plain text passwords is a security risk in production!
    // We do it here just to keep the example simple.
    db.get(
        `SELECT id, name, email FROM users WHERE email = ? AND password = ?`,
        [email, password],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            if (!row) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            res.json({ success: true, user: row });
        }
    );
});

app.post('/api/orders', (req, res) => {
    const { userId, cartItems, totalPrice, deliveryAddress, contactNumber } = req.body;

    if (!cartItems || !totalPrice || !deliveryAddress || !contactNumber) {
        return res.status(400).json({ error: 'Missing required order details' });
    }

    db.run(
        `INSERT INTO orders (user_id, cart_items, total_price, delivery_address, contact_number) VALUES (?, ?, ?, ?, ?)`,
        [userId || null, JSON.stringify(cartItems), totalPrice, deliveryAddress, contactNumber],
        function (err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to create order' });
            }
            res.json({ success: true, orderId: this.lastID });
        }
    );
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
