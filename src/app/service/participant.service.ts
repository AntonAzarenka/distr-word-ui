import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private url = environment.URI + '/api/participant/';

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  public getParticipants() {
    return this.http.get(this.url);
  }
}
