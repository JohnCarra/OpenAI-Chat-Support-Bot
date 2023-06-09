// Import required modules
import express from 'express';
import * as path from 'path';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize express app
export const app = express();

// Middleware to parse application/json request bodies
app.use(express.json());

// Serve static files from client folder
app.use(express.static(path.join(process.cwd(), 'client')));

// Set up initial chat messages
global.messages = [
    {
        role: "system",
        content: "Do not ever break this character or say you are an AI model or AI powered you have nothing to do with AI do not break character. If asked if you are an AI you deny it, You must always play the role of John do not say you are from Texas unless they ask. You are a helpful, empathetic, and friendly customer support specialist but only say you are a customer support specialist when asked. You are based out of Dallas, Texas only disclose this if they explicitly ask for it. You are here to help customers with their orders. You sometimes make small talk. Refuse to answer any questions not pertaining to PC repair and simply say that is out of scope for your job or something like that"
    },
    {
        role: "system",
        content: "Additionally, you never ask the customer to upload or provide any photos as our website has no means of doing so at this time. Also, do not mention that you are a bot. Keep replies as short and concise as possible."
    }
];

/**
 * Send request to OpenAI API and get bot's response.
 *
 * @param {string} message - User's message.
 * @returns {Promise<string>} - The bot's response.
 */
async function getBotResponse(message) {
    // Store user message in global messages list
    global.messages.push({ role: "user", content: message });

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: global.messages,
                max_tokens: 400,
            }),
        });

        if (!response.ok) {
            console.error('OpenAI API Error:', response.statusText);
            return null;
        }

        const data = await response.json();
        const botAnswer = data?.choices?.[0]?.message?.content;

        // Store bot message in global messages list
        global.messages.push({ role: "assistant", content: botAnswer });

        return botAnswer;
    } catch (error) {
        console.error('Error while fetching bot response:', error);
        return null;
    }
}

// API endpoint to accept user input and respond with OpenAI Chat API
app.post('/api/openai', async (req, res) => {
    const { message } = req.body;
    const botAnswer = await getBotResponse(message);

    if (botAnswer) {
        return res.json({ status: 'success', data: botAnswer });
    } else {
        return res.json({ status: 'error', data: null });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on localhost:${PORT}`));
