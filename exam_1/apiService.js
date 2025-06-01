export const apiService = {
    getData: async (searchCocktail) => {
        try {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchCocktail}`);
            if (!response.ok) throw new Error("Ошибка " + response.status);
            return await response.json();
        } catch (err) {
            console.error("Ошибка:", err);
            return { drinks: [] };
        }
    }
};