import { DashboardComponent } from './dashboard.component'
import { MatTabGroup } from '@angular/material/tabs'
import { MatFormField } from '@angular/material/form-field'
import { MatLabel } from '@angular/material/form-field'
import { By } from '@angular/platform-browser'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core'
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [DashboardComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  
  })


  it('should mount ', () => {
    cy.mount(DashboardComponent)
  })

  it('should have mat-tab-group element', () =>{
    const element = fixture.debugElement.query(By.css('mat-tab-group'));
    expect(element).toBeTruthy();
  });

  
  
})