import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  traveltype=[
    {value: "local",viewValue: "Local" },
    {value: "outstation",viewValue: "Outstation" },
    {value: "office",viewValue: "Office"}
  ];

  branch=[
    {id: 1, name:"Ahmedabad"},
    {id: 2, name:"Surat"},
    {id: 3, name:"Rajkot"},
    {id: 4, name:"Vadodara"}
  ];

  typeofcall=[
    {value: "sales",viewValue: "Sales" },
    {value: "service",viewValue: "Service" },
    {value: "project",viewValue: "Project"}
  ];

  constructor() { 


  }

  ngOnInit() {
  }

  userinfo = new FormGroup({
    username: new FormControl('',Validators.required),
    email: new FormControl('', Validators.required),
    selects_3: new FormControl('', Validators.required)
  })

  
onSubmit() {
    
}
addNewEmployeeAddress() {
    // this.employeeAddressForm.reset();
    // this.submitted = false;
}

}
