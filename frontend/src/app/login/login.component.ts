import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  ngOnInit(): void {
  }

  loginForm: FormGroup;

  constructor(private router: Router, private service: LoginService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required, Validators.email], updateOn: 'submit' }),
      password: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
    });
  }

  get email(): AbstractControl {
    return this.loginForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.loginForm.get('password')!;
  }

  goToSignUp(): void {
    this.router.navigate(['/register']);
  }


  onSubmit(): void {
    this.loginForm.markAllAsTouched();

    if(this.loginForm.valid){
      const registerData = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      }

      this.service.loginUser(registerData).subscribe(
        (res) => {
          

          if (res.token) {
            this.router.navigate(['/create']);
          } else {
            
            alert('Error, please try again later.');
          }
        },
        (error) => {
          if (error instanceof HttpErrorResponse && error.error?.error === 'Invalid credentials') {
            alert('Invalid credentials');
          } else {
            console.error('An error ocurred', error);
            alert('an error ocurresdsdsdd');
          }
          
        }
      );
  
    }
  }

}
