const generateBtn = document.getElementById('generate-btn');

generateBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const prompt = document.getElementById('prompt').value;
    const model = document.getElementById('model').value;
    const length = document.getElementById('length').value;

    axios.get('http://localhost:3000/generate', {
        params: {
            prompt: prompt,
            model: model,
            length: length,
        },
    })
        .then((response) => {
            const generatedText = response.data.text;
            document.getElementById('result').innerHTML = generatedText;
        })
        .catch((error) => {
            console.error(error);
            alert('An error occurred');
        });
});
