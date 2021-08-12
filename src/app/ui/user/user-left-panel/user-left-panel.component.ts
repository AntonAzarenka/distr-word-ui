import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-user-left-panel',
  templateUrl: './user-left-panel.component.html',
  styleUrls: ['./user-left-panel.component.css']
})
export class UserLeftPanelComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService) { }

  isLoggedIn = false;

  ngOnInit(): void {
    this.tokenStorage.isLogged();
  }

}
