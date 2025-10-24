const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/points", async (req, res) => {
    const city = req.query.city;
    if (!city) return res.status(400).send({ error: "City is required" });

    try {
        const response = await axios.post(
            "https://api.furgonetka.pl/v2/points/of-delivery",
            {
                town: city,
                services: ["inpost", "orlen"],
                types: ["PICKUP_POINT"],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${Buffer.from(process.env.FURGO_LOGIN + ":" + process.env.FURGO_PASSWORD).toString("base64")}`,
                    "X-Client-Id": process.env.FURGO_CLIENT_ID,
                    "X-Client-Secret": process.env.FURGO_CLIENT_SECRET,
                },
            }
        );
        res.send(response.data);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.listen(PORT, () => console.log("API running on port " + PORT));