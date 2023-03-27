import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CARDS } from '../mock-cards';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
  myControl: FormControl = new FormControl();

  cards = CARDS;

  columnsToDisplay: string[] = ['amount', 'expiryDate'];
  dataSource = new MatTableDataSource(CARDS);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  options = [
    'Starbuck',
    'BestBuy',
    'Target',
    'Kohls'
  ];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}
