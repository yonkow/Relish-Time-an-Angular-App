import { Recipe } from "./recipe";
import { User } from "./user"

export interface CommentRecipe {
    content: string,
    owner: User,
    recipe: Recipe
    createdAt: string;
    updatedAt: string;
}