import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLink } from '@angular/router';
import { NavComponent } from './nav.component';
import { BrandComponent } from '../brand/brand.component';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavComponent, BrandComponent, LoginComponent],
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([]),
        RouterLink,
        HttpClientTestingModule,
        AppRoutingModule,
      ],
    }).compileComponents();

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

  it('should display GiftCardXChange on the navbar-brand', () => {
    const element = fixture.debugElement.query(By.css('.navbar-brand'));
    expect(element.nativeElement.innerText).toEqual('GiftCardXChange');
  });

  it('navigate to "brand" takes you to /brand', async () => {
 
    await router.navigate(['/brand']);
    expect(router.url).toContain('brand');
  });

  it('navigate to "login" takes you to /login', async () => {
 
    await router.navigate(['/login']);
    expect(router.url).toContain('login');
  });

  

  
});
