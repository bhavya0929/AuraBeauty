
 // ================= DARK MODE =================

// Get the dark mode button
const darkBtn = document.getElementById("dark-btn");

// Restore the saved theme when the page loads
const savedTheme = localStorage.getItem("auraBeautyTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

// Update the moon/sun icon
function updateDarkModeIcon() {
    if (!darkBtn) return;

    const icon = darkBtn.querySelector("i");

    if (!icon) return;

    if (document.body.classList.contains("dark-mode")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
}

// Set the correct icon when the page loads
updateDarkModeIcon();

// Toggle and save the selected theme
if (darkBtn) {
    darkBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        // Save the selected theme
        const isDarkMode =
            document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "auraBeautyTheme",
            isDarkMode ? "dark" : "light"
        );

        // Update the moon/sun icon
        updateDarkModeIcon();

    });
}
// ================= PASSWORD SHOW / HIDE =================

function togglePassword(inputId, button) {

    const input = document.getElementById(inputId);
    const icon = button.querySelector("i");

    if (input.type === "password") {

        input.type = "text";

        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    } else {

        input.type = "password";

        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");

    }

}
// ================= REGISTER FORM =================

const registerForm = document.getElementById("register-form");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("register-name").value.trim();
        const email = document.getElementById("register-email").value.trim();
        const password = document.getElementById("register-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        // Check password length
        if (password.length < 6) {

            alert("Password must be at least 6 characters long.");

            return;
        }

        // Check passwords match
        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;
        }

        // Create user object
        const user = {
            name: name,
            email: email,
            password: password
        };

        // Save user
        localStorage.setItem(
            "auraBeautyUser",
            JSON.stringify(user)
        );

        alert("Account created successfully! ✨");

        // Go to login page
        window.location.href = "login.html";

    });

}
// ================= LOGIN FORM =================

const loginForm = document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;

        // Get registered user
        const savedUser = JSON.parse(
            localStorage.getItem("auraBeautyUser")
        );

        // Check if account exists
        if (!savedUser) {

            alert("No account found. Please create an account first.");

            return;
        }

        // Check email and password
        if (
            email === savedUser.email &&
            password === savedUser.password
        ) {

            localStorage.setItem("auraBeautyLoggedIn", "true");

            alert("Login successful! Welcome to AuraBeauty ✨");

            window.location.href = "index.html";

        } else {

            alert("Incorrect email or password.");

        }

    });

}
// ================= DISPLAY LOGGED-IN USER =================

const userNameElement = document.getElementById("user-name");

if (userNameElement) {

    const savedUser = JSON.parse(
        localStorage.getItem("auraBeautyUser")
    );

    const isLoggedIn =
        localStorage.getItem("auraBeautyLoggedIn") === "true";

    if (savedUser && isLoggedIn) {

        userNameElement.textContent = "Hi, " + savedUser.name;

    }

}
// ================= LOGOUT =================

const logoutBtn = document.getElementById("logout-btn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        // Remove login status
        localStorage.removeItem("auraBeautyLoggedIn");

        // Go back to login page
        window.location.href = "login.html";

    });

}