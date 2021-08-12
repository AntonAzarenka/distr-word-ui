import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

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
