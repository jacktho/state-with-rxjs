import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BackendService {

  constructor(private http: Http) {
  }

  getRoaches(): Observable<any> {
    return this.http.get('/roaches');
  }
}
