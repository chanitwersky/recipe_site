// ===== Authentication Logic =====

// Check if user is already logged in
const currentUser = getCurrentUser();
if (currentUser) {
    window.location.href = 'pages/recipes.html';
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Validate credentials
    const user = validateUser(username, password);
    
    if (user) {
        // Login successful - set current user
        setCurrentUser(username);
        
        // Load and apply user settings immediately
        const settings = getUserSettings(username);
        
        // Apply theme before redirect (for smooth transition)
        if (settings.darkMode) {
            document.body.classList.add('dark-mode');
        }
        
        // Redirect to recipes page
        window.location.href = 'pages/recipes.html';
    } else {
        // Login failed
        errorMessage.textContent = 'Invalid username or password';
    }
});
