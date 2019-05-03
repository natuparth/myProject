import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { GroceryComponent } from './main/grocery/grocery.component';
import { ExpenseComponent } from './main/expense/expense.component';
import { HomeComponent } from './home/home.component';
import { ShoppingListComponent } from './main/shopping-list/shopping-list.component';
<<<<<<< HEAD
import { MilkComponent } from './main/milk/milk.component';
=======
import { TestComponent } from './test/test.component';
>>>>>>> 3ac69c770e359823c68169bb1b361419779e685b

const routes: Routes = [
  { path: ' ', redirectTo:'home'   },
  { path:'test', component:TestComponent},
  {path: 'home', component:HomeComponent},
  {path:'main' , component:MainComponent,children:
   [
     {
       path:'grocery',component:GroceryComponent
     },
     { path:'test', component:TestComponent},
     {
       path:'expense', component:ExpenseComponent
     },
     {
       path:'shopping', component:ShoppingListComponent
     },
     {
       path:'milk', component:MilkComponent
     }

   ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
