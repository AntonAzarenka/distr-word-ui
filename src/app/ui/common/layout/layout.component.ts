import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService) { }

  isTeam = true;
  isLoggedIn: boolean;

  ngOnInit(): void {
    this.isLoggedIn = this.tokenStorage.isLogged();
    if (this.isLoggedIn) {
      const roles = this.tokenStorage.getAuthorities();
      if (roles.length > 0) {
        if (roles.includes('ROLE_TEAM', 0)) {
          this.isTeam = false;
        }
      }
    }
  }

}
