import {Subject} from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {


updateFeed = new Subject<Ingredient[]>();

private ingredients: Ingredient[] = [];
startedEditing = new Subject<number>();

    constructor() { }

    getIngredients(): Ingredient[] {
        this.ingredients.sort((a: Ingredient, b: Ingredient) => {
          if (  a.name > b.name) {
            return 1;
          }
          return -1;
        });

        return this.ingredients.slice();
    }

    getIngredient(index: number): Ingredient {
        return this.ingredients[index];
    }

    add(element: Ingredient): void {

        let found = false;

        for (const item of this.ingredients) {
            if (item.name === element.name && item.um === element.um ) {
                item.amount = +item.amount + +element.amount;
                found = true;
                break;
            }
        }

        if (!found) {
            this.ingredients.push(element);
        }

        this.updateFeed.next(this.getIngredients());
    }

    addMultiple(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.updateFeed.next(this.getIngredients());
    }

    updateIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.updateFeed.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
       const removedItem = this.ingredients.splice(index, 1);
       console.log(removedItem);
       this.updateFeed.next(this.ingredients.slice());
    }
}
