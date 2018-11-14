import { Component, OnDestroy, OnInit } from '@angular/core';
import { VatService } from './vat.service';
import { Subscription } from 'rxjs';
import { VatDetails } from './vat.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private _subscriptions: Subscription;

  title = 'verifyvat';
  searchButtonDisabled: boolean = true;
  searchValue: string = '';
  searchResult: VatDetails;
  errorMessage: string = '';
  errorTitle: string = '';

  constructor(
    private vatService: VatService
  ) {
    this._subscriptions = new Subscription();
  }

  ngOnInit() { }

  searchVat() {
    if (this.searchValue) {
      this._subscriptions.add(
        this.vatService.searchVat(this.searchValue).subscribe((result) => {
          this.searchResult = result;
          this.errorMessage = '';
        }, (e: HttpErrorResponse) => {
          this.searchResult = undefined;
          this.errorTitle = e.statusText;
          this.errorMessage = e.error.error;
        })
      );
    }
  }

  ngOnDestroy() {
    this._subscriptions && this._subscriptions.unsubscribe();
  }
}
