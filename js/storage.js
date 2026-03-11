// ===== Storage Keys =====
const STORAGE_KEYS = {
    USERS: 'recipeApp_users',
    RECIPES: 'recipeApp_recipes',
    CURRENT_USER: 'recipeApp_currentUser',
    SETTINGS: 'recipeApp_settings'
};

// ===== Initialize Default Data =====
function initializeStorage() {
    // Initialize users if not exists
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
        const defaultUsers = [
            { username: 'user1', password: '1234' },
            { username: 'chef', password: 'recipe' }
        ];
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
    }
    
    // Initialize recipes if not exists
    if (!localStorage.getItem(STORAGE_KEYS.RECIPES)) {
        const defaultRecipes = [
            // ===== Recipe 1: Spaghetti Carbonara =====
            {
                id: '1',
                name: 'Spaghetti Carbonara',
                description: 'Classic Italian pasta dish with eggs, cheese, and bacon',
                ingredients: [
                    '400g spaghetti',
                    '200g bacon',
                    '4 eggs',
                    '100g parmesan cheese',
                    'Salt and pepper'
                ],
                steps: [
                    'Cook spaghetti according to package instructions',
                    'Fry bacon until crispy',
                    'Beat eggs with grated parmesan',
                    'Mix hot pasta with bacon',
                    'Add egg mixture and stir quickly',
                    'Season with salt and pepper'
                ],
                userId: 'user1'
            },
            // ===== Recipe 2: Chocolate Chip Cookies =====
            {
                id: '2',
                name: 'Chocolate Chip Cookies',
                description: 'Soft and chewy homemade cookies',
                ingredients: [
                    '2 cups flour',
                    '1 cup butter',
                    '1 cup sugar',
                    '2 eggs',
                    '2 cups chocolate chips',
                    '1 tsp vanilla extract'
                ],
                steps: [
                    'Preheat oven to 350°F',
                    'Mix butter and sugar',
                    'Add eggs and vanilla',
                    'Mix in flour gradually',
                    'Fold in chocolate chips',
                    'Bake for 12 minutes'
                ],
                userId: 'chef'
            },
            // ===== Recipe 3: Caesar Salad =====
            {
                id: '3',
                name: 'Caesar Salad',
                description: 'Fresh romaine lettuce with creamy Caesar dressing and croutons',
                ingredients: [
                    '1 large romaine lettuce head',
                    '1/2 cup Caesar dressing',
                    '1 cup croutons',
                    '1/2 cup parmesan cheese shavings',
                    '2 anchovy fillets (optional)',
                    'Black pepper to taste'
                ],
                steps: [
                    'Wash and chop romaine lettuce into bite-sized pieces',
                    'Place lettuce in a large salad bowl',
                    'Add Caesar dressing and toss well',
                    'Add croutons and toss gently',
                    'Top with parmesan cheese shavings',
                    'Add anchovy fillets if desired',
                    'Season with black pepper and serve immediately'
                ],
                userId: 'user1'
            },
            // ===== Recipe 4: Chicken Stir Fry =====
            {
                id: '4',
                name: 'Chicken Stir Fry',
                description: 'Quick and healthy Asian-style chicken with vegetables',
                ingredients: [
                    '500g chicken breast, sliced',
                    '2 bell peppers, sliced',
                    '1 broccoli head, cut into florets',
                    '3 cloves garlic, minced',
                    '3 tbsp soy sauce',
                    '2 tbsp oyster sauce',
                    '1 tbsp sesame oil',
                    '2 tbsp vegetable oil',
                    '1 tsp ginger, grated'
                ],
                steps: [
                    'Heat vegetable oil in a large wok or pan over high heat',
                    'Add chicken and stir-fry for 5-6 minutes until cooked',
                    'Remove chicken and set aside',
                    'Add garlic and ginger, stir-fry for 30 seconds',
                    'Add bell peppers and broccoli, stir-fry for 3-4 minutes',
                    'Return chicken to the pan',
                    'Add soy sauce, oyster sauce, and sesame oil',
                    'Toss everything together for 2 minutes',
                    'Serve hot over rice or noodles'
                ],
                userId: 'chef'
            },
            // ===== Recipe 5: Margherita Pizza =====
            {
                id: '5',
                name: 'Margherita Pizza',
                description: 'Traditional Italian pizza with tomato, mozzarella, and basil',
                ingredients: [
                    '1 pizza dough ball',
                    '1 cup tomato sauce',
                    '200g fresh mozzarella cheese',
                    'Fresh basil leaves',
                    '2 tbsp olive oil',
                    'Salt to taste',
                    'Flour for dusting'
                ],
                steps: [
                    'Preheat oven to 475°F with pizza stone inside',
                    'Roll out pizza dough on floured surface',
                    'Spread tomato sauce evenly over dough',
                    'Tear mozzarella and distribute over sauce',
                    'Drizzle with olive oil and sprinkle salt',
                    'Transfer to hot pizza stone',
                    'Bake for 10-12 minutes until crust is golden',
                    'Remove from oven and top with fresh basil',
                    'Slice and serve immediately'
                ],
                userId: 'user1'
            },
            // ===== Recipe 6: Beef Tacos =====
            {
                id: '6',
                name: 'Beef Tacos',
                description: 'Flavorful Mexican tacos with seasoned ground beef',
                ingredients: [
                    '500g ground beef',
                    '8 taco shells',
                    '1 onion, diced',
                    '2 cloves garlic, minced',
                    '2 tbsp taco seasoning',
                    '1 cup shredded lettuce',
                    '1 cup diced tomatoes',
                    '1 cup shredded cheese',
                    'Sour cream and salsa for serving'
                ],
                steps: [
                    'Heat a large skillet over medium-high heat',
                    'Cook ground beef until browned, breaking it apart',
                    'Add onion and garlic, cook for 3 minutes',
                    'Stir in taco seasoning and 1/4 cup water',
                    'Simmer for 5 minutes until thickened',
                    'Warm taco shells according to package directions',
                    'Fill shells with beef mixture',
                    'Top with lettuce, tomatoes, and cheese',
                    'Serve with sour cream and salsa'
                ],
                userId: 'chef'
            },
            // ===== Recipe 7: Pancakes =====
            {
                id: '7',
                name: 'Fluffy Pancakes',
                description: 'Light and fluffy breakfast pancakes',
                ingredients: [
                    '2 cups all-purpose flour',
                    '2 tbsp sugar',
                    '2 tsp baking powder',
                    '1 tsp salt',
                    '2 eggs',
                    '1 3/4 cups milk',
                    '1/4 cup melted butter',
                    'Butter for cooking',
                    'Maple syrup for serving'
                ],
                steps: [
                    'Mix flour, sugar, baking powder, and salt in a bowl',
                    'In another bowl, whisk eggs, milk, and melted butter',
                    'Pour wet ingredients into dry ingredients',
                    'Stir until just combined, do not overmix',
                    'Heat a griddle or pan over medium heat',
                    'Butter the cooking surface',
                    'Pour 1/4 cup batter for each pancake',
                    'Cook until bubbles form on surface, then flip',
                    'Cook other side until golden brown',
                    'Serve warm with maple syrup and butter'
                ],
                userId: 'user1'
            },
            // ===== Recipe 8: Greek Salad =====
            {
                id: '8',
                name: 'Greek Salad',
                description: 'Fresh Mediterranean salad with feta cheese and olives',
                ingredients: [
                    '4 tomatoes, cut into wedges',
                    '1 cucumber, sliced',
                    '1 red onion, thinly sliced',
                    '1 green bell pepper, sliced',
                    '200g feta cheese, cubed',
                    '1 cup Kalamata olives',
                    '3 tbsp olive oil',
                    '1 tbsp red wine vinegar',
                    '1 tsp dried oregano',
                    'Salt and pepper to taste'
                ],
                steps: [
                    'Combine tomatoes, cucumber, onion, and bell pepper in a large bowl',
                    'Add feta cheese and olives',
                    'In a small bowl, whisk olive oil, vinegar, and oregano',
                    'Pour dressing over salad',
                    'Season with salt and pepper',
                    'Toss gently to combine',
                    'Let sit for 10 minutes before serving',
                    'Serve at room temperature'
                ],
                userId: 'chef'
            },
            // ===== Recipe 9: Banana Bread =====
            {
                id: '9',
                name: 'Banana Bread',
                description: 'Moist and delicious homemade banana bread',
                ingredients: [
                    '3 ripe bananas, mashed',
                    '1/3 cup melted butter',
                    '3/4 cup sugar',
                    '1 egg, beaten',
                    '1 tsp vanilla extract',
                    '1 tsp baking soda',
                    'Pinch of salt',
                    '1 1/2 cups all-purpose flour',
                    '1/2 cup chopped walnuts (optional)'
                ],
                steps: [
                    'Preheat oven to 350°F',
                    'Grease a 9x5 inch loaf pan',
                    'Mix mashed bananas with melted butter',
                    'Stir in sugar, egg, and vanilla',
                    'Sprinkle baking soda and salt over mixture',
                    'Add flour and mix until just combined',
                    'Fold in walnuts if using',
                    'Pour batter into prepared pan',
                    'Bake for 60-65 minutes until toothpick comes out clean',
                    'Cool in pan for 10 minutes, then remove',
                    'Slice and serve warm or at room temperature'
                ],
                userId: 'user1'
            },
            // ===== Recipe 10: Chicken Curry =====
            {
                id: '10',
                name: 'Chicken Curry',
                description: 'Aromatic Indian-style chicken curry with rich spices',
                ingredients: [
                    '600g chicken thighs, cut into pieces',
                    '2 onions, diced',
                    '3 cloves garlic, minced',
                    '1 tbsp ginger, grated',
                    '2 tbsp curry powder',
                    '1 tsp turmeric',
                    '1 tsp cumin',
                    '400ml coconut milk',
                    '2 tomatoes, diced',
                    '2 tbsp vegetable oil',
                    'Fresh cilantro for garnish',
                    'Salt to taste'
                ],
                steps: [
                    'Heat oil in a large pot over medium heat',
                    'Add onions and cook until softened, about 5 minutes',
                    'Add garlic and ginger, cook for 1 minute',
                    'Stir in curry powder, turmeric, and cumin',
                    'Add chicken pieces and cook until browned',
                    'Add tomatoes and cook for 3 minutes',
                    'Pour in coconut milk and bring to a simmer',
                    'Reduce heat and simmer for 25-30 minutes',
                    'Season with salt to taste',
                    'Garnish with fresh cilantro',
                    'Serve hot with rice or naan bread'
                ],
                userId: 'chef'
            },
            // ===== Recipe 11: Caprese Salad =====
            {
                id: '11',
                name: 'Caprese Salad',
                description: 'Simple Italian salad with tomatoes, mozzarella, and basil',
                ingredients: [
                    '4 large ripe tomatoes',
                    '400g fresh mozzarella cheese',
                    'Fresh basil leaves',
                    '3 tbsp extra virgin olive oil',
                    '2 tbsp balsamic vinegar',
                    'Salt and pepper to taste'
                ],
                steps: [
                    'Slice tomatoes into 1/4 inch thick rounds',
                    'Slice mozzarella into similar thickness',
                    'Arrange tomato and mozzarella slices alternating on a plate',
                    'Tuck basil leaves between slices',
                    'Drizzle with olive oil and balsamic vinegar',
                    'Season with salt and pepper',
                    'Let sit for 5 minutes before serving',
                    'Serve at room temperature'
                ],
                userId: 'user1'
            },
            // ===== Recipe 12: Vegetable Soup =====
            {
                id: '12',
                name: 'Vegetable Soup',
                description: 'Hearty and healthy vegetable soup',
                ingredients: [
                    '2 carrots, diced',
                    '2 celery stalks, diced',
                    '1 onion, diced',
                    '2 potatoes, cubed',
                    '1 zucchini, diced',
                    '1 can diced tomatoes',
                    '6 cups vegetable broth',
                    '2 cloves garlic, minced',
                    '1 tsp dried thyme',
                    '1 bay leaf',
                    '2 tbsp olive oil',
                    'Salt and pepper to taste'
                ],
                steps: [
                    'Heat olive oil in a large pot over medium heat',
                    'Add onion, carrots, and celery, cook for 5 minutes',
                    'Add garlic and cook for 1 minute',
                    'Add potatoes, zucchini, and tomatoes',
                    'Pour in vegetable broth',
                    'Add thyme and bay leaf',
                    'Bring to a boil, then reduce heat',
                    'Simmer for 25-30 minutes until vegetables are tender',
                    'Remove bay leaf',
                    'Season with salt and pepper',
                    'Serve hot with crusty bread'
                ],
                userId: 'chef'
            }
        ];
        localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(defaultRecipes));
    }
}

// ===== User Functions =====
function getUsers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];
}

function validateUser(username, password) {
    const users = getUsers();
    return users.find(u => u.username === username && u.password === password);
}

function setCurrentUser(username) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, username);
}

function getCurrentUser() {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
}

function logout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

// ===== Recipe Functions =====
function getRecipes() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.RECIPES)) || [];
}

function getUserRecipes(username) {
    const recipes = getRecipes();
    return recipes.filter(r => r.userId === username);
}

function getRecipeById(id) {
    const recipes = getRecipes();
    return recipes.find(r => r.id === id);
}

function addRecipe(recipe) {
    const recipes = getRecipes();
    recipes.push(recipe);
    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes));
}

function deleteRecipe(id) {
    const recipes = getRecipes();
    const filtered = recipes.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(filtered));
}

// ===== Settings Functions =====
// Get user settings with proper defaults
function getUserSettings(username) {
    const allSettings = JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS)) || {};
    
    // Return user-specific settings or defaults
    return allSettings[username] || {
        darkMode: false,
        stepDelay: 10,
        voiceGender: 'female', // Default: female voice
        voiceAccent: 'en-US'   // Default: American accent
    };
}

// Save user settings to localStorage
function saveUserSettings(username, settings) {
    const allSettings = JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS)) || {};
    allSettings[username] = settings;
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(allSettings));
}

// ===== Voice Settings Functions =====
// Set user's preferred voice gender and accent
function setUserVoice(username, gender, accent) {
    const settings = getUserSettings(username);
    settings.voiceGender = gender;
    settings.voiceAccent = accent;
    saveUserSettings(username, settings);
}

// Get user's preferred voice settings
function getUserVoice(username) {
    const settings = getUserSettings(username);
    return {
        gender: settings.voiceGender || 'female',
        accent: settings.voiceAccent || 'en-US'
    };
}

// ===== Apply User Settings to Page =====
// This function loads and applies user settings on any page
function applyUserSettings() {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        return; // No user logged in
    }
    
    const settings = getUserSettings(currentUser);
    
    // Apply dark mode theme
    if (settings.darkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    
    return settings;
}

// Initialize storage on load
initializeStorage();
