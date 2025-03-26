import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { SortResultsPipe } from './youtube/pipes/sort-results.pipe';
import { StoreModule } from '@ngrx/store';
import { cardReducer } from './store/card/custom-card.reducer';
import { paginationReducer } from './store/pagination/pagination.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CustomCardEffect } from './store/card/custom-card.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    RouterOutlet,
    CommonModule,
    AuthModule,
    SortResultsPipe,
    StoreModule.forRoot({
      cards: cardReducer,
      pagination: paginationReducer,
    }),
    EffectsModule.forRoot([CustomCardEffect]),
  ],

  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
