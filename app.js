let model;

const threshold = 0.9; // Confidence threshold for predictions

// Load the TensorFlow.js toxicity model
async function loadModel() {
    model = await toxicity.load(threshold);
    document.getElementById('modelStatus').innerText = 'The model is built and ready.';
}

// Call loadModel as soon as the script loads
loadModel();

// Function to detect abusive text
async function detectAbuse() {
    const textInput = document.getElementById('textInput').value;
    if (textInput.trim().length === 0) {
        alert('Please enter some text before checking.');
        return;
    }

    const predictions = await model.classify([textInput]);
    displayResult(predictions);
}

// Function to display the results
function displayResult(predictions) {
    const resultsElement = document.getElementById('result');
    resultsElement.innerHTML = '';

predictions.forEach(prediction => {
    if (prediction.results.length > 0 && prediction.results[0].match) {
        const label = prediction.label;
        const confidence = prediction.results[0].probabilities[1].toFixed(2);
        const resultText = `Detected "${label}" with confidence ${confidence}.`;

        // Create a paragraph element for the result
        const p = document.createElement('p');
        p.textContent = resultText;

        // Append the paragraph to the results element
        resultsElement.appendChild(p);
    }
});


    if (resultsElement.innerHTML === '') {
        resultsElement.innerHTML = '<p style="color: darkgreen;">No abusive content detected.</p>\n';
    }
}
