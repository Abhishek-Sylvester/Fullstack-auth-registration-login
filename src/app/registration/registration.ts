import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators,AbstractControl, ValidationErrors} from '@angular/forms';
import { Auth } from '../services/auth';
import { RouterLink, Router } from "@angular/router";
@Component({
  selector: 'app-registration',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {

  constructor(private authService: Auth, private router: Router) {}
  

  registrationForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,this.passwordFormatCheck.bind(this)]),
      confirmPassword: new FormControl('',[Validators.required])
  },
  {validators:this.checkPassConfirmPassvalue.bind(this)}
  );

  passwordVal = '';
  confirmPasswordval = '';

  onSubmit(){
    console.log("Submit called")
    this.registrationForm.markAllAsTouched();
    if(this.registrationForm.invalid){
      alert("Fill all fields properly before submit")
      return;
    } 
    console.log("Registration form value: "+JSON.stringify(this.registrationForm.value))
    const formData = {
      username: this.registrationForm.value["name"],
      email: this.registrationForm.value["email"],
      password: this.registrationForm.value["password"]
    }
    console.log("formData: "+JSON.stringify(formData))

    this.authService.register(formData).subscribe({
      next:(res)=>{
        setTimeout(() => {
                    alert("Registration successfull");
                    console.log("Success: "+res)
                    this.router.navigate(['/login']);
                  }, 2000);
      },
      error:(err)=>{
        console.log("Error: "+err)
      }
    })
  }

  passwordFormatCheck(control: AbstractControl): ValidationErrors | null{
    const value = control.value;
    const specilCharacters = ["/","#","$","%"];
    if(!value) return null;

    if(value.length <8){
      return{ToShort:true}
    }
    if(specilCharacters.some(char=>value.includes(char))){
      return{containsSpecialChar:true}
    }
    return null;
  }

  checkPassConfirmPassvalue(form:AbstractControl):ValidationErrors|null{
    console.log("checkPassConfirmPassvalue called")
    console.log("form: "+JSON.stringify(form.value))
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    console.log("password: "+password)
    console.log("confirmPassword: "+confirmPassword)
    if(password !== confirmPassword){
      console.log("password and confirmPassword mismatch")
      return{passwordMismatch:true}
    }
    return null;
  }
}
