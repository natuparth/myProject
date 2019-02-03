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
  newItem:any;
  constructor(private firestore:AngularFirestore) { 

  }
  addItem(item:any){
       
    this.firestore.collection('shoppingList').doc(item.name).set(item);
}
  updateItem(item:any,name:string){
   console.log(item.name);
    // this.newItem=this.firestore.collection('shoppingList').doc(item.name);
    // this.newItem.quantity+=item.quantity;
    // this.newItem.dateOfLastPurchase=item.dateOfLastPurchase;
     this.firestore.collection('shoppingList').doc(name).set(item);
  }
  getList(){
    this.itemsCol=this.firestore.collection('shoppingList');
     this.items=this.itemsCol.valueChanges();
    return this.items;
     //return this.firestore.collection('shoppingList').doc('shoppingList').collection('list').snapshotChanges();
      
  }
}
