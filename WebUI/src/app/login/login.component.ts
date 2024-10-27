import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  email: string = '';
  password: string = '';
  constructor(private fb: FormBuilder, private router: Router,
    private accountService: AccountService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit():void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.accountService.login(email, password).subscribe(
        (data) => {
          this.router.navigate(['/profile']);
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
    }
  }
}
