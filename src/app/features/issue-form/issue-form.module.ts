import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssueFormRoutingModule } from './issue-form-routing.module';
import { IssueFormComponent } from './issue-form.component';

@NgModule({
  declarations: [IssueFormComponent],
  imports: [CommonModule, IssueFormRoutingModule],
})
export class IssueFormModule {}
