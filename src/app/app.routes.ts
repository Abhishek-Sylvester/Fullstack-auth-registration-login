import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Registration } from './registration/registration';
import { Practice } from './practice/practice';
import { authGuard } from './guards/auth-gaurd-guard';
import { Upload } from './upload/upload';
import { QueryPage } from './query-page/query-page';
import { MainLayout } from './layouts/main-layout/main-layout';


export const routes: Routes = [
    {path:'', redirectTo:'login',pathMatch: 'full'},
    {path:'login', component:Login},
    {path:'signup', component:Signup},
    {path:'register',component:Registration},
    

    { path:'app',
      component:MainLayout,
      canActivate:[authGuard],
      children:[
        {path:'practice', component:Practice},
        {path:'upload', component:Upload},
        {path:'query',component:QueryPage}
      ]

    }

];
