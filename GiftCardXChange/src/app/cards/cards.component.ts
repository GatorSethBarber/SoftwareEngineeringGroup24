import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CARDS } from '../mock-cards';
import { BRANDS } from '../mock-brands';
import { filter } from 'rxjs';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

  public state = "";

  cards = CARDS;
  brands = BRANDS;

  chosenBrand: import("../brand").Brand;

  columnsToDisplay: string[] = ['userID', 'amount', 'expiryDate'];
  dataSource = new MatTableDataSource(CARDS);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {  }

  ngOnInit() {
    this.state = window.history.state.brandName;

    this.brands.forEach(brand => {
      if (brand.name == this.state) {
         this.chosenBrand = brand;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
