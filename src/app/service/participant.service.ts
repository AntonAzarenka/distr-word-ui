import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Participant} from '../domain/participant';

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

  delete(id: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('uid', id);
    const httpOptions = {
      params
    };
    return this.http.delete(this.url, httpOptions);
  }

  edit(part: Participant): Observable<any> {
    return this.http.put(this.url, part);
  }

  save(part: Participant): Observable<any> {
    return this.http.post(this.url, part);
  }
}
