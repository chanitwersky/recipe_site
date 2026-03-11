// ===== Reset Recipes Utility =====
// This script clears old recipes and loads the new expanded collection

function resetRecipes() {
    // Clear existing recipes
    localStorage.removeItem('recipeApp_recipes');
    
    console.log('✅ Old recipes cleared from localStorage');
    console.log('🔄 Reloading page to load new recipes...');
    
    // Reload the page to trigger initialization with new recipes
    setTimeout(() => {
        location.reload();
    }, 500);
}

// Auto-run on page load if this script is included
if (typeof window !== 'undefined') {
    console.log('🔧 Recipe Reset Utility Loaded');
    console.log('📝 To reset recipes, run: resetRecipes()');
}
