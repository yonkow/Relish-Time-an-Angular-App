import { Recipe } from "./recipe";

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdRecipes: Recipe[]; //! Recipe
    likedRecipes: Recipe[]; //! Recipe
    createdAt: Date;
    updatedAt: Date;
}