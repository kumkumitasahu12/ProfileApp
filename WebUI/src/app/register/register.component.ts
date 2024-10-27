import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,  
    private accountService: AccountService, private router: Router) {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.valid) {
      this.accountService.register(this.registrationForm.value).subscribe(
        response => {
          console.log('Registration successful', response);
          this.router.navigate(['']);
        },
        error => {
          // Handle error
          console.error('Registration failed', error);
        }
      );
    }
  }
}
