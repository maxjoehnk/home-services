import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdCardModule, MdButtonModule, MdSelectModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { WeatherCardComponent } from './cards/weather-card/weather-card.component';
import { GoogleCastCardComponent } from './cards/google-cast-card/google-cast-card.component';
import { CelsiusPipe } from './pipes';
import { PhilipsHueCardComponent } from './cards/philips-hue-card/philips-hue-card.component';
import { YamahaAvrCardComponent } from './cards/yamaha-avr-card/yamaha-avr-card.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherCardComponent,
    GoogleCastCardComponent,
    PhilipsHueCardComponent,
    CelsiusPipe,
    YamahaAvrCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MdCardModule,
    MdButtonModule,
    MdSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
