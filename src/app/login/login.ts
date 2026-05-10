import { Auth } from './../services/auth';
import { Component, signal } from '@angular/core';
import { disabled } from '@angular/forms/signals';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgStyle,CommonModule } from '@angular/common';
import { RouterLink, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgClass, CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  
  constructor(private authService:Auth, private router: Router){}

  name="Abhishek"

  loginForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  })

  onSubmit(){
    console.log("Form is submitted")

    const formData ={
      username: this.loginForm.value["name"],
      password: this.loginForm.value["password"]
    }

    this.authService.login(formData).subscribe({
      next:(res)=>{
        console.log("Success "+res)
        localStorage.setItem("token",res) //storing token at localStorage
        console.log("navigating to practice")
        this.router.navigate(["/practice"]);
      },
      error:(err)=>{
        alert("Username or password entered wrong")
        console.log("Error "+JSON.stringify(err))
      }
    })
  }
}
