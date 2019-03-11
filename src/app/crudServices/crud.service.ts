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
       
    this.firestore.collection('shoppingList').doc(item.name).set(item);
}
  updateItem(item:any,name:string){
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
    this.firestore.collection('shoppingList').doc(name).set(item);
  
   
  }

  getItem(name:string){
   return this.firestore.collection('shoppingList').doc(name).get();

  }
  getFilteredList():any{
    var db=firebase.firestore();
    var collections=db.collection('shoppingList');
    collections.where("quantity-("+((new Date().getTime()-new Date("dateOfLastPurchase").getTime())/(1000*3600*24))+")",">=","5").get().then(data=>{
      data.forEach(data=>
      this.users.push(data);
       console.log(data);
      );
    }
    ).then(dat=>{
      console.log(this.users, dat);
      return this.users;});
    
  }

  getList(){
    this.itemsCol=this.firestore.collection('shoppingList');
     this.items=this.itemsCol.valueChanges();
    return this.items;
     //return this.firestore.collection('shoppingList').doc('shoppingList').collection('list').snapshotChanges();
      
  }

  
}
