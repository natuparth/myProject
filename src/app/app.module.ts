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
import { UpdateListComponent } from './main/update-list/update-list.component';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    GroceryComponent,
    ExpenseComponent,
    HomeComponent,
    UpdateListComponent
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
