import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ActiveEmailComponent } from './screen/login/active-email/active-email.component';
import { JwtInterceptor } from './until/jwt.interceptor';
import { ErrorInterceptor } from './until/error.interceptor';

@NgModule({
  declarations: [AppComponent, ActiveEmailComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
