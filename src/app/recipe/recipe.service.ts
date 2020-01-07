import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{
    changesOccured = new Subject<Recipe[]>();
    selectedRecipe = new Subject<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
        'Lasagne', 
        'Lasagne alla bolognese', 
        'https://www.donnamoderna.com/wp-content/uploads/2004/06/lasagne-di-pane-carasau-con-ragu-e-pecorino-sardo-preparazione-830x625.jpg',
        [new Ingredient('Carne Macinata',500,'gr'),new Ingredient('Sugo',1,'L'),new Ingredient('Lasagne all\'uovo',500,'gr')]
    ),
        new Recipe(
            'Cannelloni', 
            'Cannelloni alla Amalfitana', 
            'https://statics.cucchiaio.it/content/cucchiaio/it/ricette/2018/10/cannelloni-amalfitani/jcr:content/header-par/image-single.img10.jpg/1540412251468.jpg',
            [  new Ingredient('Carne Macinata',500,'gr'),new Ingredient('Sugo',1,'L'),new Ingredient('cannelloni',500,'gr')]
        )
    ];
 
    constructor(private sLS : ShoppingListService){
    }
    getRecipes(){
        //return this.recipes << returns reference to private array
        return this.recipes.slice();
    }

    getRecipeById(id:number){ 
        return  this.recipes[id];
    }
    
    toShoppingList(ingredients : Ingredient[]){
        this.sLS.addMultiple(ingredients);
    }

    add(recipe: Recipe){
         this.recipes.push(recipe);
         this.changesOccured.next(this.recipes.slice());
    }
    edit(index: number, newRecipe:Recipe){
        this.recipes[index] = newRecipe;
        this.changesOccured.next(this.recipes.slice());
     }

    delete(index: number){ 
        this.recipes.splice(index,1);
        this.changesOccured.next(this.recipes.slice());
    }

}