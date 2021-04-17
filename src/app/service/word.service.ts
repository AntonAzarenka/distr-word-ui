import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Word } from '../domain/word';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  private url = environment.URI + '/api/words';

  constructor(private http: HttpClient) {
  }

  getWord(selectedLanguage: string): Observable<any> {
    return this.http.get(this.url + '/' + selectedLanguage);
  }

  getTranslate(): Observable<any>  {
    return this.http.get(this.url + '/translate');
  }

  getMoney(): Observable<any> {
    return this.http.get(this.url + '/money');
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

  public getWords(): Observable<any> {
    return this.http.get(this.url);
  }

  public search(chars: string): Observable<any> {

    let params = new HttpParams();
    params = params.set('chars', chars);
    const httpOptions = {
      params
    };
    return this.http.get(this.url + '/search', httpOptions);
  }

  delete(id: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('uid', id);
    const httpOptions = {
      params
    };
    return this.http.delete(this.url, httpOptions);
  }

  edit(word: Word): Observable<any> {
    return this.http.put(this.url, word);
  }

  save(word: Word) {
    return this.http.post(this.url, word);
  }
}
