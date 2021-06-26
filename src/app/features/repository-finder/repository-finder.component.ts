import { Component, NgModule, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RepositoryService } from '../../services/repository.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-repository-finder',
  templateUrl: './repository-finder.component.html',
  styleUrls: ['./repository-finder.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RepositoryFinderComponent implements OnDestroy {
  form: FormGroup = new FormGroup({
    name: new FormControl(null),
  });

  // Todo : add check existing template names
  tooltipMessage = `
    load contributors for assignee list
    load existing labels
  `;

  destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly repositoryService: RepositoryService) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // TODO : catch errors
  loadRepository(): void {
    this.repositoryService
      .loadLabels(this.form.value.name)
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.repositoryService
      .loadContributors(this.form.value.name)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  reset(): void {
    this.form.reset();
    this.repositoryService.reset();
  }
}

@NgModule({
  declarations: [RepositoryFinderComponent],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  exports: [RepositoryFinderComponent],
})
export class RepositoryFinderModule {}
