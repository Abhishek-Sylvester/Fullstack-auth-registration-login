import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { userQUery } from '../models/query-Model.model';
import { ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ɵEmptyOutletComponent } from "@angular/router";
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { QueryDetailsDialog } from '../query-details-dialog/query-details-dialog';

@Component({
  selector: 'app-query-page',
  imports: [ReactiveFormsModule, MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, ɵEmptyOutletComponent,DatePipe],
  templateUrl: './query-page.html',
  styleUrl: './query-page.css',
})
export class QueryPage implements OnInit {

  constructor(private authService:Auth, private cdr:ChangeDetectorRef, private dialog:MatDialog){}

  queryForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    subject: new FormControl('',[Validators.required]),
    priority: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required])
  })

  userQyeryList:userQUery[] = [];
  displayedColumns:string[] = [
    "name",
    "subject",
    "priority",
    "created on",
    "action"
  ]
  dataSource = new MatTableDataSource <userQUery>();
  selectedQuery:userQUery | null=null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(){
    console.log("ngOnInit called")
    this.loadQUeries()
  }

  onSubmit(){
    console.log("query form is submitted")

    const formData = {
      name:this.queryForm.value["name"],
      email:this.queryForm.value["email"],
      subject: this.queryForm.value["subject"],
      priority: this.queryForm.value["priority"],
      description: this.queryForm.value["description"]
    }

    console.log("This is the formData: "+ JSON.stringify(formData))

    this.authService.userQuery(formData).subscribe({
      next:(res)=>{
        alert(res)
        this.queryForm.reset()
        this.loadQUeries()
      },
      error:(err)=>{
        alert(err)
      }
    })
  }

  loadQUeries(){
    console.log("loadQUeries function called")
    this.authService.loadQUeries().subscribe({
      next:(res)=>{
        console.log("data recieved: "+res)
        this.userQyeryList = res;
        this.cdr.detectChanges();
        this.dataSource.data = res;
        console.log(this.userQyeryList.length)
        console.log(this.userQyeryList)
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

  viewQueryCard(query:userQUery){
    console.log("viewQueryCard function called")
    this.dialog.open(QueryDetailsDialog,{
      data:query
    });
    //this.selectedQuery = query;
    
  }
}
