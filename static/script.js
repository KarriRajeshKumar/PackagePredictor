function validateLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginError = document.getElementById("loginError");

    // Basic validation
    if (!username || !password) {
        loginError.textContent = "Please enter both username and password.";
        return;
    }

    // For demo purposes - in production, this should be server-side authentication
    // TODO: Replace with proper server-side authentication
    if (username === "admin" && password === "password123") {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("predict-container").style.display = "block";
        loginError.textContent = "";
    } else {
        loginError.textContent = "Invalid username or password.";
    }
}

// Initialize sliders
document.addEventListener('DOMContentLoaded', function() {
    // Set up slider functionality
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach(slider => {
        const valueDisplay = slider.nextElementSibling;
        
        // Update display on input
        slider.addEventListener('input', function() {
            valueDisplay.textContent = this.value;
        });
        
        // Initialize display
        valueDisplay.textContent = slider.value;
    });
    
    // Form submission
    const form = document.getElementById('predictionForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        predictPackage();
    });
    
    // Focus on first input
    document.getElementById('cgpa').focus();
});

function predictPackage() {
    const cgpa = document.getElementById("cgpa").value;
    const resultContainer = document.getElementById("predictionResult");
    const predictBtn = document.querySelector(".predict-btn");
    const btnText = document.querySelector(".btn-text");
    const btnLoading = document.querySelector(".btn-loading");

    // Clear previous results
    resultContainer.className = "result-container";
    resultContainer.textContent = "";

    // Validate input
    if (!cgpa || cgpa < 0 || cgpa > 10) {
        resultContainer.textContent = "Please enter a valid CGPA between 0 and 10.";
        resultContainer.classList.add("error");
        return;
    }

    // Show loading state
    resultContainer.textContent = "🔍 Analyzing your CGPA...";
    resultContainer.classList.add("loading");
    predictBtn.disabled = true;
    btnText.style.display = "none";
    btnLoading.style.display = "inline";

    fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cgpa: parseFloat(cgpa) })
    })
    .then(response => response.json())
    .then(data => {
        // Reset button state
        predictBtn.disabled = false;
        btnText.style.display = "inline";
        btnLoading.style.display = "none";
        
        if (data.predicted_package) {
            resultContainer.textContent = `🎉 Your predicted package is ₹${data.predicted_package} LPA!`;
            resultContainer.classList.add("success");
            
            // Add some celebration animation
            setTimeout(() => {
                resultContainer.style.transform = "scale(1.05)";
                setTimeout(() => {
                    resultContainer.style.transform = "scale(1)";
                }, 200);
            }, 100);
            
        } else if (data.error) {
            resultContainer.textContent = `❌ ${data.error}`;
            resultContainer.classList.add("error");
        } else {
            resultContainer.textContent = "⚠️ Unexpected response from server.";
            resultContainer.classList.add("error");
        }
    })
    .catch(error => {
        // Reset button state
        predictBtn.disabled = false;
        btnText.style.display = "inline";
        btnLoading.style.display = "none";
        
        resultContainer.textContent = "❌ An error occurred while predicting the package.";
        resultContainer.classList.add("error");
        console.error(error);
    });
}

// Add Enter key support
document.addEventListener('DOMContentLoaded', function() {
    const cgpaInput = document.getElementById("cgpa");
    cgpaInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            predictPackage();
        }
    });
    
    // Focus on input when page loads
    cgpaInput.focus();
});

// Add input validation feedback
document.getElementById("cgpa").addEventListener('input', function() {
    const value = parseFloat(this.value);
    const predictBtn = document.querySelector(".predict-btn");
    
    if (value >= 0 && value <= 10) {
        this.style.borderColor = "#4CAF50";
        predictBtn.disabled = false;
    } else if (this.value !== '') {
        this.style.borderColor = "#f44336";
        predictBtn.disabled = true;
    } else {
        this.style.borderColor = "#e0e0e0";
        predictBtn.disabled = false;
    }
});

// Add visual feedback for sliders
document.querySelectorAll('.slider').forEach(slider => {
    slider.addEventListener('input', function() {
        const value = this.value;
        const valueDisplay = this.nextElementSibling;
        
        // Update color based on value
        if (value >= 80) {
            valueDisplay.style.background = "#4CAF50"; // Green for high scores
        } else if (value >= 60) {
            valueDisplay.style.background = "#FF9800"; // Orange for medium scores
        } else {
            valueDisplay.style.background = "#f44336"; // Red for low scores
        }
        
        valueDisplay.textContent = value;
    });
});
