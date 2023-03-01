import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrandComponent } from './brand.component';
import { AuthService } from '../auth.service';
import { By } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http';
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
});
