import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueFormComponent } from './issue-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IssueCreatorModule } from '../issue-creator/issue-creator.component';
import { IssuePreviewModule } from '../issue-preview/issue-preview.component';
import { TemplateSelectionModule } from '../template-selection/template-selection.component';
import { IssueFormHeaderModule } from './issue-form-header/issue-form-header.component';
import { RepositoryFinderModule } from '../repository-finder/repository-finder.component';

@NgModule({
  declarations: [IssueFormComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    IssueCreatorModule,
    IssuePreviewModule,
    TemplateSelectionModule,
    IssueFormHeaderModule,
    RepositoryFinderModule,
  ],
})
export class IssueFormModule {}
