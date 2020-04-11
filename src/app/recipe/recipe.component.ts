import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],

})
export class RecipeComponent implements OnInit {
  OFFSET = 2;
  chunks = [];
  constructor() { }
  ngOnInit() {
    this.chunks = Array.from(Array(this.OFFSET), (x) => 0);
    console.log(this.chunks);
  }
}
