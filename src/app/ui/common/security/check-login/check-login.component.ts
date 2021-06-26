import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-check-login',
  templateUrl: './check-login.component.html',
  styleUrls: ['./check-login.component.css']
})
export class CheckLoginComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService,
              private route: Router) { }

  private _isLogged;

  ngOnInit(): void {
    this._isLogged = this.tokenStorage.isLogged();
  }

  isLogged(): boolean {
    return this._isLogged;
  } 
}
