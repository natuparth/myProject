import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Item } from '../models/item.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  itemsCol: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  constructor(private firestore:AngularFirestore) { 

  }
  addItem(item:any){
       
    this.firestore.collection('shoppingList').doc('shoppingList').collection('list').add(item);
}
  updateItem(item:any){
   
     this.firestore.collection('shoppingList').doc('shoppingList').collection('list');

  }
  getList(){
    this.itemsCol=this.firestore.collection('shoppingList').doc('shoppingList').collection('list');
     this.items=this.itemsCol.valueChanges();
    return this.items;
     //return this.firestore.collection('shoppingList').doc('shoppingList').collection('list').snapshotChanges();
      
  }
}
