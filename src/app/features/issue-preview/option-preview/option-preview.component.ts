import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { RepositoryService } from '../../../services/repository.service';
import { Observable } from 'rxjs';
import { GithubLabel } from '../../../models/github/github-label';

@Component({
  selector: 'app-option-preview',
  templateUrl: './option-preview.component.html',
  styleUrls: ['./option-preview.component.scss'],
})
export class OptionPreviewComponent {
  labels$: Observable<GithubLabel[] | null> = this.repositoryService.labels$;

  @Input()
  label: string = '';

  @Input()
  isLabelsList: boolean = false;

  @Input()
  optionList: string[] = [];

  constructor(private readonly repositoryService: RepositoryService) {}
}

@NgModule({
  declarations: [OptionPreviewComponent],
  imports: [CommonModule, MatChipsModule],
  exports: [OptionPreviewComponent],
})
export class OptionPreviewModule {}
