import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-oauth-callback',
  imports: [],
  templateUrl: './oauth-callback.html',
  styleUrl: './oauth-callback.css',
})
export class OauthCallback {

  constructor(private router: Router) {}

  private route = inject(ActivatedRoute);
  ngOnInit() {
    
    
    if(this.route.snapshot.queryParams['token'] != null && this.route.snapshot.queryParams['refreshtoken'] != null){
      localStorage.setItem("accessToken",this.route.snapshot.queryParams['token']);
      localStorage.setItem("refreshToken",this.route.snapshot.queryParams['refreshtoken']);
      this.router.navigate(["/app/practice"]);
    }else{
      alert("Error in OAuth2 login");
      this.router.navigate(["/login"]);
    }
  }
}
