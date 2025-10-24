// index.js
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/points", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: "Missing city parameter" });
  }

  try {
    const response = await axios.get(`https://api.furgonetka.pl/v2/points?city=${encodeURIComponent(city)}`, {
      headers: {
        Authorization: process.env.FURGONETKA_AUTH,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Furgonetka API error:", error.message);
    res.status(500).json({ error: "Error fetching data from Furgonetka API" });
  }
});

app.get("/", (req, res) => {
  res.send("Furgonetka API proxy running.");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

