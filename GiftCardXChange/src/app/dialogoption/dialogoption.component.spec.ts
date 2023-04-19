import { DialogoptionComponent } from './dialogoption.component'
import { ReactiveFormsModule } from '@angular/forms'
import { ComponentFixture, TestBed } from '@angular/core/testing';;
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
describe('DialogoptionComponen', () => {
  let component: DialogoptionComponent;
  let fixture: ComponentFixture<DialogoptionComponent>;
  let dialogRef: MatDialogRef<DialogoptionComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
      ReactiveFormsModule, FormsModule,  RouterTestingModule, MatDialogModule],
      declarations: [ DialogoptionComponent ],
      providers:[AuthService, { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoptionComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('cardRequest form is invalid when it empty', ()=>{
    component.cardRequestFrom.controls['company'].setValue('');
    component.cardRequestFrom.controls['cardnumber'].setValue('');
    component.cardRequestFrom.controls['amount'].setValue('');
    expect(component.cardRequestFrom.valid).toBeFalsy();
  });

  it('cardRequest form is valid when it not empty', ()=>{
    component.cardRequestFrom.controls['company'].setValue('Starbucks');
    component.cardRequestFrom.controls['cardnumber'].setValue('133456789');
    component.cardRequestFrom.controls['amount'].setValue('100.0');
    expect(component.cardRequestFrom.valid).toBeTruthy();
  });



  




})