import { Injectable } from '@angular/core';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { roaches } from './mock-roaches';
import { ResponseOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MockApiService {

  constructor(private mockBackend: MockBackend) { }

  listen() {
    const connections = this.mockBackend.connections.share();
    const roachesWithoutIds = connections
      .filter(connection => connection.request.url.match(/\/roaches$/));
    const roachesWithIds = connections
      .filter(connection => connection.request.url.match(/\/roaches\/[\w-]+/));

    roachesWithoutIds // get
      .filter(connection => connection.request.method === 0)
      .subscribe(connection => this.getAllRoaches(connection));

    roachesWithoutIds // post
      .filter(connection => connection.request.method === 1)
      .subscribe(connection => this.createRoach(connection));

    roachesWithIds // patch
      .filter(connection => connection.request.method === 6)
      .subscribe(connection => this.updateRoach(connection));

    roachesWithIds // delete
      .filter(connection => connection.request.method === 3)
      .subscribe(connection => this.deleteRoach(connection));
  }

  getAllRoaches(connection): void {
    const responseOptions = new ResponseOptions({
      body: JSON.stringify(roaches)
    });

    connection.mockRespond(new Response(responseOptions));
  }

  createRoach(connection) {
    const roach = connection.request._body;
    roach.id = '949887ee-cac8-4178-95eb-9e7efd959d37';
    roaches.push(roach);

    connection.mockRespond();
  }

  updateRoach(connection) {
    const idToUpdate = this.findIdInUrl(connection.request.url);

    const indexToChange = roaches.findIndex(oldRoach => oldRoach.id === idToUpdate);
    if (indexToChange !== -1) {
      Object.assign(roaches[indexToChange], connection.request._body);
    }

    connection.mockRespond();
  }

  deleteRoach(connection): void {
    const idToDelete = this.findIdInUrl(connection.request.url);

    const indexToDelete = roaches.findIndex(oldRoach => oldRoach.id === idToDelete);
    if (indexToDelete !== -1) {
      roaches.splice(indexToDelete, 1);
    }

    connection.mockRespond();
  }

  findIdInUrl(url): string {
    return url.match(/^\/roaches\/([\w-]+)/)[1];
  }
}
