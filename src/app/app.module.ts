import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { GroceryComponent } from './main/grocery/grocery.component';
import { ExpenseComponent } from './main/expense/expense.component';
import { HomeComponent } from './home/home.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { CrudService } from './crudServices/crud.service';
import { ShoppingListComponent } from './main/shopping-list/shopping-list.component';
<<<<<<< HEAD
import { MilkComponent } from './main/milk/milk.component';
=======
import { TestComponent } from './test/test.component';
>>>>>>> 3ac69c770e359823c68169bb1b361419779e685b

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    GroceryComponent,
    ExpenseComponent,
    HomeComponent,
    ShoppingListComponent,
<<<<<<< HEAD
    MilkComponent
=======
    TestComponent
>>>>>>> 3ac69c770e359823c68169bb1b361419779e685b
  ],
  imports: [FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, 
    AngularFireAuthModule,
     
  ],
  providers: [CrudService],
  bootstrap: [AppComponent]
})
export class AppModule {

 
 }
