import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Item } from '../models/item.model';
import { Users } from '../models/users.model'
import { Observable, config } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import { User } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  itemsCol: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  users:any[]=[];// Observable<Users[]>;
  usersCol: AngularFirestoreCollection<Users>
  newItem:any;
  userid:string;
  constructor(private firestore:AngularFirestore) { 
  }
  addItem(item:any){
       
    this.firestore.collection('shoppingList').doc(item.name).set(item).catch(()=>{
      console.log('cannot add item');
    });
}
 deleteItem(item: string){
   this.firestore.collection('shoppingList').doc(item).delete().then(()=>{
     console.log('item has been deleted successfully');
     alert('item has been deleted');
   })
 }
  updateItem(item:Item,name:string){
   console.log(item.name);
   var docRef = this.firestore.collection("shoppingList").doc(name);

  //  docRef.get().subscribe((snapshot)=>{
  //   console.log(snapshot.data());
  //   this.newItem={
  //     name:name,
  //     dateOfLastPurchase:item.dateOfLastPurchase,
  //     price:snapshot.data().price,
  //     quantity:snapshot.data().quantity+item.quantity
  //   }
   return this.firestore.collection('shoppingList').doc(name).set(Object.assign({},item)).then(()=>{
     return 'item updated successfully';
   }).catch(()=>{
     return 'item could not be updated';
   });
  
   
  }

  getItem(name:string){
   return this.firestore.collection('shoppingList').doc(name).get();

  }
  getFilteredList():Observable<Item[]>{
    this.itemsCol=this.firestore.collection('shoppingList');
    this.items=this.itemsCol.valueChanges();// collections.where("quantity-("+((new Date().getTime()-new Date("dateOfLastPurchase").getTime())/(1000*3600*24))+")",">=","5").get().then(data=>{
    return this.items;
    //   data.forEach(data=>{
    //   this.users.push(data);
    //    console.log(data);
    //     })
    //   }).then(dat=>{
    //   console.log(this.users, dat);
    //   return this.users;});
    
  }

  getList(){
    this.itemsCol=this.firestore.collection('shoppingList');
     this.items=this.itemsCol.valueChanges();
    return this.items;
     //return this.firestore.collection('shoppingList').doc('shoppingList').collection('list').snapshotChanges();
      
  }

  
}
