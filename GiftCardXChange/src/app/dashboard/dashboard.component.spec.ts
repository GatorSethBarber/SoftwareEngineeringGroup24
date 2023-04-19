import { DashboardComponent } from './dashboard.component'
import { MatTabGroup } from '@angular/material/tabs'
import { MatFormField } from '@angular/material/form-field'
import { MatLabel } from '@angular/material/form-field'
import { By } from '@angular/platform-browser'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { RouterModule } from '@angular/router'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: { } }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule , MatDialogModule],
      declarations: [DashboardComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        { provide: MAT_DIALOG_DATA, useValue: {} }, ],
      
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  
  })


  it('should create ', () => {
    expect(component).toBeTruthy();
  })

  it('should have mat-tab-group element', () =>{
    const element = fixture.debugElement.query(By.css('mat-tab-group'));
    expect(element).toBeTruthy();
  });

  it('should have mat-form-field element', () =>{
    const element = fixture.debugElement.query(By.css('mat-form-field'));
    expect(element).toBeTruthy();
  });

  it('Add card form is invalid when it empty', ()=>{
    component.cardForm.controls['company'].setValue('');
    component.cardForm.controls['cardnumber'].setValue('');
    component.cardForm.controls['amount'].setValue('');
    component.cardForm.controls['expirationDate'].setValue('');
    expect(component.cardForm.valid).toBeFalsy();
  });

 
  it('Add card form is valid when it empty', ()=>{
    component.cardForm.controls['company'].setValue('Starbucks');
    component.cardForm.controls['cardnumber'].setValue('1133456780');
    component.cardForm.controls['amount'].setValue('80.0');
    component.cardForm.controls['expirationDate'].setValue('2023-09');
    expect(component.cardForm.valid).toBeFalsy();
  });

 
  
})