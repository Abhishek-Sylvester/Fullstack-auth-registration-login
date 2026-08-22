import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('accessToken');
  if(token == null){
    router.navigate(["/login"]);
    return false;
  }else{
    return true;
  }
  
};
