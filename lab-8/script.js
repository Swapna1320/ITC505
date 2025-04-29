document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('registrationForm');
    const errorMessages = document.getElementById('errorMessages');

    form.addEventListener('submit', function(event) {
        errorMessages.innerHTML = "";
        let errors = [];

        const firstName = sanitizeInput(document.getElementById('firstName').value);
        const lastName = sanitizeInput(document.getElementById('lastName').value);
        const email = sanitizeInput(document.getElementById('email').value);
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            errors.push("All fields must be filled out.");
        }

        if (!validateEmail(email)) {
            errors.push("Invalid email format.");
        }

        if (password !== confirmPassword) {
            errors.push("Passwords do not match.");
        }

        if (errors.length > 0) {
            event.preventDefault();
            errors.forEach(function(error) {
                const p = document.createElement('p');
                p.textContent = error;
                errorMessages.appendChild(p);
            });
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function sanitizeInput(str) {
        return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
});
