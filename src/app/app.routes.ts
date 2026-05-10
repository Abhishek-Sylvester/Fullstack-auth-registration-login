import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Registration } from './registration/registration';
import { Practice } from './practice/practice';
import { authGuard } from './guards/auth-gaurd-guard';

export const routes: Routes = [
    {path:'', redirectTo:'login',pathMatch: 'full'},
    {path:'login', component:Login},
    {path:'signup', component:Signup},
    {path:'register',component:Registration},
    {path:'practice', component:Practice, canActivate:[authGuard]}

];
