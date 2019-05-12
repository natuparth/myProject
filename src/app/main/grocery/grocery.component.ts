import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Item } from 'src/app/models/item.model';
import { CrudService } from 'src/app/crudServices/crud.service';
import { Observable } from 'rxjs';
import { NgForm, FormGroup, FormControlName, FormControl, Validators } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.css']
})
export class GroceryComponent implements OnInit {
  addItemForm : FormGroup
  updateItemForm : FormGroup = new FormGroup({
    'name' : new FormControl(''),
    'date' : new FormControl('',[Validators.required,this.dateValidator.bind(this)]),
    'price' : new FormControl('', Validators.required),
    'quantity' : new FormControl('',Validators.required )


  })
  public modelHidden: boolean;
  Items: Observable<Item[]>;
  itemsCol: AngularFirestoreCollection<Item>;
  addDisplay : String = 'none';
  display: String = 'none';
  itemName: string;
  itemDate: Date;
  filteredList: any[] = [];
  itemsArray: any[] = [];
  constructor(private crudService: CrudService, private firestore: AngularFirestore) {

  }

  addItem(item: any) {
    console.log(item)
    this.crudService.addItem(item);
    this.modelHidden = true;
    alert('item has been added successfully')
    this.addDisplay = 'none';
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
      this.addItemForm = new FormGroup({
        'name' : new FormControl('',Validators.required),
        'date' : new FormControl(Date.now,Validators.required),
        'price' : new FormControl('',Validators.required),
        'consumptionPerDay' : new FormControl('',Validators.required),
        'quantity': new FormControl('',Validators.required)
      })


    this.modelHidden = true;

    this.updateItemForm.statusChanges.subscribe((status)=>{
      console.log(status);
      console.log(this.updateItemForm)
    })
  }
  openModal(name: String, date: Date) {
    this.itemName = name as string;
    this.itemDate = date ;
    this.display = 'block';

  }
  openAddModal(){
    this.addDisplay = 'block';
  }
  onCloseHandled(modalName: String) {
    if(modalName==='add')
    this.addDisplay = 'none';
    else
    this.display = 'none';
  }

  updateItem() {
   let item : Item = new Item();
    
    console.log(this.itemName);
    this.crudService.getItem(this.itemName).subscribe(doc=>{
      var date1 = new Date(this.updateItemForm.get('date').value);
      let date2 = new Date(doc.data().dateOfLastPurchase);
      var diff = Math.abs(date2.getTime() - date1.getTime());
      var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      if(diffDays<0)
      alert('the current purchase date cannot be prior to the last purchase date')
      console.log(diffDays);
      item.quantity=this.updateItemForm.get('quantity').value+(doc.data().quantity-(diffDays*doc.data().consumptionPerDay));
      console.log(item.quantity);
      item.name=this.itemName;
      item.consumptionPerDay=doc.data().consumptionPerDay;
      item.dateOfLastPurchase = this.updateItemForm.get('date').value;
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

  validateDate(date: Date){
    console.log(date.toString);
    console.log(this.itemDate);
    console.log(this.updateItemForm);
    if(date.toString()=='')
    this.updateItemForm.get('date').setErrors({required: true});
   else if(date < this.itemDate && date.toString()!='')
    {
     // alert('the entered date is prior to the last purchase date');
      this.updateItemForm.get('date').setErrors({'invalidDate': true});
    }
    else{
      this.updateItemForm.get('date').setErrors({'invalidDate': null});
    }

  }

  dateValidator(control: FormControl): {[s : string] : boolean}{
    if(control.value < this.itemDate && control.value.toString()!='')
     return {'invalidDate': true}
     else
      return null;
  }

  deleteItem(item:string){
    if(confirm('Are you sure you want to remove '+ item+ ' from grocery list'))
    this.crudService.deleteItem(item);

  }

}


