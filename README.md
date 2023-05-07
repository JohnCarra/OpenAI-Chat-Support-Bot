# OpenAI Help Desk Support Bot

## Description

This is a web application that uses the OpenAI Chat API to provide customer support through a chat interface.The backend accepts user input through a form and sends it to the OpenAI API for processing. The response from the API is then returned to the frontend and displayed in the chat interface.

The chat interface consists of a chat container that displays the conversation history between the user and the chatbot, an input field where the user can type their message, and a submit button. When the user submits their message, it is added to the chat history, and a loading indicator is displayed while the backend processes the message. Once the response is received from the backend, it is added to the chat history, and the loading indicator is removed.

The frontend is implemented using HTML, CSS, and JavaScript, and the backend is implemented using Node.js and Express.js. The OpenAI API is used to process the user input and generate responses. The application is designed to be responsive, and it includes a maximize button that allows the user to expand the chat container to fill the screen.

## Installation

1. Clone the repository: `git clone https://github.com/JohnCarra/OpenAI-Chat-Support-Bot`
2. Navigate to the project directory: `cd OpenAIText`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

## Usage

This project is for educational purposes and is simply showcasing the capability of the OpenAI API when implemented inside of a WebApp.

## License

MIT License
