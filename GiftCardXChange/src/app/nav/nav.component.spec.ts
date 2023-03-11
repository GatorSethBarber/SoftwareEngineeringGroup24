import { ComponentFixture, TestBed } from '@angular/core/testing';
import {Location} from "@angular/common";
import {fakeAsync, tick} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {Router, RouterLink} from "@angular/router";
import { NavComponent } from './nav.component';
import { BrandComponent } from '../brand/brand.component';
import { LoginComponent } from '../login/login.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let router:Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavComponent, BrandComponent,LoginComponent ],
      imports:[FormsModule,
      RouterTestingModule.withRoutes([]), RouterLink],
    })
    .compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    router.initialNavigation();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  // it('should have a div element with a navbar-brand', () =>{
  //   const element = fixture.debugElement.query(By.css('div.container'));
  //   expect(element).toBeTruthy();
  // });

  it('should display GiftCardXChange on the navbar-brand', ()=>{
    const element = fixture.debugElement.query(By.css('.navbar-brand'));
    expect(element.nativeElement.innerText).toEqual('GiftCardXChange');
  })

  it('navigate to "brand" takes you to /brand', ()=> {
    router.navigate(['brand']).then(() => {
      expect(location.path()).toBe('/brand');
    });
  });

  it('navigate to "brand" takes you to /brand', ()=> {
    router.navigate(['login']).then(() => {
      expect(location.path()).toBe('/login');
    });
  });
  

  


});
