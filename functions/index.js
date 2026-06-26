const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Chapa } = require("chapa-nodejs");

dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

setGlobalOptions({ maxInstances: 10 });

const chapa = new Chapa({
  secretKey: process.env.CHAPA_SECRET_KEY,
});

// Initialize payment
app.post("/accept-payment", async (req, res) => {
  try {
    console.log("Request body:", req.body);

    let { amount, email, first_name, last_name, phone_number } = req.body;

    // Fix 1: normalize phone number to Ethiopian local format
    phone_number = phone_number.replace(/\s+/g, "").trim();
    if (phone_number.startsWith("+251")) phone_number = "0" + phone_number.slice(4);
    if (phone_number.startsWith("251"))  phone_number = "0" + phone_number.slice(3);

    // Fix 2: convert amount to string
    amount = String(amount);

    const tx_ref = await chapa.genTxRef();

    const response = await chapa.initialize({
      first_name,
      last_name,
      email,
      phone_number,
      amount,
      currency: "ETB",
      tx_ref,
      callback_url: "http://localhost:3000/callback",
      return_url: "http://localhost:3000/success",
    });

    res.status(200).json(response);
  } catch (error) {
    logger.error("Chapa payment error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Verify payment
app.get("/verify-payment/:tx_ref", async (req, res) => {
  try {
    const { tx_ref } = req.params;
    const response = await chapa.verify({ tx_ref });
    res.status(200).json(response);
  } catch (error) {
    logger.error("Chapa verify error:", error);
    res.status(500).json({ error: error.message });
  }
});

exports.api = onRequest(app);