document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('predictForm');
    const predictBtn = document.querySelector('.predict-btn');

    // 🔹 Input validation (real-time)
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.style.borderColor = this.checkValidity() 
                ? '#e1e8ed' 
                : '#e74c3c';
        });
    });

    // 🔹 Show loading animation (BUT allow form submit)
    

    // 🔹 Input focus animation
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

});


window.addEventListener('load', function () {
    const el = document.getElementById('serverPrediction');
    const prediction = el ? el.value : null;

    console.log("Prediction:", prediction);
    if (prediction && prediction.includes("AQI")) {
        const value = parseInt(prediction.match(/\d+/)[0]);

        // 🔥 SWITCH VIEW
       // document.querySelector('.predictor-card').style.display = 'none';
        document.getElementById('resultPage').style.display = 'block';

        const aqiBig = document.getElementById('aqiBig');
        const aqiStatus = document.getElementById('aqiStatus');

        // 🎯 COUNT ANIMATION
        let count = 0;
        let interval = setInterval(() => {
            count += Math.ceil(value / 30);
            if (count >= value) {
                count = value;
                clearInterval(interval);
            }
            aqiBig.innerText = count;
        }, 30);

        // 🎨 STATUS
        let status = "";
        if (value <= 50) status = "Good 🌿";
        else if (value <= 100) status = "Moderate 😐";
        else if (value <= 200) status = "Poor 😷";
        else if (value <= 300) status = "Very Poor ⚠️";
        else status = "Severe ☠️";

        aqiStatus.innerText = status;
    }});
       
function goBack() {
    document.getElementById('resultPage').style.display = 'none';
    document.querySelector('.predictor-card').style.display = 'block';
}
