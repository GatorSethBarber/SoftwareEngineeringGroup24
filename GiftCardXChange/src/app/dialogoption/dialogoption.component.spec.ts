import { DialogoptionComponent } from './dialogoption.component'
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms'
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
import { FormBuilder } from '@angular/forms';
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

  it('it shout create', () => {
    component.cardRequestForm.setValue({ company: '', cardnumber: '', amount: '' });
    expect(component).toBeTruthy();
  });

  it('cardRequest form is invalid when it empty', () => {
    component.cardRequestForm.setValue({ company: '', cardnumber: '', amount: '' });
    expect(component.cardRequestForm.valid).toBeFalsy();
  });

  it('cardRequest form is valid when it not empty', ()=>{
    component.cardRequestForm.setValue({ company: 'Starbucks', cardnumber: '133456789', amount: '100.0' });
    expect(component.cardRequestForm.valid).toBeTruthy();

  });

  it('call onSubmitted() when the form is submitted', ()=>{
    let closeSpy = spyOn(component, 'onSubmitted');
    let el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it('call onCloseClick when the form is submitted', ()=>{
    let closeSpy = spyOn(component, 'onCloseClick');
    let el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(closeSpy).toHaveBeenCalledTimes(0);
  });


  




})