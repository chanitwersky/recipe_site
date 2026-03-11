// ===== Check Authentication =====
const currentUser = getCurrentUser();
if (!currentUser) {
    window.location.href = '../index.html';
}

// ===== Apply User Settings =====
// Load and apply user settings when page loads
applyUserSettings();

// ===== Load and Display Recipes =====
let allRecipes = [];

function loadRecipes() {
    allRecipes = getUserRecipes(currentUser);
    displayRecipes(allRecipes);
}

function displayRecipes(recipes) {
    const recipesList = document.getElementById('recipesList');
    const noRecipes = document.getElementById('noRecipes');
    
    if (recipes.length === 0) {
        recipesList.innerHTML = '';
        noRecipes.style.display = 'block';
        return;
    }
    
    noRecipes.style.display = 'none';
    
    recipesList.innerHTML = recipes.map(recipe => `
        <div class="recipe-card" onclick="openRecipe('${recipe.id}')">
            <h3>${recipe.name}</h3>
            <p>${recipe.description}</p>
            <button class="btn btn-primary">View Recipe</button>
        </div>
    `).join('');
}

function openRecipe(id) {
    window.location.href = `recipe.html?id=${id}`;
}

// ===== Search Functionality =====
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = allRecipes.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm) ||
        recipe.description.toLowerCase().includes(searchTerm)
    );
    displayRecipes(filtered);
});

// ===== Logout =====
document.getElementById('logoutBtn').addEventListener('click', () => {
    logout();
    window.location.href = '../index.html';
});

// Load recipes on page load
loadRecipes();
