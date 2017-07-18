import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http } from '@angular/http';
import { StoreService } from './shared/store.service';

import { AppComponent } from './app.component';

import { MockApiService } from './shared/mock-api.service';
import { BackendService } from './shared/backend.service';

function mockBackEndFactory(backend: MockBackend, options: BaseRequestOptions) {
  return new Http(backend, options);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    MockApiService,
    MockBackend,
    BackendService,
    StoreService,
    BaseRequestOptions,
    {
      provide: Http,
      deps: [MockBackend, BaseRequestOptions],
      useFactory: mockBackEndFactory
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
