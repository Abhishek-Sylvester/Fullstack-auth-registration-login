import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators,AbstractControl, ValidationErrors} from '@angular/forms';
import { NgClass, NgStyle,CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  name = 'Abhishek';
  email = 'abhisheksylvester@gmail.com';

  user={
    name:'Abhishek',
    email:'abhisheksylvester@gmail.com',
    password:'Abhishek@21'
  }

  signupForm = new FormGroup({
    name: new FormControl(this.user.name,[Validators.required]),
    email: new FormControl(this.user.email,[Validators.email,Validators.required]),
    password: new FormControl(this.user.password,[Validators.required,Validators.minLength(6),this.passwordValidator.bind(this)])
  }); 

  onSubmit(){
    console.log("User details: "+JSON.stringify(this.user))
    console.log("Name: "+this.user.name)
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if(!value){
      return null;
    }
    const password = control.value.toLocaleLowerCase();
    const name = this.signupForm?.get('name')?.value?.toLocaleLowerCase();
    if(name && password.includes(name)){
      return{containseName:true}
    }
    if(value.includes('@') || value.includes('!')){
      return{containsSpecialChar:true}
    }
    return null;
  }

  
}
