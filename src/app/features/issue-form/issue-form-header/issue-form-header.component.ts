import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IconModule } from '../../../shared/icon.module';

@Component({
  selector: 'app-issue-form-header',
  templateUrl: './issue-form-header.component.html',
  styleUrls: ['./issue-form-header.component.scss'],
})
export class IssueFormHeaderComponent {
  @Output() switchSelectionMode: EventEmitter<void> = new EventEmitter<void>();
}

@NgModule({
  declarations: [IssueFormHeaderComponent],
  imports: [IconModule, MatIconModule, MatButtonModule],
  exports: [IssueFormHeaderComponent],
})
export class IssueFormHeaderModule {}
