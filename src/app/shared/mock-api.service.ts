import { Injectable } from '@angular/core';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ROACHES } from './mock-roaches';
import { ResponseOptions, Response } from '@angular/http';

@Injectable()
export class MockApiService {

  constructor(private mockBackend: MockBackend) {}

  listen() {
    this.mockBackend.connections.subscribe((connection: MockConnection) => {
      const validGet = connection.request.url === '/roaches' && connection.request.method === 0;

      if (!validGet) { return; }

      const responseOptions = new ResponseOptions({
        body: JSON.stringify(ROACHES)
      });
      const response = new Response(responseOptions);

      connection.mockRespond(response);
    });
  }
}
