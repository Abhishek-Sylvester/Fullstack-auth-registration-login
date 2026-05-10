import { Component } from '@angular/core';
import { disabled } from '@angular/forms/signals';
import { RouterOutlet } from '@angular/router';
import { FormsModule  } from '@angular/forms';
import { NgClass, NgStyle,CommonModule } from '@angular/common';
import { Auth } from './../services/auth';

@Component({
  selector: 'app-practice',
  imports: [FormsModule,NgClass,CommonModule],
  templateUrl: './practice.html',
  styleUrl: './practice.css',
})
export class Practice {
  
  constructor(private authService:Auth){}

  title = "My Task List"
  name="Aaron";
  email = "aaronsylvester@gmail.com";
  isLoggedIn = false;
  
  count = 5;
  user = {name:"Aaron"}

  isDisabled = true;
  imageUrl = 'assets/logo.png';
  buttonLabel = 'Save Task';
  progressValue = 75;

  task:string[] = [];

  listName = '';
  listOfUsers: string[] = [];
  fruits = ['apple', 'banana', 'cherry'];
  status = 'active';

  isActive = true;
  hasError = false;
  myName = 'Aaron';
  myCTC = 50000;
  date = new Date();

  addTask(taskName:string){
    this.task.push(taskName)
    console.log("task: "+this.task)
  }
  onKeyPress(event:KeyboardEvent){
    if(event.key==="Enter"){
      alert("Enter pressed");
    }
  }

  highlight(event:any){
    console.log("highlight triggered")
    event.target.style.backgroundColor = "yellow";
    
  }

  searchTerm = "";

  onInput(event:any){
    console.log("event value: "+event)
  }

  getSum(a: number, b: number): number {
    return a + b;
  }

  buttonClicked() {
    alert('Button clicked');
  }

  toggleButtonDisable() {
    this.isDisabled = !this.isDisabled;
  }

  addUser() {
    this.listOfUsers.push(this.listName);
    this.listName = '';
  }

  toggle() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  randomStatus() {
    // Simple toggle for demo
    this.status = this.status === 'active' ? 'inactive' : 'active';
  }

  ngOnInit(){
    this.authService.practice().subscribe({
    next:(res)=>{
        console.log("Success "+res)
    
      },
      error:(err)=>{
       console.log("Error "+JSON.stringify(err))
      }
  })
  }

  

  
}
