import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { Login } from "../models/login.model";
import { User } from "../models/user.model";
import { map } from 'rxjs/operators';
import { ProfileI } from "../models/profile.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    hasUser$ = new BehaviorSubject<boolean>(false);
    isAdmin$ = new BehaviorSubject<boolean>(false);
    isApplicant$ = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {

    }

    login$(data: Login): Observable<User> {
      return this.http.get<User>(`${environment.apiUrl}/users?username=${data.username}&password=${data.password}&singular=1`);
    }

    getUserByUsername$(username: string): Observable<User> {
      return this.http.get<User>(`${environment.apiUrl}/users?username=${username}&singular=1`);
    }

    putUser$(user: ProfileI): Observable<User> {
      return this.http.put<User>(`${environment.apiUrl}/users/${user.id}`, user);
    }

    deleteUser$(userId: number): Observable<boolean> {
      return this.http.delete<boolean>(`${environment.apiUrl}/users/${userId}`);
    }

    logout(): void {
        localStorage.removeItem('loggedUser');
        this.setHasUser(undefined);
      }

      setLoggedUserInLocalStorage(user: User): void {
        delete user.password;
    
        localStorage.setItem('loggedUser', JSON.stringify(user));
    
        this.setHasUser(user);
      }

      getLoggedUserFromLocalStorage(): User|null {
        const loggedUser = localStorage.getItem('loggedUser');
    
        if (loggedUser) {
          this.setHasUser(JSON.parse(loggedUser));
        } else {
            this.setHasUser(undefined);
            return null;
        }
    
        return JSON.parse(loggedUser);
      }

      getHasUser$(): Observable<boolean> {
        return this.hasUser$.asObservable();
      }
    
      setHasUser(user?: User): void {
        this.hasUser$.next(user !== undefined);
        this.setRoles(user);
      }

      getIsAdmin$(): Observable<boolean> {
        return this.isAdmin$.asObservable();
      }

      getIsApplicant$(): Observable<boolean> {
        return this.isApplicant$.asObservable();
      }

      setRoles(user?: User): void {
        this.isAdmin$.next(user?.role === 'admin');
        this.isApplicant$.next(user?.role === 'user');
      }

    hasPermissions(role: string): boolean {
        const loggedUser = this.getLoggedUserFromLocalStorage();

        if (!loggedUser) {
            return false;
        }
    
        return loggedUser.role === role;
      }
}