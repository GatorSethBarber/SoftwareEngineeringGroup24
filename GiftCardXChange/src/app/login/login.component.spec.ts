import { ComponentFixture, TestBed } from '@angular/core/testing';;
import { LoginComponent } from './login.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
      ReactiveFormsModule, FormsModule,  RouterTestingModule],
      declarations: [ LoginComponent ],
      providers:[AuthService],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
});
  it('Login form is invalid when it empty', ()=>{
    component.loginForm.controls['userName'].setValue('');
    component.loginForm.controls['passWord'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });
  it('Login form is valid when it not empty', ()=>{
    component.loginForm.controls['userName'].setValue('SethTheBarber');
    component.loginForm.controls['passWord'].setValue('password');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('check if usename is validity', ()=>{
    let username = component.loginForm.controls.userName;
    expect(username.valid).toBeFalsy();

    username.setValue('');
    expect(username.hasError('required')).toBeTruthy();
  });

  it('check if password is validity', ()=>{
    let pwd = component.loginForm.controls.userName;
    expect(pwd.valid).toBeFalsy();

    pwd.setValue('');
    expect(pwd.hasError('required')).toBeTruthy();
  });

  it('Check if the login method is called from AuthService', () => {
    let loginElement: DebugElement;
    let debugElement = fixture.debugElement;
    let authService = debugElement.injector.get(AuthService);
    let loginSpy = spyOn(authService , 'login').and.callThrough();
    loginElement = fixture.debugElement.query(By.css('form'));
   // to set values
  component.loginForm.controls['userName'].setValue('SethTheBarber');
  component.loginForm.controls['passWord'].setValue('password');
  loginElement.triggerEventHandler('ngSubmit', null);
  expect(loginSpy).toHaveBeenCalled();
  });

  it('call submit method', ()=>{
    let loginSpy = spyOn(component, 'onSubmit');
    let el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(loginSpy).toHaveBeenCalledTimes(1);
  });



});
