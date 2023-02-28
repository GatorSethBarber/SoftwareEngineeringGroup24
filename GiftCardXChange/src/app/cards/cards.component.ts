import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CARDS } from '../mock-cards';
import { BRANDS } from '../mock-brands';
import { filter } from 'rxjs';
import { AuthService } from '../auth.service';

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
    private router: Router,
    private AuthService: AuthService
  ) {  }

  ngOnInit() {
    this.state = window.history.state.brandName;

    this.brands.forEach(brand => {
      if (brand.name == this.state) {
         this.chosenBrand = brand;
      }
    });

    console.log(this.chosenBrand.name)

    this.AuthService.brandCards({CompanyName: this.chosenBrand.name.replace(/\s+/g, '')}).subscribe(
      (res) => {
        console.log(res);
        this.dataSource = res;
      },
      (err) => alert('Error getting card for brand: ' + this.chosenBrand.name)
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
