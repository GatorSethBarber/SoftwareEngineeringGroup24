import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrandComponent } from './brand.component';
import { AuthService } from '../auth.service';
import { By } from '@angular/platform-browser'
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BrandComponent', () => {
  let component: BrandComponent;
  let fixture: ComponentFixture<BrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      declarations: [ BrandComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    window.history.pushState({brandName: 'test'}, '', '');

    fixture = TestBed.createComponent(BrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should contain right number of brands', () => {
    const { debugElement } = fixture;
    const cards = debugElement.queryAll(By.css('[data-testid="card"]'));
    expect(cards.length).toBe(4);
  });

  it('Button click if it disabled', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("button"));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('Button click work', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("button"));
    expect(button.nativeElement).toBeTruthy();
  });

  it('should have a div element with class container', () =>{
    const element = fixture.debugElement.query(By.css('div.container'));
    expect(element).toBeTruthy();
  });

  it('should have a div element with class card body', ()=>{
    const element = fixture.debugElement.query(By.css('div.card-body'));
    expect(element).toBeTruthy();
  });

  it('should have a h5 element inside with class card-body', ()=>{
    const element = fixture.debugElement.query(By.css('.card-body > h5.card-title'));
    expect(element).toBeTruthy();
  });




  

});