import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterComponent } from './register.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../auth.service';
import { By } from '@angular/platform-browser';
fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ RegisterComponent],
      providers: [AuthService],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Register method', () => {
    let registerElement: DebugElement;
    let debugElement = fixture.debugElement;
    let authService = debugElement.injector.get(AuthService);
    const registerSpy = spyOn(authService , 'register').and.callThrough();
    registerElement = fixture.debugElement.query(By.css('form'));
 // to set values
  component.signUpForm.controls['username'].setValue('SethTheBarber');
  component.signUpForm.controls['firstName'].setValue('Barber');
  component.signUpForm.controls['lastName'].setValue('password');
  component.signUpForm.controls['email'].setValue('not.my.email@stfaux.com');
  component.signUpForm.controls['passWord'].setValue('password');
  registerElement.triggerEventHandler('ngSubmit', null);
  expect(registerSpy).toHaveBeenCalled();
  });

  it('Submit method', ()=>{
    let registerSpy = spyOn(component, 'signUpSubmitted').and.callThrough();
    let el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(registerSpy).toHaveBeenCalled();
  })

});
