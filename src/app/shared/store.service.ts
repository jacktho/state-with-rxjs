import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class StoreService {

  roaches = new BehaviorSubject([]);

  constructor(private backendService: BackendService) {
  }

  loadInitialRoaches() {
    this.backendService
      .getRoaches()
      .map(response => response.json())
      .subscribe(json => {
        this.roaches.next(json);
      });
  }
}
