import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./components/login/login.component";
import { HttpClientModule } from "@angular/common/http"
import { CommonModule } from "@angular/common";
import { AuthComponent } from "./components/auth/auth.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        AuthRoutingModule
    ],
    declarations: [
        LoginComponent,
        AuthComponent,
        ProfileComponent
    ]
})
export class AuthModule {

}