import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ContributeService {

  private url = environment.URI + '/api/money/';
  private saveUrl = environment.URI + '/api/money/contributors/'

  constructor(private http: HttpClient) {
  }

  getContribute() {
      return this.http.get(this.url + 'contributors');
  }

  savePayed(money: string, id: string) : Observable<any> {
    return this.http.post(this.saveUrl + id + '/save/'+ money, httpOptions);
  }
}
