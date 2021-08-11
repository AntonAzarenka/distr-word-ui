import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private storage: TokenStorageService) { }

  isTeam: boolean = true;

  ngOnInit(): void {
    const roles = this.storage.getAuthorities();
    if(roles.length > 0) {
      if(roles.includes("ROLE_TEAM", 0)){
        this.isTeam = false;
      }
    }
  }

}
