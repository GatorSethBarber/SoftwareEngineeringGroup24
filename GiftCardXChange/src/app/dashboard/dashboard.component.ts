import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CARDS } from '../mock-cards';
import { Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../User';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { VirtualTimeScheduler } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Card } from '../card';
import { CancelDialogComponent } from '../cancel-dialog/cancel-dialog.component';
import { RejectDialogComponent } from '../reject-dialog/reject-dialog.component';
import { AcceptDialogComponent } from '../accept-dialog/accept-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,


})
export class DashboardComponent {
  user: User;
  cardData: Card;

  cards = [];

  requests = [];

  public dashTabIndex = 1;


  columnsToDisplay: string[] = ['company', 'cardNumber', 'amount', 'expirationDate'];
  inboundColumnsToDisplay: string[] = ['requester', 'company', 'amount', 'expirationDate', 'requested', 'action'];
  outboundColumnsToDisplay: string[] = ['requested', 'company', 'amount', 'expirationDate', 'offeredCard', 'action'];
  dataSource = new MatTableDataSource(CARDS);
  inboundRequestSource = new MatTableDataSource(this.requests);
  outboundRequestSource = new MatTableDataSource(this.requests);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private AuthService: AuthService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private dialogRef: MatDialog
  ) {
    AuthService.user$.subscribe(
      (user) =>
      (this.user = user ?? {
        email: '',
        firstname: '',
        lastname: '',
        passWord: '',
        username: '',
      })
    );
  }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  options = ['Starbucks', 'BestBuy', 'Target', 'Kohls'];

  ngOnInit() {
    this.dashTabIndex = 3;
    this.AuthService.userCards(this.user).subscribe(
      (res) => {
        this.dataSource = res;
      },
      (err) => alert('Error getting card for user: ' + this.user.username)
    );
    this.AuthService.userRequestsInitiated().subscribe(
      (res) => {
        this.outboundRequestSource = res;
      },
      (err) => {
        if (err.status != 404) {
          alert('Error getting requests initialized by user: ' + this.user.username);
        }
      }
    );
    this.AuthService.userRequestsRecieved().subscribe(
      (res) => {
        this.inboundRequestSource = res;
      },
      (err) => {
        if (err.status != 404) {
          alert('Error getting requests of user: ' + this.user.username);
        }
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //add new gift card
  cardForm = this.formBuilder.group({
    company: new FormControl('', Validators.required),
    cardnumber: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    expirationDate: new FormControl('', Validators.required),
    username: new FormControl(
      this.AuthService.user$.value?.username,
      Validators.required
    ),
  });
  onSubmit() {
    this.AuthService.addNewGiftCard(this.cardForm.value as any as Card).subscribe(
      (res) => {
        console.log(res);
        alert('Card added successfully');
        location.reload();
      },
      (err) => {
        console.error(err);
        alert('Error while adding the card');
      }
    );
  }

  openOutboundDialog(offeredID: number, requestedID: number) {
    this.dialogRef.open(CancelDialogComponent, { width: '300px', height: '300px', data: { offeredID: offeredID, requestedID: requestedID } });
  }

  openDenyDialog(offeredID: number, requestedID: number) {
    this.dialogRef.open(RejectDialogComponent, { width: '300px', height: '300px', data: { offeredID: offeredID, requestedID: requestedID } });
  }

  openAcceptDialog(offeredID: number, requestedID: number) {
    this.dialogRef.open(AcceptDialogComponent, { width: '300px', height: '300px', data: { offeredID: offeredID, requestedID: requestedID } });
  }
}
