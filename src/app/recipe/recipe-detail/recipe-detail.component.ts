import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, Output  } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';



@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  @Output('id') id: number;

  constructor(private rS: RecipeService,private router: Router, private route: ActivatedRoute) { }


  addToShoppingList(){
    this.rS.toShoppingList(this.recipe.ingredients)
  }

  ngOnInit() {
    const id = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.rS.getRecipeById(this.id);
      }
    )
  }
  
  onEditRecipe(){
    //this.router.navigate(['edit'],{relativeTo:this.route});
    this.router.navigate(['../',this.id,'edit'],{relativeTo: this.route});
  } 
  
  onDeleteRecipe(){
    this.rS.delete(this.id);
    this.router.navigate(['/recipes']);
  }

}
