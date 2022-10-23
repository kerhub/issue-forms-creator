import { Component, NgModule, OnDestroy } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RepositoryService } from '../../services/repository.service';
import { Subject } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-repository-finder',
  templateUrl: './repository-finder.component.html',
  styleUrls: ['./repository-finder.component.scss'],
})
export class RepositoryFinderComponent implements OnDestroy {
  form: UntypedFormGroup = new UntypedFormGroup(
    {
      name: new UntypedFormControl(
        null,
        Validators.required,
        this.repositoryService.repositoryValidator(),
      ),
    },
    { updateOn: 'submit' },
  );

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
    MatProgressSpinnerModule,
    CommonModule,
  ],
  exports: [RepositoryFinderComponent],
})
export class RepositoryFinderModule {}
