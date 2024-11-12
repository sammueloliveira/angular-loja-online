import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../../services/seller.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Login, SignUp } from '../../../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'], 
})
export class SellerAuthComponent implements OnInit {
  showLogin = false;
  authError: string = '';
  successMessage: string = ''; 

  constructor(private seller: SellerService) {}

  ngOnInit(): void {
    this.seller.reloadSeller();

    this.seller.isLoginerror.subscribe((isError) => {
      if (isError) {
        this.authError = 'EMAIL OU SENHA NÃO CORRESPONDE';
      } else {
        this.authError = ''; 
      }
    });
  }

  signUp(data: SignUp): void {
    if (data) {
      this.seller.userSignUp(data); 
  
    
      this.successMessage = 'Cadastro bem-sucedido! Por favor, faça login.';
      this.showLogin = true;
    } else {
      
      this.successMessage = 'Por favor, preencha todos os campos.';
      this.showLogin = false;
    }
  }
  
  

  login(data: Login): void { 
    this.seller.userLogin(data);
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
    this.successMessage = ''; 
  }
}
