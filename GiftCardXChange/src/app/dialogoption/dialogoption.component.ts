import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Card } from '../card';
import { MatTableDataSource } from '@angular/material/table';
import { CARDS } from '../mock-cards';
import { User } from '../User';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder , FormControl} from '@angular/forms';



export interface CardRE {
  company__name: string;
  card__number: string;
  card__amount: number;
}
@Component({
  selector: 'app-dialogoption',
  templateUrl: './dialogoption.component.html',
  styleUrls: ['./dialogoption.component.css']
})



export class DialogoptionComponent {
userCard: Card
user: User
cards = CARDS;

displayedColumns = ['Company', 'Card Number', 'Amount', 'Action'];

requests = [
  CARDS, CARDS
]


columnsToDisplay: string[] = ['company', 'cardNumber', 'amount', 'expirationDate'];
inboundColumnsToDisplay: string[] = ['requester', 'company', 'amount', 'expirationDate', 'requested'];
outboundColumnsToDisplay: string[] = ['requested', 'company', 'amount', 'expirationDate', 'offeredCard'];
dataSource = new MatTableDataSource(CARDS);
inboundRequestSource = new MatTableDataSource(this.requests);
outboundRequestSource = new MatTableDataSource(this.requests);

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

clickedRows = new Set<CardRE>();

constructor(private formBuilder:FormBuilder,private AuthService: AuthService, private router: Router) {
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


ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

ngOnInit() {
  this.AuthService.userCards(this.user).subscribe(
    (res) => {
      this.dataSource = res;
    },
    (err) => alert('Error getting card for user: ' + "Anlaf")
  );
    console.log(this.requests);
}



requestSubmit(){
  this.AuthService.sendRequest().subscribe((res) => {
    console.log(res);
    alert('Sent request');
  },
  (err) => {
    alert('please checkk');
  }
  )
}



}
