import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-cancel-dialog',
  templateUrl: './cancel-dialog.component.html',
  styleUrls: ['./cancel-dialog.component.css']
})
export class CancelDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { requestedID: number, offeredID: number }, private AuthService: AuthService) { }

  // cancelSwap() {
  //   this.AuthService.denySwap([]).subscribe(
  //     (res) => {
  //       console.log(res);
  //       alert('Card added successfully');
  //     },
  //     (err) => {
  //       console.error(err);
  //       alert('Error while adding the card');
  //     }
  //   );
  // }
}
