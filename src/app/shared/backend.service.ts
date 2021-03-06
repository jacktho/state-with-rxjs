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

  createRoach(roach): Observable<any> {
    return this.http.post('/roaches', roach);
  }

  updateRoach(roachId, roach): Observable<any> {
    return this.http.patch('/roaches/' + roachId, roach);
  }

  deleteRoach(roachId): Observable<any> {
    return this.http.delete('/roaches/' + roachId);
  }
}
