import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContributeService {

  private url = environment.URI + '/api/money/';

  constructor(private http: HttpClient) {
  }

  getContribute() {
      return this.http.get(this.url + 'contributors');
  }
}
