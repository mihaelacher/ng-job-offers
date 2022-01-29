import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';
import { AuthService } from '../../services/auth.service';

export function userExistsValidator(authService: AuthService, currentUserId?: number): AsyncValidatorFn {
  return (control: AbstractControl) => { 
     return authService.findExistingUserByUsername$(control.value, currentUserId)
            .pipe(
                map(user => user.length > 0 ? {userExists: true} : null)
            );
  };
}
