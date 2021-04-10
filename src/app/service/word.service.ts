import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  private url = environment.URI + '/api/words/';

  constructor(private http: HttpClient) {
  }

  getWord(selectedLanguage: string): Observable<any> {
    return this.http.get(this.url + selectedLanguage);
  }

  getTranslate(): Observable<any>  {
    return this.http.get(this.url + '/translate');
  }

  getMoney(): Observable<any> {
    return this.http.get(this.url + 'money');
  }

  // tslint:disable-next-line:typedef
  pushFileToStorage(file: File) {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', this.url, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
}
