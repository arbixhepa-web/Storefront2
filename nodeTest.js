
/*
    GameZone Node.js REST API

    Author: Team Member 9 - Node.js REST Services

    Example:
    Team 2 = Port 3002
    Change PORT to your assigned team port.
*/

const express = require("express");
const https = require("https");
const fs = require("fs");

const app = express();

// Team 2 example. Change this for your assigned team.
const PORT = 3002;

// Read JSON request documents.
app.use(express.json());

// Allow browser pages to communicate with this server.
app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

// Temporary collections.
// These are stored in memory and reset when the server restarts.
let products = [];
let billingDocuments = [];
let returnDocuments = [];

// Test that the server is running.
app.get("/", function(req, res) {
    res.json({
        message: "GameZone Node.js REST API is running.",
        port: PORT
    });
});

// Return all saved products.
app.get("/products", function(req, res) {
    res.json(products);
});

// Receive a product document.
app.post("/products", function(req, res) {

    const product = req.body;

    if (!product || typeof product !== "object") {
        return res.status(400).json({
            error: "A valid product JSON document is required."
        });
    }

    products.push(product);

    res.status(201).json({
        message: "Product received successfully.",
        product: product
    });
});

// Receive billing information.
app.post("/billing", function(req, res) {

    const billing = req.body;

    if (!billing || !billing.shopper || !billing.billing) {
        return res.status(400).json({
            error: "Invalid billing JSON document."
        });
    }

    billingDocuments.push(billing);

    res.status(201).json({
        message: "Billing document received successfully.",
        billing: billing
    });
});

// Receive return documents.
app.post("/returns", function(req, res) {

    const returnDocument = req.body;

    if (!returnDocument || !returnDocument.returns) {
        return res.status(400).json({
            error: "Invalid return JSON document."
        });
    }

    returnDocuments.push(returnDocument);

    res.status(201).json({
        message: "Return document received successfully.",
        returnRequest: returnDocument
    });
});

// View received billing documents.
app.get("/billing", function(req, res) {
    res.json(billingDocuments);
});

// View received return documents.
app.get("/returns", function(req, res) {
    res.json(returnDocuments);
});

// Start the server.
app.listen(PORT, function() {
    console.log(
        "GameZone REST API listening on port " + PORT
    );
});
