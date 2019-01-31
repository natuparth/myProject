import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../auth/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit() {
  }
  validateCredentials(values:any){
    //if(values.username=="parth.natu@gmail.com"&& values.password=="natunatu")
    this.authService.login(values.username,values.password)  ;
    //this.router.navigate(['main']);

}
}
