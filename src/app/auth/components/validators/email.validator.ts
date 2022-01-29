import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';
import { AuthService } from '../../services/auth.service';

export function emailExistsValidator(authService: AuthService, currentUserId?: number): AsyncValidatorFn {
  return (control: AbstractControl) => { 
     return authService.findExistingUserByEmail$(control.value, currentUserId)
            .pipe(
                map(user => user.length > 0 ? {emailExists: true} : null)
            );
  };
}
