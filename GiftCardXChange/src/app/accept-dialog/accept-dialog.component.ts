import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-accept-dialog',
  templateUrl: './accept-dialog.component.html',
  styleUrls: ['./accept-dialog.component.css']
})
export class AcceptDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { requestedID: number, offeredID: number }) { }
}
