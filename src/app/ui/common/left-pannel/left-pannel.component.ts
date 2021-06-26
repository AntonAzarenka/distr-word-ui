import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-left-pannel',
  templateUrl: './left-pannel.component.html',
  styleUrls: ['./left-pannel.component.css']
})
export class LeftPannelComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService) { }

  isLoggedIn = false;

  ngOnInit(): void {
    this.isLoggedIn = this.tokenStorage.isLogged();
  }

}
