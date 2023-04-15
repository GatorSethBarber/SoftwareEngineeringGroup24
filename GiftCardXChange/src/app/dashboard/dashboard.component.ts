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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,


})
export class DashboardComponent {
  user: User;
  cardData: Card;

  cards = CARDS;

  requests = [
    CARDS, CARDS
  ]


  columnsToDisplay: string[] = ['company', 'cardNumber', 'amount', 'expirationDate'];
  inboundColumnsToDisplay: string[] = ['requester', 'company', 'amount', 'expirationDate', 'requested'];
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



  options = ['Starbuck', 'BestBuy', 'Target', 'Kohls'];

  ngOnInit() {
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
      (err) => alert('Error getting requests initated by user: ' + this.user.username)
    );
    this.AuthService.userRequestsRecieved().subscribe(
      (res) => {
        this.inboundRequestSource = res;
      },
      (err) => alert('Error getting requests of user: ' + this.user.username)
    );
    console.log(this.requests);
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
      },
      (err) => {
        console.error(err);
        alert('Error while adding the card');
      }
    );
  }

  openOutboundDialog() {
    this.dialogRef.open(CancelDialogComponent, { width: '300px', height: '300px' });
  }

}
