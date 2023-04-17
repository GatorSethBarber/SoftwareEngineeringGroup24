import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-accept-dialog',
  templateUrl: './accept-dialog.component.html',
  styleUrls: ['./accept-dialog.component.css']
})
export class AcceptDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { requestedID: number, offeredID: number }, private AuthService: AuthService) { }

  acceptSwap() {
    this.AuthService.acceptSwap(this.data.requestedID, this.data.offeredID).subscribe(
      (res) => {
        console.log(res);
        alert('Cards swapped successfully');
      },
      (err) => {
        console.error(err);
        alert('Error while swapping the cards');
      }
    );
  }
}
