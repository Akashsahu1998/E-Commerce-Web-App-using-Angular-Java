import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string;

  constructor(private oktaAuthService: OktaAuthService) { }

  ngOnInit(): void {

    // subscribe to authentication state changes
    this.oktaAuthService.$authenticationState.subscribe((result) => {
      this.isAuthenticated = result;
      this.getUserDetails();
    }
    );
  }

  getUserDetails() {
    if (this.isAuthenticated) {

      // Fethced the logged in user details (user's claims)
      // user full name is exposeda as a property name
      this.oktaAuthService.getUser().then((result) => {
        this.userFullName = result.name;
      });
    }
  }

  logout(){
    // Terminates the session with Okta and remove current tokens
    this.oktaAuthService.signOut();
  }

}
