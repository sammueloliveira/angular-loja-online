import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard'; 
import { SellerService } from './services/seller.service'; 
import { BehaviorSubject } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let sellerService: jasmine.SpyObj<SellerService>;

  beforeEach(() => {
    const sellerServiceSpy = jasmine.createSpyObj('SellerService', ['isSellerLoggedIn']);
    
   
    const isSellerLoggedInSubject = new BehaviorSubject<boolean>(false);
    sellerServiceSpy.isSellerLoggedIn = isSellerLoggedInSubject;

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: SellerService, useValue: sellerServiceSpy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    sellerService = TestBed.inject(SellerService) as jasmine.SpyObj<SellerService>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if seller is logged in', () => {
    sellerService.isSellerLoggedIn.next(true); 

    const canActivate = guard.canActivate({} as any, {} as any); 
    expect(canActivate).toBe(true);
  });

  it('should not allow activation if seller is not logged in', () => {
    sellerService.isSellerLoggedIn.next(false);

    const canActivate = guard.canActivate({} as any, {} as any);
    expect(canActivate).toBe(false);
  });
});
