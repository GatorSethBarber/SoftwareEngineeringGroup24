import { Component } from '@angular/core';
import { Brand } from '../brand';
import { BRANDS } from '../mock-brands'

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent {
  // brand: Brand = {
  //   id: 1,
  //   name: 'Starbucks',
  //   quantity: 0,
  //   img: '../assets/images/starbucks.png',
  // };
  brands = BRANDS;
}