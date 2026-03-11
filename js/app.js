// ===== Check Authentication =====
const currentUser = getCurrentUser();
if (!currentUser) {
    window.location.href = '../index.html';
}

// ===== Apply User Settings =====
// Load and apply user settings when page loads
applyUserSettings();

// ===== Get Recipe ID from URL =====
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');

if (!recipeId) {
    window.location.href = 'recipes.html';
}

// ===== Load Recipe Details =====
const recipe = getRecipeById(recipeId);

if (!recipe) {
    window.location.href = 'recipes.html';
}

// Display recipe details
document.getElementById('recipeName').textContent = recipe.name;
document.getElementById('recipeDescription').textContent = recipe.description;

const ingredientsList = document.getElementById('ingredientsList');
ingredientsList.innerHTML = recipe.ingredients.map(ing => `<li>${ing}</li>`).join('');

const stepsList = document.getElementById('stepsList');
stepsList.innerHTML = recipe.steps.map(step => `<li>${step}</li>`).join('');

// ===== Cooking Mode =====
const modal = document.getElementById('cookingModal');
const cookingModeBtn = document.getElementById('cookingModeBtn');
const closeBtn = document.querySelector('.close');
const pauseBtn = document.getElementById('pauseBtn');
const nextBtn = document.getElementById('nextBtn');

// Start cooking mode
cookingModeBtn.addEventListener('click', () => {
    // Get user's step delay setting
    const settings = getUserSettings(currentUser);
    
    // Create new cooking mode instance with user's delay preference
    cookingModeInstance = new CookingMode(recipe.steps, settings.stepDelay);
    
    // Show modal and start cooking mode
    modal.style.display = 'block';
    cookingModeInstance.start();
});

// Close cooking mode
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    if (cookingModeInstance) {
        cookingModeInstance.stop(); // Stop timer and speech
    }
});

// Pause/Continue button
pauseBtn.addEventListener('click', () => {
    if (cookingModeInstance.isPaused) {
        cookingModeInstance.continue();
    } else {
        cookingModeInstance.pause();
    }
});

// Next step button
nextBtn.addEventListener('click', () => {
    if (nextBtn.textContent === 'Close') {
        modal.style.display = 'none';
        if (cookingModeInstance) {
            cookingModeInstance.stop();
        }
    } else {
        cookingModeInstance.nextStep();
    }
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        if (cookingModeInstance) {
            cookingModeInstance.stop(); // Stop timer and speech
        }
    }
});

// ===== Delete Recipe =====
document.getElementById('deleteBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to delete this recipe?')) {
        deleteRecipe(recipeId);
        window.location.href = 'recipes.html';
    }
});

// ===== Logout =====
document.getElementById('logoutBtn').addEventListener('click', () => {
    logout();
    window.location.href = '../index.html';
});
