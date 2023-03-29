import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httoMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [AuthService]
    });
    httoMock = TestBed.get(HttpTestingController);
    service = TestBed.inject(AuthService);
  });

  it('should create AuthService', () => {
    expect(service).toBeTruthy();
  });
});
