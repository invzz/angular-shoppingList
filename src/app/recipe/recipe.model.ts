import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
    public name: string; // name
    public description: string; // description
    public imagePath: string; // url
    public ingredients: Ingredient[];

    constructor(name: string, description: string, imagePath: string, ingredients: Ingredient[]) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}
