import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AuiLocationPickerComponent } from './components/aui-location-picker/aui-location-picker.component';


@NgModule({
  declarations: [
    AppComponent,
    AuiLocationPickerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
