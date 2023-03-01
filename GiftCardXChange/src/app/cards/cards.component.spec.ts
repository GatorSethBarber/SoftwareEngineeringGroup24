import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsComponent } from './cards.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsComponent ],
      imports: [ RouterTestingModule, HttpClientModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],

    })
    .compileComponents();

    window.history.pushState({brandName: 'Starbucks'}, '', '');

    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
