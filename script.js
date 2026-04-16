document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('predictForm');

    if (!form) return;

    const inputs = form.querySelectorAll('input');

    // 🔹 Input validation
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.style.borderColor = this.checkValidity() 
                ? '#e1e8ed' 
                : '#e74c3c';
        });
    });

    // 🔹 Input focus animation
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // 🔥 AQI COLOR LOGIC (NEW FEATURE)
    const aqiElement = document.querySelector('.aqi-big');
    const statusElement = document.querySelector('.aqi-status');

    if (aqiElement && statusElement) {

        const value = Number(aqiElement.textContent.trim()) || 0;

        let className = "";
        let status = "";

        if (value <= 50) {
            className = "aqi-good";
            status = "Good 🌿";
        }
        else if (value <= 100) {
            className = "aqi-moderate";
            status = "Moderate 😐";
        }
        else if (value <= 200) {
            className = "aqi-poor";
            status = "Poor 😷";
        }
        else if (value <= 300) {
            className = "aqi-very-poor";
            status = "Very Poor ⚠️";
        }
        else {
            className = "aqi-severe";
            status = "Severe ☠️";
        }

        aqiElement.className = "aqi-big " + className;
        statusElement.innerText = status;
    }

});
