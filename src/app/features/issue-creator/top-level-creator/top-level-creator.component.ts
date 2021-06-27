import { Component, Input, NgModule, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { IssueFormGroup } from '../../../forms/issue-form-group';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatExpansionModule } from '@angular/material/expansion';
import { RepositoryService } from '../../../services/repository.service';
import { MatSelectModule } from '@angular/material/select';
import { GithubLabel } from '../../../models/github/github-label';
import { GithubContributor } from '../../../models/github/github-contributor';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-top-level-creator',
  templateUrl: './top-level-creator.component.html',
  styleUrls: ['./top-level-creator.component.scss'],
})
export class TopLevelCreatorComponent implements OnInit, OnDestroy {
  @Input()
  form!: FormGroup;

  labelsControl: FormControl = new FormControl(null);
  assigneesControl: FormControl = new FormControl(null);

  labelsGithubControl: FormControl = new FormControl(null);
  contributorsGithubControl: FormControl = new FormControl(null);

  labels = new Set<string>();
  assignees = new Set<string>();

  labels$ = this.repositoryService.labels$;
  contributors$ = this.repositoryService.contributors$;
  destroy$: Subject<void> = new Subject<void>();
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private readonly repositoryService: RepositoryService) {}

  ngOnInit() {
    this.labelsGithubControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((labels: GithubLabel[]) => {
        this.form.get('labels')?.setValue(labels.map(label => label.name));
      });

    this.contributorsGithubControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((contributors: GithubContributor[]) => {
        this.form.get('contributors')?.setValue(contributors.map(contributor => contributor.login));
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addLabels(): void {
    (this.form as IssueFormGroup).addLabels();
  }

  addAssignees(): void {
    (this.form as IssueFormGroup).addAssignees();
  }

  addLabelFromInput(event: MatChipInputEvent): void {
    if (event.value) {
      this.labels.add(event.value);
      this.form.get('labels')?.setValue(Array.from(this.labels));
      event.chipInput!.clear();
    }
  }

  removeLabel(label: string): void {
    this.labels.delete(label);
  }

  addAssigneeFromInput(event: MatChipInputEvent): void {
    if (event.value) {
      this.assignees.add(event.value);
      this.form.get('assignees')?.setValue(Array.from(this.assignees));
      event.chipInput!.clear();
    }
  }

  removeAssignee(assignee: string): void {
    this.assignees.delete(assignee);
  }
}

@NgModule({
  declarations: [TopLevelCreatorComponent],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatSelectModule,
  ],
  exports: [TopLevelCreatorComponent],
})
export class TopLevelCreatorModule {}
