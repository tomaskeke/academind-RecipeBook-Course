import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipes.model'

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();


  //  private  recipes: Recipe[] = [
  //       new Recipe('Schnitzel', 'A super-tasty Schnitzel', 
  //       'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //       [
  //           new Ingredient('Meat', 1),
  //           new Ingredient('French Fries', 20)
  //       ]),
  //       new Recipe('Big Fat Burger', 'This is simply a test',
  //       'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg/800px-Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //       [
  //           new Ingredient('Buns', 2),
  //           new Ingredient('Meat', 1)
  //       ])
    
  //     ];
    private recipes: Recipe[] = [];


      constructor(private slService: ShoppingListService) {}

      setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes(){
          return this.recipes.slice();
      }

      getRecipe(index: number){
          return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
      }
      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe)
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
          this.recipes.splice(index, 1);
          this.recipesChanged.next(this.recipes.slice());
      }
}