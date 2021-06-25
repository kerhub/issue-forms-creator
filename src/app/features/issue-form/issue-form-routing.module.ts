import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssueFormComponent } from './issue-form.component';

const routes: Routes = [{ path: '', component: IssueFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IssueFormRoutingModule {}
