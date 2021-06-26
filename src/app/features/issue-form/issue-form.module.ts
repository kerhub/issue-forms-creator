import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssueFormRoutingModule } from './issue-form-routing.module';
import { IssueFormComponent } from './issue-form.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [IssueFormComponent],
  imports: [CommonModule, IssueFormRoutingModule, MatToolbarModule, MatButtonModule, MatIconModule],
})
export class IssueFormModule {}
