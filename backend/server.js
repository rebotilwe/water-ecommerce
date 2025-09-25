const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const http = require('http');
require('dotenv').config();

const { Server } = require('socket.io');

const app = express();
// Create the HTTP server
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    }
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on('acceptTrip', (tripId) => {
        io.emit('tripAccepted', { tripId });
    });

    socket.on('tripCancelled', (data) => {
        io.emit('tripCancelled', { message: data.message });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('error', (error) => {
        console.error('Socket connection error:', error);
    });
});

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    credentials: true
}));

app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({
    secret: 'secrete',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "food_delivery"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err);
        return;
    }
    console.log('Connected to the database');
});

// User session verification
app.get('/user', (req, res) => {
    if (req.session.userId && req.session.username && req.session.email) {
        console.log(`User email: ${req.session.email}`);
        return res.json({ valid: true, userId: req.session.userId, username: req.session.username, email: req.session.email });
    } else {
        return res.json({ valid: false });
    }
});

// SIGNUP
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err) => {
    if (err) return res.status(500).json({ message: "Error creating user" });
    res.json({ message: "User created successfully" });
  });
});

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (result.length === 0) return res.status(401).json({ message: "Invalid credentials" });
    res.json({ message: "Login successful", user: result[0] });
  });
});

// Logout endpoint
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error occurred during logout:", err);
            return res.status(500).json({ error: "An error occurred during logout" });
        }
        return res.status(200).json({ message: "Logout successful" });
    });
});



app.post("/api/create-checkout-sessions", async (req, res) => {
    const { products } = req.body;
    console.log(products);

    const lineItems = products.map((product) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: product.dish
            },
            unit_amount: product.price
        }
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel"
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Failed to create checkout session" });
    }
});
// =================== PAYSTACK CHECKOUT ===================
app.post('/api/paystack/initialize', async (req, res) => {
    console.log("Using Paystack key:", process.env.PAYSTACK_SECRET_KEY); // <--- Add this
    try {
        const { email, amount } = req.body; 
        const response = await fetch('https://api.paystack.co/transaction/initialize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            },
            body: JSON.stringify({
                email,
                amount,
                currency: 'ZAR',
                callback_url: 'http://localhost:3000/payment-success'
            })
        });

        const data = await response.json();
        console.log("Paystack response:", data); // <--- Add this

        if (data.status) {
            res.json({ authorization_url: data.data.authorization_url, reference: data.data.reference });
        } else {
            res.status(400).json({ error: 'Unable to initialize Paystack transaction' });
        }
    } catch (err) {
        console.error('Paystack server error:', err);
        res.status(500).json({ error: 'Server error initializing Paystack' });
    }
});



app.listen(8085, () => {
    console.log("Server started on port 8085");
});


