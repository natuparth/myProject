import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/crudServices/crud.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { element } from '@angular/core/src/render3';
import { functions } from 'firebase';
import { snapshotChanges } from 'angularfire2/database';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  membersList:any=[];
  welcomeFlag:boolean=true;
  memberListTranslate:any=[];
  memberListPos='40%';
  memberListTranslatePos=-20;
  constructor(private crudService:CrudService,private firestore:AngularFirestore) { }

  ngOnInit() {
    console.log('inside expense management component')
      this.GetUsers();
      this.welcomeFlag=true;
  }
  
  MemberFunction(index:any)
  {
    console.log('memberfunction id:'+this.membersList[index].id);
    console.log(this.memberListTranslate[0]);
    this.memberListPos='1%'
    this.welcomeFlag=false;
  }

  GetUserValues(id:any)
  {
    console.log('inside get uservalues function id: '+id);
  }

  async GetUsers()
  {
    var temp=this;
    console.log('inside expense get user');
    try
    {
      await this.firestore.collection('expenses')
      .get()
      .subscribe(function(querysnapshot)
      {
        var count=0;
        querysnapshot.forEach(function(doc)
        {
          //console.log(doc.id+' '+doc.data().name+count++);
          temp.membersList.push({index:count++,id:doc.id,name:doc.data().name});
          temp.memberListTranslate.push('translate(0px,'+(temp.memberListTranslatePos+count*55)+'px)');
          console.log(temp.membersList);
          console.log(temp.memberListTranslate[count-1]);
        })
      })
      console.log('sadsd'+this.membersList[0])
    }
    catch(e)
    {
      console.log('user fetch error');
      alert(e.message);
    }
  }
}
