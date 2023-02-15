import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Brand } from '../brand';
import { BRANDS } from '../mock-brands'

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent {

  public state = '';

  constructor() { }

  ngOnInit() {
    this.state = window.history.state.brandName;
  }
  
  brands = BRANDS;
  selectedBrand?: Brand;

  onSelect(brand: Brand): void {
    this.selectedBrand = brand;
  }

}
