import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { userQUery } from '../models/query-Model.model';


@Component({
  selector: 'app-query-details-dialog',
  imports: [MatDialogActions, MatDialogContent],
  templateUrl: './query-details-dialog.html',
  styleUrl: './query-details-dialog.css',
})
export class QueryDetailsDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public query:userQUery){}
}
