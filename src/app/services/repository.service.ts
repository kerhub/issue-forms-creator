import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { combineLatest, Observable, of, ReplaySubject } from 'rxjs';
import { GitHubLabel } from '../models/github/github-label';
import { catchError, map, tap } from 'rxjs/operators';
import { GitHubContributor } from '../models/github/github-contributor';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  githubApiUrl = 'https://api.github.com/repos';

  repositorySubject: ReplaySubject<string | null> = new ReplaySubject<string | null>();
  repository$: Observable<string | null> = this.repositorySubject.asObservable();

  labelsSubject: ReplaySubject<GitHubLabel[] | null> = new ReplaySubject<GitHubLabel[] | null>();
  labels$: Observable<GitHubLabel[] | null> = this.labelsSubject.asObservable();

  contributorsSubject: ReplaySubject<GitHubContributor[] | null> = new ReplaySubject<
    GitHubContributor[] | null
  >();
  contributors$: Observable<GitHubContributor[] | null> = this.contributorsSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  loadLabels(repository: string): Observable<GitHubLabel[]> {
    return this.http.get<GitHubLabel[]>(`${this.githubApiUrl}/${repository}/labels`).pipe(
      map(labels =>
        labels.map(label => ({
          ...label,
          color: `#${label.color}`,
        })),
      ),
      tap(labels => this.labelsSubject.next(labels)),
    );
  }

  loadContributors(repository: string): Observable<GitHubContributor[]> {
    return this.http
      .get<GitHubContributor[]>(`${this.githubApiUrl}/${repository}/contributors`)
      .pipe(tap(contributors => this.contributorsSubject.next(contributors)));
  }

  loadRepositoryInfo(repository: string): Observable<[GitHubLabel[], GitHubContributor[]]> {
    return combineLatest<[GitHubLabel[], GitHubContributor[]]>([
      this.loadLabels(repository),
      this.loadContributors(repository),
    ]).pipe(tap(() => this.updateRepository(repository)));
  }

  repositoryValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      control.markAllAsTouched();
      const repositoryName = this.extractRepositoryName(control.value);
      return this.loadRepositoryInfo(repositoryName).pipe(
        map(() => null),
        catchError((error: HttpErrorResponse) => {
          this.repositorySubject.next(null);
          return of({ httpError: error.error.message });
        }),
      );
    };
  }

  private extractRepositoryName(url: string): string {
    const githubDomain = 'https://github.com/';
    return url.replace(githubDomain, '');
  }

  updateRepository(repository: string): void {
    const url = `https://github.com/${repository}`;
    this.repositorySubject.next(url);
  }

  reset(): void {
    this.labelsSubject.next(null);
    this.contributorsSubject.next(null);
    this.repositorySubject.next(null);
  }
}
