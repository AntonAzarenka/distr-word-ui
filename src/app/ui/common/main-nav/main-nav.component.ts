import { Component, OnInit } from '@angular/core';
import {WordService} from '../../../service/word.service';
import {AuthLoginInfo} from '../../../auth/login-info';
import {AuthService} from '../../../auth/auth.service';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {Router} from '@angular/router';
import { ChooseWordsComponent } from '../../choose-words/choose-words.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
  providers: [ChooseWordsComponent]
})
export class MainNavComponent implements OnInit {

  constructor(private wordService: WordService,
              private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private chooseWords: ChooseWordsComponent) { }

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  ngOnInit(): void {
    this.isLoggedIn = this.tokenStorage.isLogged();
  }

  onSubmit(): void {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.chooseWords.checkLogged();
        this.isLoginFailed = false;
        this.isLoggedIn = this.tokenStorage.isLogged();
        this.roles = this.tokenStorage.getAuthorities();
       this.reloadPage();
      },
      error => {
        console.log(error);
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
