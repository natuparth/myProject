import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Item } from 'src/app/models/item.model';
import { CrudService } from 'src/app/crudServices/crud.service';
import {Observable} from 'rxjs';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.css']
})
export class GroceryComponent implements OnInit {
public modelHidden:boolean;
Items:Observable<Item[]>;  
display:String='none';
itemName:string;
constructor(private crudService:CrudService) { 

}
  
  addItem(item:any){
    console.log(item)
    this.crudService.addItem(item);
    this.modelHidden=true;
  }
  

  
  makeModalVisible(){
    console.log("visible method called");
    this.modelHidden=false;
  }
  hideModal(){
    this.modelHidden=true;
  }
  
  ngOnInit() {
    //this.crudService.getList().subscribe(data => {
     this.Items=this.crudService.getList();
     


    this.modelHidden=true;
  }
  openModal(name:String){
this.itemName=name as string;
this.display='block';

  }
  onCloseHandled(){
    this.display='none';
  }

   updateItem(item:any){
     console.log(this.itemName);
     this.crudService.updateItem(item,this.itemName);

   }
}
