import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileI } from '../../models/profile.model';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { emailExistsValidator } from '../validators/email.validator';
import { userExistsValidator } from '../validators/username.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.formGroup = this.initFormGroup();
  }

  ngOnInit(): void {
    let loggedUser = this.authService.getLoggedUserFromLocalStorage();
    if (loggedUser) {
      this.authService.getUserByUsername$(loggedUser.username).subscribe({
        next: (response: User) => {
          this.formGroup = this.initFormGroup(response.id, response.username, response.email, response.password);
        }
      });
    }
  }

  onSubmit(): void {
    const body = this.formGroup.value as ProfileI;

    this.authService.putUser$(body).subscribe({
      next: (user) => {
        if (user) {
          this.authService.setLoggedUserInLocalStorage(user);

          this.router.navigate(['/main']);
        }
      }
    });
  }

  initFormGroup(id?: number, username?: string, email?: string, password?: string): FormGroup {
    return this.fb.group({
      id: id,
      username: [username, {
        validators: [Validators.required],
        asyncValidators: [userExistsValidator(this.authService, id)],
        updateOn: 'blur'
      }],
      email: [email, {
        validators: [Validators.required],
        asyncValidators: [emailExistsValidator(this.authService, id)],
        updateOn: 'blur'
      }],
      password: [password, [Validators.required]]
    });
  }

  onDeactivate(): void {
    let currentUser = this.authService.getLoggedUserFromLocalStorage();

    if (currentUser) {
      this.authService.deleteUser$(currentUser?.id).subscribe({
        next: (response) => {
          this.authService.logout();
          if (response) {
            this.router.navigate(['/main']);
          } 
          // else show toastr error message
        }
      })
    }
  }
}
