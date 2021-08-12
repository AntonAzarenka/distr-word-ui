import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const TEAM_NAME = 'TeamName';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];

  constructor(private route: Router) {
  }

  // tslint:disable-next-line:typedef
  public signOut() {
    window.sessionStorage.clear();
  }

  public saveTeamName(name: string): void {
    window.sessionStorage.removeItem(TEAM_NAME);
    window.sessionStorage.setItem(TEAM_NAME, name);
  }

  public getTeamName(): string {
    return sessionStorage.getItem(TEAM_NAME);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  // tslint:disable-next-line:typedef
  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }

    return this.roles;
  }

  public isLogged(): boolean {
    const isLog = this.getUsername() == null;
    if (this.getUsername() == null) {
      this.route.navigateByUrl('/');
    }
    return !isLog;
  }
}
