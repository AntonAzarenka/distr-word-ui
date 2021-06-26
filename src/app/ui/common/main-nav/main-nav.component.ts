import { Component, OnInit } from '@angular/core';
import {WordService} from '../../../service/word.service';
import {AuthLoginInfo} from '../../../auth/login-info';
import {AuthService} from '../../../auth/auth.service';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {Router, RouterLink} from '@angular/router';
import { ChooseWordsComponent } from '../../choose-words/choose-words.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
  providers: [ChooseWordsComponent]
})
export class MainNavComponent implements OnInit {

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private chooseWords: ChooseWordsComponent,
              public snackBar: MatSnackBar,
             ) { }

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  teamname: string;

  ngOnInit(): void {
    this.isLoggedIn = this.tokenStorage.isLogged();
    this.teamname = this.tokenStorage.getTeamName();
  }

  onSubmit(): void {

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password
      );

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.tokenStorage.saveTeamName(data.teamname);
        this.chooseWords.checkLogged();
        this.isLoginFailed = false;
        this.isLoggedIn = this.tokenStorage.isLogged();
        this.roles = this.tokenStorage.getAuthorities();
        this.reloadPage();
      },
      error => {
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
    this.chooseWords.checkLogged();
  }

  reloadPage(): void {
    window.location.reload();
  }

  logout(): void {
    this.tokenStorage.signOut();
    this.isLoggedIn = false;
    this.reloadPage();
  }
}
