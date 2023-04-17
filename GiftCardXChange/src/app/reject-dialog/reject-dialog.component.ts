import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-reject-dialog',
  templateUrl: './reject-dialog.component.html',
  styleUrls: ['./reject-dialog.component.css']
})
export class RejectDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { requestedID: number, offeredID: number }, private AuthService: AuthService) { }

  denySwap() {
    this.AuthService.denySwap(this.data.offeredID, this.data.requestedID).subscribe(
      (res) => {
        console.log(res);
        alert('Card swap denied successfully');
        location.reload();
      },
      (err) => {
        console.error(err);
        alert('Error while denying card swap');
      }
    );
  }
}
