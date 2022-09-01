import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm!:FormGroup
  constructor(private formBuilder:FormBuilder,private _http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(10),Validators.maxLength(10)]],
      password:['',[Validators.required,Validators.minLength(3)]]
    })
  }
logIn(){
  this._http.get<any>(" http://localhost:3000/signup1").subscribe(res=>{
    const user = res.find((a:any)=>{
      return a.email === this.loginForm.value.email && a.password===this.loginForm.value.password
    })
    if(user){
      alert('login successfully');
      this.loginForm.reset();
      this.router.navigate(["navbar"])
    }else{
      alert("user not found!!")
    }
    
  })
 
}
get email(): FormControl {
  return this.loginForm.get('email') as FormControl
}
get password(): FormControl {
  return this.loginForm.get('password') as FormControl
}
}
