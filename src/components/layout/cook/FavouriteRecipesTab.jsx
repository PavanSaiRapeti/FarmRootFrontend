import React from 'react';

const FavouriteRecipesTab = ({ closePopup }) => {
  // Placeholder for favourite recipes state
  const favouriteRecipes = [
    { title: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish.', id: 1 },
    { title: 'Chicken Curry', description: 'A spicy and flavorful dish.', id: 2 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-frWhite">Favourite Recipes</h2>
      <ul className="list-disc ml-6 mb-4">
        {favouriteRecipes.map(recipe => (
          <li key={recipe.id} className="text-frWhite">
            {recipe.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavouriteRecipesTab;
