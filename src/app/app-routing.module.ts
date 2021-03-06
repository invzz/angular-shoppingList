import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe/recipe-list/recipe-item/recipe-item.component';
import { LandingRecipeComponent } from './recipe/landing-recipe/landing-recipe.component';
import { EditRecipeComponent } from './recipe/edit-recipe/edit-recipe.component';
import {RecipesResolverService} from './recipe/recipes-resolver.service';
import {AuthComponent} from './auth/auth/auth.component';

const appRoutes: Routes = [
    // root
    {path: '', redirectTo: 'recipes', pathMatch: 'full'},

    // Recipes
    {
      path: 'recipes',
      component: RecipeComponent,
      children: [
        {path: '', component: LandingRecipeComponent, pathMatch: 'full'},
        {path: 'new', component: EditRecipeComponent},
        {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
        {path: ':id/edit', component: EditRecipeComponent, resolve: [RecipesResolverService]},
        // {path:'recipe-detail', component: RecipeDetailComponent},
        {path: 'recipe-list', component: RecipeDetailComponent, children: [
            {path: 'recipe-item', component: RecipeItemComponent}
        ]}
    ]},

    // Sopping list
    {path: 'shop', component: ShoppingListComponent, children: [
        {path: 'edit', component: ShoppingListComponent}
    ]},
  { path: 'auth', component: AuthComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {

}
