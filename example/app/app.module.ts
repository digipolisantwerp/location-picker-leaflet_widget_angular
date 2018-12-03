import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LocationPickerLeafletModule } from '../../src';


@NgModule({
  imports: [
    BrowserModule,
    LocationPickerLeafletModule,
  ],
  exports: [],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
