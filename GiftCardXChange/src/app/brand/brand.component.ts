import { Component } from '@angular/core';
import { Brand } from '../brand';
import { BRANDS } from '../mock-brands'
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { any } from 'cypress/types/bluebird';
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent {

  public state = '';
  brands = BRANDS;
  selectedBrand?: Brand;

  constructor(
    private AuthService: AuthService, 
    private http: HttpClient
  ) { }

  ngOnInit() {
  
    this.state = window.history.state.brandName;

    this.brands.forEach(brand => {
      brand.cypressName = brand.name.replace(/\s/g, "");
      this.AuthService.brandCards({ CompanyName: brand.name.replace(/\s+/g, '') }).subscribe(
        (res) => {
          brand.quantity = res.length;
        },
        (err) => alert('Error getting cards for brand: ' + brand.name)
      )
    });

  }
  

}
