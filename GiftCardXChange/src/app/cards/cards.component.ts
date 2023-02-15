import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { CARDS } from '../mock-cards';
import { BRANDS } from '../mock-brands';

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

}
