import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssueFormComponent } from './features/issue-form/issue-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'new',
    pathMatch: 'full',
  },
  {
    path: 'new',
    component: IssueFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
