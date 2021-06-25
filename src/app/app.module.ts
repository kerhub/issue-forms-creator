import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IssueFormDirective } from './directives/issue-form.directive';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, IssueFormDirective],
  imports: [BrowserModule, BrowserAnimationsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
