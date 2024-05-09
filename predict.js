let model;
async function loadModel() {
    model = await tf.loadLayersModel('model_architecture.json');
    console.log('Model loaded.');
}
loadModel();
