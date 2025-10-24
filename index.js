const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/points', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    try {
        const response = await axios.get('https://api.furgonetka.pl/v2/points', {
            headers: {
                Authorization: `Basic ${process.env.FURGONETKA_AUTH}`,
            },
            params: {
                city: city
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error?.response?.data || error.message);
        res.status(500).json({ error: 'Error fetching data from Furgonetka API' });
    }
});

app.get('/', (req, res) => {
    res.send('Furgonetka API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
