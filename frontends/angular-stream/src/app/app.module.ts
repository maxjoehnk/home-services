import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdCardModule } from '@angular/material';

import { AppComponent } from './app.component';
import { WeatherCardComponent } from './cards/weather-card/weather-card.component';
import { GoogleCastCardComponent } from './cards/google-cast-card/google-cast-card.component';
import { CelsiusPipe } from './pipes';

@NgModule({
  declarations: [
    AppComponent,
    WeatherCardComponent,
    GoogleCastCardComponent,
    CelsiusPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
