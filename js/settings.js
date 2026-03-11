// ===== Check Authentication =====
const currentUser = getCurrentUser();
if (!currentUser) {
    window.location.href = '../index.html';
}

// ===== Apply User Settings =====
// Load and apply user settings when page loads
applyUserSettings();

// ===== Load Current Settings into Form =====
const settings = getUserSettings(currentUser);

// Set theme toggle based on saved settings
if (settings.darkMode) {
    document.getElementById('themeToggle').checked = true;
}

// Set step delay value from saved settings
document.getElementById('stepDelay').value = settings.stepDelay;

// Set voice gender radio button based on saved settings
const voiceGender = settings.voiceGender || 'female';
const genderRadioButtons = document.querySelectorAll('input[name="voiceGender"]');
genderRadioButtons.forEach(radio => {
    if (radio.value === voiceGender) {
        radio.checked = true;
    }
});

// Set voice accent radio button based on saved settings
const voiceAccent = settings.voiceAccent || 'en-US';
const accentRadioButtons = document.querySelectorAll('input[name="voiceAccent"]');
accentRadioButtons.forEach(radio => {
    if (radio.value === voiceAccent) {
        radio.checked = true;
    }
});

// ===== Theme Toggle =====
document.getElementById('themeToggle').addEventListener('change', (e) => {
    if (e.target.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

// ===== Save Settings =====
document.getElementById('settingsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const darkMode = document.getElementById('themeToggle').checked;
    const stepDelay = parseInt(document.getElementById('stepDelay').value);
    
    // Get selected voice gender
    const selectedVoiceGender = document.querySelector('input[name="voiceGender"]:checked').value;
    
    // Get selected voice accent
    const selectedVoiceAccent = document.querySelector('input[name="voiceAccent"]:checked').value;
    
    // Create settings object
    const newSettings = {
        darkMode,
        stepDelay,
        voiceGender: selectedVoiceGender,
        voiceAccent: selectedVoiceAccent
    };
    
    // Save settings for current user
    saveUserSettings(currentUser, newSettings);
    
    // Apply settings immediately
    applyUserSettings();
    
    // Show success message
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
    
    // Hide success message after 3 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
});

// ===== Logout =====
document.getElementById('logoutBtn').addEventListener('click', () => {
    logout();
    window.location.href = '../index.html';
});
