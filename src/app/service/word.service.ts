import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Word} from '../domain/word';
import {TokenStorageService} from '../auth/token-storage.service';
import {PaymentInformationTo} from '../domain/paymentInformationTo';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  private url = environment.URI + '/api/words';

  constructor(private http: HttpClient, private token: TokenStorageService) {
  }

  getWord(selectedLanguage: string, participantId: string): Observable<any> {
    return this.http.get(this.url + '/' + selectedLanguage + '/' + participantId);
  }

  getPersonalWord(selectedLanguage: string, wordbook: string): Observable<any> {
    return this.http.get(this.url + '/personal/' + selectedLanguage + '/' + wordbook);
  }

  getTranslate(): Observable<any> {
    return this.http.get(this.url + '/translate');
  }

  getMoney(payInfTo: PaymentInformationTo): Observable<any> {
    return this.http.post(environment.URI + '/api/money', payInfTo);
  }

  // tslint:disable-next-line:typedef
  pushFileToStorage(file: File) {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    let req = new HttpRequest('POST', this.url, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    const token = this.token.getToken();
    req = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});

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

  save(word: Word): Observable<any> {
    return this.http.post(this.url, word);
  }
}
