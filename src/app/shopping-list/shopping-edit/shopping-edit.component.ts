import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f',{static: false}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editedItem: Ingredient;
  constructor(private shopList:ShoppingListService) { }

  onSubmit(form: NgForm  ){
    const value = form.value;
    const ingredient = new Ingredient(value.name,value.amount,value.um)
    if (this.editMode){
      this.shopList.updateIngredient(this.editItemIndex, ingredient);
      this.editMode=false;
    } else {
      this.shopList.add(ingredient);
    }
    this.clearForm();
  }

  ngOnInit() {
    this.subscription = this.shopList.startedEditing.subscribe(
    (index: number) => {
      this.editItemIndex = index; 
        this.editMode=true;
        this.editedItem=this.shopList.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          um: this.editedItem.um,
          amount: this.editedItem.amount
        })
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  clearForm(){
    this.editMode=false;
    this.slForm.reset();
  }
  
  onDelete(){
    this.shopList.deleteIngredient(this.editItemIndex);
    this.clearForm();
  }

}
