import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthLoginInfo} from './login-info';
import {Observable} from 'rxjs';
import {JwtResponse} from './jwt.response';
import {SignUpInfo} from './sign-up.info';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = environment.URI + '/api/auth/signin';
  private signupUrl = environment.URI + '/api/auth/signup';
  private getTeamsUrl = environment.URI + '/api/auth/user/team';
  private getPArtisipantsUrl = environment.URI + '/api/auth/';

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  public getTeams() {
    return this.http.get(this.getTeamsUrl);
  }

  // tslint:disable-next-line:typedef
  public getParticipantsOfTeam(teamName: string) {
    return this.http.get(this.getPArtisipantsUrl + teamName);
  }
}
