import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
signupForm!:FormGroup
  constructor( private formBuilder:FormBuilder ,private _http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      Name:['',[Validators.required,Validators.minLength(3),Validators.pattern('[a-z A-Z].*')]],
      Email :['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(10),Validators.maxLength(10)]],
      Mobile:['',[Validators.required,Validators.email]],
      Password:['',[Validators.required,Validators.minLength(3)]]

    });
    
    
    

  }
   signUp(){
    this._http.post<any>("http://localhost:3000/signup1",this.signupForm.value).subscribe (res=>{
      alert("you are a member now!")
      this.signupForm.reset();
      this.router.navigate(['login1'])
    },err =>{
    alert("oops something went wrong")
  })
  
   }
   get Name(): FormControl {
      return this.signupForm.get('Name') as FormControl
    }
    get Mobile(): FormControl {
      return this.signupForm.get('Mobile') as FormControl
      }
      get Email(): FormControl {
        return this.signupForm.get('Email') as FormControl
      }
      get Password(): FormControl {
        return this.signupForm.get('Password') as FormControl
      }




// registerForm= new FormGroup({
//   Name:new FormControl('', [Validators.required,Validators.minLength(3),Validators.pattern('[a-z A-Z].*')]),
//   Mobile:new FormControl('',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(10),Validators.maxLength(10)]),
//   Email:new FormControl('',[Validators.required,Validators.email]),
//   Password: new FormControl('',[Validators.required,Validators.minLength(3)])

// });
// registerSubmited(){
//   console.log(this.registerForm);
// }
// get Name(): FormControl {
//   return this.registerForm.get('Name') as FormControl
// }
// get Mobile(): FormControl {
//   return this.registerForm.get('Mobile') as FormControl
// }
// get Email(): FormControl {
//   return this.registerForm.get('Email') as FormControl
// }
// get Password(): FormControl {
//   return this.registerForm.get('Password') as FormControl
// }

}

