import { Component } from '@angular/core';
import { Brand } from '../brand';
import { BRANDS } from '../mock-brands'

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent {

  public state = '';
  brands = BRANDS;
  selectedBrand?: Brand;

  ngOnInit() {
    this.state = window.history.state.brandName;
  }

}
