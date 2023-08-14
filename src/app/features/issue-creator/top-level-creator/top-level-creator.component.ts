import { Component, Input, NgModule, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { IssueForm } from '../../../forms/issue.form';
import { UntypedFormControl, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatExpansionModule } from '@angular/material/expansion';
import { RepositoryService } from '../../../services/repository.service';
import { MatSelectModule } from '@angular/material/select';
import { GitHubLabel } from '../../../models/github/github-label';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { GitHubContributor } from '../../../models/github/github-contributor';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-top-level-creator',
  templateUrl: './top-level-creator.component.html',
  styleUrls: ['./top-level-creator.component.scss'],
})
export class TopLevelCreatorComponent implements OnInit, OnDestroy {
  @Input()
  form!: UntypedFormGroup;

  labelsControl: UntypedFormControl = new UntypedFormControl(null);
  assigneesControl: UntypedFormControl = new UntypedFormControl(null);

  labelsGithubControl: UntypedFormControl = new UntypedFormControl(null);
  contributorsGithubControl: UntypedFormControl = new UntypedFormControl(null);

  labels = new Set<string>();
  assignees = new Set<string>();

  labels$ = this.repositoryService.labels$;
  contributors$ = this.repositoryService.contributors$;
  filteredContributors$: Observable<GitHubContributor[] | undefined> = combineLatest([
    this.contributorsGithubControl.valueChanges,
    this.contributors$,
  ]).pipe(
    map(([input, contributors]) => {
      const localAssignees = Array.from(this.assignees);
      const unusedContributors = contributors?.filter(
        contributor => !localAssignees.includes(contributor.login),
      );
      const filteredContributors = unusedContributors?.filter(contributor =>
        contributor.login.toLowerCase().includes(input),
      );
      return filteredContributors;
    }),
  );
  repository$ = this.repositoryService.repository$;
  destroy$: Subject<void> = new Subject<void>();
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private readonly repositoryService: RepositoryService,
    private readonly formService: FormService,
  ) {}

  ngOnInit() {
    this.labelsGithubControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((labels: GitHubLabel[]) => {
        this.form.get('labels')?.setValue(labels.map(label => label.name));
      });

    this.formService.populate$
      .pipe(
        switchMap(() => combineLatest([this.labels$, this.contributors$])),
        map(([labels, contributors]) => ({ labels, contributors })),
      )
      .subscribe(({ labels, contributors }) => this.populate(labels, contributors));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addLabels(): void {
    (this.form as IssueForm).addLabels();
  }

  addAssignees(): void {
    (this.form as IssueForm).addAssignees();
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
    this.form.get('labels')?.setValue(Array.from(this.labels));
  }

  addAssigneeFromInput(event: MatChipInputEvent): void {
    if (event.value) {
      console.log(event.value);
      this.assignees.add(event.value);
      this.form.get('assignees')?.setValue(Array.from(this.assignees));
      event.chipInput!.clear();
    }
  }

  removeAssignee(assignee: string): void {
    this.assignees.delete(assignee);
    this.form.get('assignees')?.setValue(Array.from(this.labels));
  }

  addGithubContributor(): void {
    this.assignees.add(this.contributorsGithubControl.value);
    this.form.get('assignees')?.setValue(Array.from(this.assignees));
    this.contributorsGithubControl.reset();
  }

  populate(
    githubLabels: GitHubLabel[] | null,
    githubContributors: GitHubContributor[] | null,
  ): void {
    if (this.form.get('labels') && this.form.get('labels')?.value?.length) {
      const formattedLabels = (this.form.get('labels')?.value as string[]).map(
        label => githubLabels?.find(githubLabel => githubLabel.name === label),
      );
      this.labelsGithubControl.setValue(formattedLabels, { onlySelf: true });
    }

    if (this.form.get('assignees') && this.form.get('assignees')?.value?.length) {
      const formattedAssignees = (this.form.get('assignees')?.value as string[]).map(
        assignee => githubContributors?.find(githubLabel => githubLabel.login === assignee),
      );
      this.contributorsGithubControl.setValue(formattedAssignees, { onlySelf: true });
    }
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
    MatAutocompleteModule,
  ],
  exports: [TopLevelCreatorComponent],
})
export class TopLevelCreatorModule {}
