import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueFormComponent } from './issue-form.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IssueCreatorModule } from '../issue-creator/issue-creator.component';
import { IssuePreviewModule } from '../issue-preview/issue-preview.component';

@NgModule({
  declarations: [IssueFormComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    IssueCreatorModule,
    IssuePreviewModule,
  ],
})
export class IssueFormModule {}
