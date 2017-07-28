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

  loadRoaches() {
    return this.backendService
      .getRoaches()
      .map(response => response.json())
      .subscribe(json => {
        this.roaches.next(json);
      });
  }

  updateRoach(roachId, roach) {
    this.backendService
      .updateRoach(roachId, roach)
      .subscribe(() => this.loadRoaches());
  }

  deleteRoach(roachId) {
    this.backendService
      .deleteRoach(roachId)
      .subscribe(() => this.loadRoaches());
  }

  createRoach(roach) {
    this.backendService
      .createRoach(roach)
      .subscribe(() => this.loadRoaches())
  }

  getRoach(id) {
    return this.roaches
      .mergeAll()
      .filter(r => r.id === id);
  }
}
