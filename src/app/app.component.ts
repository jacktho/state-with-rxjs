import { Component, OnInit } from '@angular/core';
import { MockApiService } from './shared/mock-api.service';
import { StoreService } from './shared/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectedRoachId: string;

  constructor(private mockApiService: MockApiService, public storeService: StoreService) {}

  ngOnInit() {
    this.mockApiService.listen();
    this.storeService.loadRoaches();
  }

  selectRoach(id: string): void {
    this.selectedRoachId = id;
  }
}
