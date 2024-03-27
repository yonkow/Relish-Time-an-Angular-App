import { Recipe } from "./recipe";

export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    createdRecipes: Recipe[]; //! Recipe
    likedRecipes: Recipe[]; //! Recipe
    comentedRecipes: Recipe[]; //! Recipe
    createdAt: Date;
    updatedAt: Date;
}