import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CARDS } from '../mock-cards';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
  myControl: FormControl = new FormControl();

  cards = CARDS;

  columnsToDisplay: string[] = ['cardNumber', 'amount', 'expirationDate'];
  dataSource = new MatTableDataSource(CARDS);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private AuthService: AuthService
  ) {  }

  options = [
    'Starbuck',
    'BestBuy',
    'Target',
    'Kohls'
  ];

  ngOnInit() {
    this.AuthService.userCards({username: "Anlaf"}).subscribe(
      (res) => {
        this.dataSource = res;
      },
      (err) => alert('Error getting card for user: ' + "Anlaf")
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}
