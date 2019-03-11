import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/crudServices/crud.service';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
 Items:Observable<Item[]>;
 items:any[];
  constructor(private crudService:CrudService) { }

  ngOnInit() {

    this.items=this.crudService.getFilteredList();
    console.log(this.items);
  }

}
