import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipe/recipe.service';
import {Recipe} from '../recipe/recipe.model';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private apiUrl = 'https://ng-recipes-5a493.firebaseio.com/recipes.json';

  constructor( private http: HttpClient, private recipeService: RecipeService ) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put(this.apiUrl, recipes)
      .subscribe(
        response => {
          console.log(response);
        }
      );
  }

  fetchRecipes() {
   return this.http
      .get<Recipe[]>(this.apiUrl)
      .pipe(map( recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
        tap(recipes => {
          this.recipeService.set(recipes);
        })
      );
  }


}
