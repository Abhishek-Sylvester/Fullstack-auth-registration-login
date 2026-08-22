import { Component } from '@angular/core';
import { RouterLink,RouterLinkActive,Router} from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink,RouterLinkActive ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  constructor(private authService:Auth, private router:Router){}

  logout(){
    console.log("Logout function called")
    const refreshToken = localStorage.getItem('refreshToken');
    console.log("refreshToken: "+refreshToken)
    this.authService.logout(refreshToken).subscribe({
      next:(res)=>{
        if(res=="User logged out"){
          console.log("Logging out removing tokens from local storage");
          localStorage.removeItem('refreshToken') //removing refresh token from local storage
          localStorage.removeItem('accessToken') //removing jwt token from local storage
          this.router.navigate(["/login"]);
        }
      },
      error:(err)=>{
        alert(err)
      }
    })
  }
}
