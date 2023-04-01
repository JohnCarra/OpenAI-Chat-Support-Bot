// handle when the user submits a question through the form
async function handleSubmitMessage(message) {
    // input validation
    if (!message) {
        return alert('Please enter your support question');
    }

    // add the user's question to the DOM
    addUserMessageToDialogueBox(message);

    // send fetch request to our backend endpoint
    const response = await $.ajax({
        url: '/api/openai',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ message }),
    });

    // return the response
    return response;
}

// add the user's question to the dialogue box
function addUserMessageToDialogueBox(message) {
    // create a new li element
    const userMessage = $('<li>');

    // add user-specific styling to element
    userMessage.addClass('bg-indigo-500 text-black rounded p-2 w-fit self-end break-words');

    // add the user's message to the element
    userMessage.text(message);

    // add the li element to the DOM
    $('#dialogue').append(userMessage);

    // clear the input for the next question
    $('#prompt-input').val('');

    // display loading indicator in dialogue box
    addLoadingIndicatorToDialogueBox();
}

// add the loading indicator to the dialogue box
function addLoadingIndicatorToDialogueBox() {
    // create a new li element
    const loadingIndicator = $('<li>');

    // set the id of the loading indicator
    loadingIndicator.attr('id', 'loading-indicator');

    // add loading indicator styling
    loadingIndicator.addClass('bg-gray-500 text-black rounded p-2 w-fit self-start w-12');

    // create a new span element
    const loadingDots = $('<span>');

    // add the three dots inside the span element
    loadingDots.html('&#8226;&#8226;&#8226;');

    // add loading dots as a child to li element
    loadingIndicator.append(loadingDots);

    // add the li element to the DOM
    $('#dialogue').append(loadingIndicator);
}

// remove the loading indicator from the dialogue box
function removeLoadingIndicatorFromDialogueBox() {
    // get the loading indicator element
    const loadingIndicator = $('#loading-indicator');

    // remove the loading indicator from the DOM
    loadingIndicator.remove();
}
// add the chatbot's response to the dialogue box
function addBotMessageToDialogueBox(response) {
    // remove the loading indicator now that the response has been received
    removeLoadingIndicatorFromDialogueBox();

    // create a new li element
    const botMessage = $('<li>');

    // check if the response object exists and has a status property
    if (response && response.status === "error") {
        // add error styling
        botMessage.addClass('bg-red-500 text-black rounded p-2 w-fit self-start');

        // add error text
        botMessage.text("Oh no! Something went wrong. Please try again later.");
    } else if (response && response.data) {
        // add user-specific styling to element
        botMessage.addClass('bg-gray-500 text-black rounded p-2 w-fit self-start');

        // add the user's response to the element
        botMessage.text(response.data.trim());
    } else {
        // handle unexpected response format
        botMessage.addClass('bg-red-500 text-black rounded p-2 w-fit self-start');
        botMessage.text("Error!: Unexpected response format. Please try again.");
    }

    // add the li element to the DOM
    $('#dialogue').append(botMessage);

    // clear the input for the next response
    $('#prompt-input').val('');
}


// when the window loads, add an event listener to the form
// that calls the handleSubmitMessage function when the form is submitted
$(window).on('load', function () {
    $('#prompt-form').on('submit', async function (e) {
        // prevent the form from refreshing the page
        e.preventDefault();

        // get the value of the input
        const message = $('#prompt-input').val();

        // call the function that handles the fetch request to our backend
        const data = await handleSubmitMessage(message);

        // add the chatbot's response to the DOM when the fetch request is complete
        addBotMessageToDialogueBox(data);
    });
});

const $maximizeButton = $('.maximize-button');
const $chatContainer = $('.chat-container');

$maximizeButton.on('click', function () {
    $chatContainer.toggleClass('maximized');
});
