import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Item } from 'src/app/models/item.model';
import { CrudService } from 'src/app/crudServices/crud.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.css']
})
export class GroceryComponent implements OnInit {
  public modelHidden: boolean;
  Items: Observable<Item[]>;
  itemsCol: AngularFirestoreCollection<Item>;

  display: String = 'none';
  itemName: string;
  filteredList: any[] = [];
  itemsArray: any[] = [];
  constructor(private crudService: CrudService, private firestore: AngularFirestore) {

  }

  addItem(item: any) {
    console.log(item)
    this.crudService.addItem(item);
    this.modelHidden = true;
  }



  makeModalVisible() {
    console.log("visible method called");
    this.modelHidden = false;
  }
  hideModal() {
    this.modelHidden = true;
  }

  ngOnInit() {
    //this.crudService.getList().subscribe(data => {
    this.Items = this.crudService.getList();



    this.modelHidden = true;
  }
  openModal(name: String) {
    this.itemName = name as string;
    this.display = 'block';

  }
  onCloseHandled() {
    this.display = 'none';
  }

  updateItem(item: any) {
    console.log(this.itemName);
    this.crudService.getItem(this.itemName).subscribe(doc=>{
      var date1 = new Date(item.dateOfLastPurchase);
      let date2 = new Date(doc.data().dateOfLastPurchase);
      var diff = Math.abs(date2.getTime() - date1.getTime());
      var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      console.log(diffDays);
      item.quantity+=(doc.data().quantity-(diffDays*doc.data().consumptionPerDay));
      console.log(item.quantity);
      item.name=this.itemName;
      item.consumptionPerDay=doc.data().consumptionPerDay;
      this.crudService.updateItem(item,this.itemName);
    });
   // this.crudService.updateItem(item, this.itemName);

  }

  shoppingList() {
    this.itemsCol = this.firestore.collection('shoppingList');
    this.itemsCol.get().subscribe(doc => {
      doc.docs.forEach(docu => {
        this.itemsArray.push(docu.data());
        //  console.log(docu.data());

      });
      // console.log(this.itemsArray);
      for (let item of this.itemsArray) {
        var date1 = new Date();
        let date2 = new Date(item.dateOfLastPurchase);
        var diff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        // console.log(diffDays);
      }



    });





  }

}


