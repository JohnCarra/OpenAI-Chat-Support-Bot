const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors'); // Add this line

dotenv.config();

const app = express();

const API_KEY = process.env.API_KEY;

app.use(cors()); // Add this line
app.use(express.json());

// Route to generate text using OpenAI's GPT models
app.get('/generate', async (req, res) => {
    try {
        const prompt = req.query.prompt;
        const model = req.query.model || 'davinci';
        const length = parseInt(req.query.length) || 50;

        const response = await axios.post('https://api.openai.com/v1/engines/' + model + '/completions', {
            prompt: prompt,
            max_tokens: length,
            n: 1,
            stop: '\n',
        }, {
            headers: {
                'Authorization': 'Bearer ' + API_KEY,
                'Content-Type': 'application/json',
            },
        });

        const text = response.data.choices[0].text.trim();

        res.json({ text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Example usage: http://localhost:3000/generate?prompt=Hello,%20my%20name%20is&model=davinci&length=50

// Homepage route
app.get('/', (req, res) => {
    res.send('Welcome to the GPT text generator!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
