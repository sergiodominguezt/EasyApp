import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  ngOnInit(): void {
      
  }

  passwordType: boolean = false;
  confirmPasswordType: boolean = false;

  validationForm: FormGroup;

  constructor(private router: Router, private service: RegisterService) {
    this.validationForm = new FormGroup({
      fullName: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      email: new FormControl(null, { validators: [Validators.required, Validators.email], updateOn: 'submit' }),
      password: new FormControl(null, { validators: [Validators.required, this.passwordMatchValidator], updateOn: 'submit' }),
      confirmPassword: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
    }, { validators: this.passwordMatchValidator });
  }

  get fullName(): AbstractControl {
    return this.validationForm.get('fullName')!;
  }

  get email(): AbstractControl {
    return this.validationForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.validationForm.get('password')!;
  }

  get confirmPassword(): AbstractControl {
    return this.validationForm.get('confirmPassword')!;
  }

  showPassword(id: String){
    if(id === 'confirmPassword'){
       this.confirmPasswordType = !this.confirmPasswordType;
    }else if(id === 'password'){
      this.passwordType = !this.passwordType;
   }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true};

    }
    return null;
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  onSubmit(): void {
    this.validationForm.markAllAsTouched();

    if(this.validationForm.valid){
      const registerData = {
        name: this.validationForm.get('fullName')?.value,
        email: this.validationForm.get('email')?.value,
        password: this.validationForm.get('password')?.value
      }

      this.service.createRegister(registerData).subscribe(
        (res) => {
          console.log(res);
        }
      );

      this.router.navigate(['/login']);


  
    }
  }
}
