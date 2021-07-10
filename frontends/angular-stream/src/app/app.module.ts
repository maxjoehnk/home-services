import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MdCardModule,
    MdButtonModule,
    MdSelectModule,
    MdListModule,
    MdChipsModule,
    MdProgressSpinnerModule,
    MdSnackBarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import reducers from './store';
import { effects } from './store/effects';

import { AppComponent } from './app.component';
import { WeatherCardComponent } from './cards/weather-card/weather-card.component';
import { GoogleCastCardComponent } from './cards/google-cast-card/google-cast-card.component';
import { CelsiusPipe } from './pipes';
import { PhilipsHueCardComponent } from './cards/philips-hue-card/philips-hue-card.component';
import { YamahaAvrCardComponent } from './cards/yamaha-avr-card/yamaha-avr-card.component';
import { CardsComponent } from './cards/cards.component';
import { StreamComponent } from './stream/stream.component';
import { ScenesComponent } from './scenes/scenes.component';
import { ChipsComponent } from './chips/chips.component';
import { PresenceComponent } from './presence/presence.component';
import { LoadingIndicatorComponent } from './stream/loading-indicator/loading-indicator.component';
import { ErrorIndicatorComponent } from './stream/error-indicator/error-indicator.component';
import { EmptyIndicatorComponent } from './stream/empty-indicator/empty-indicator.component';
import { ViewComponent } from './stream/view/view.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherCardComponent,
    GoogleCastCardComponent,
    PhilipsHueCardComponent,
    CelsiusPipe,
    YamahaAvrCardComponent,
    CardsComponent,
    StreamComponent,
    ScenesComponent,
    ChipsComponent,
    PresenceComponent,
    LoadingIndicatorComponent,
    ErrorIndicatorComponent,
    EmptyIndicatorComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    MdCardModule,
    MdButtonModule,
    MdSelectModule,
    MdListModule,
    MdChipsModule,
    MdProgressSpinnerModule,
    MdSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
