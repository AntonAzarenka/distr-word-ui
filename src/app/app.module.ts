import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {UiModule} from './ui/ui.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {httpInterceptorProviders} from "./auth/auth-interceptor";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WordsTableComponent } from './ui/words-setting/words-table/words-table.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UiModule,
    NgbModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [httpInterceptorProviders,WordsTableComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
