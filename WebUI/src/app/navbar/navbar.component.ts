import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private accountService: AccountService, private router: Router) { }

  isLoggedIn(): boolean {
    return this.accountService.isLoggedIn(); 
  }

  logout() {
    this.accountService.logout(); 
    this.router.navigate(['/login']); 
  }
}
