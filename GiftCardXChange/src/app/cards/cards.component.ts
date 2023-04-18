import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CARDS } from '../mock-cards';
import { BRANDS } from '../mock-brands';
import { filter } from 'rxjs';
import { AuthService } from '../auth.service';
import { MatFormField } from '@angular/material/form-field';
import { Card } from '../card';
import { MatDialog } from '@angular/material/dialog';
import { DialogoptionComponent } from '../dialogoption/dialogoption.component';

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

  columnsToDisplay: string[] = ['username', 'amount', 'expirationDate', 'action'];
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
    private AuthService: AuthService,
    private dialogRef: MatDialog
  ) {  }

  ngOnInit() {
    this.state = window.history.state.brandName;

    this.brands.forEach(brand => {
      if (brand.name == this.state) {
         this.chosenBrand = brand;
      }
    });

    this.AuthService.brandCards({CompanyName: this.chosenBrand.name.replace(/\s+/g, '')}).subscribe(
      (res) => {
        this.dataSource = res;
        console.log(this.dataSource);

      },
      (err) => alert('Error getting card for brand: ' + this.chosenBrand.name)
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
 
  openDialog(cardID: number){

    this.dialogRef.open(DialogoptionComponent, {width: '400px',height:'450px', 
   
    data: {
      cardID: cardID
    }
   });
  }

}
