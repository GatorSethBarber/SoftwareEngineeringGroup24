import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CARDS } from '../mock-cards';
import { Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent {
  myControl: FormControl = new FormControl();

  cards = CARDS;

  user: User;
  columnsToDisplay: string[] = ['amount', 'expiryDate'];
  dataSource = new MatTableDataSource(CARDS);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private auth: AuthService) {
    auth.user$.subscribe(
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
}
