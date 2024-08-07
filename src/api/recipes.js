import { api } from ".";

export const fetchRecipes = async (ingredients) => {
    try {
        const response = await api.post('/generateReciepe', ingredients);

        if (response.status !== 200) {
            throw new Error(`Failed to fetch recipes: ${response.statusText}`);
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
};

export const getOtherRecipes = async () => {
    try {
        const response = await api.get('/otherRecipes');

        if (response.status !== 200) {
            throw new Error(`Failed to fetch other recipes: ${response.statusText}`);
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching other recipes:', error);
    }
};

