import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { combineLatest, Observable, of, ReplaySubject } from 'rxjs';
import { GithubLabel } from '../models/github/github-label';
import { catchError, map, tap } from 'rxjs/operators';
import { GithubContributor } from '../models/github/github-contributor';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  githubApiUrl = 'https://api.github.com/repos';

  repositorySubject: ReplaySubject<string | null> = new ReplaySubject<string | null>();
  repository$: Observable<string | null> = this.repositorySubject.asObservable();

  labelsSubject: ReplaySubject<GithubLabel[] | null> = new ReplaySubject<GithubLabel[] | null>();
  labels$: Observable<GithubLabel[] | null> = this.labelsSubject.asObservable();

  contributorsSubject: ReplaySubject<GithubContributor[] | null> = new ReplaySubject<
    GithubContributor[] | null
  >();
  contributors$: Observable<GithubContributor[] | null> = this.contributorsSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  loadLabels(repository: string): Observable<GithubLabel[]> {
    return this.http.get<GithubLabel[]>(`${this.githubApiUrl}/${repository}/labels`).pipe(
      map(labels =>
        labels.map(label => ({
          ...label,
          color: `#${label.color}`,
        })),
      ),
      tap(labels => this.labelsSubject.next(labels)),
    );
  }

  loadContributors(repository: string): Observable<GithubContributor[]> {
    return this.http
      .get<GithubContributor[]>(`${this.githubApiUrl}/${repository}/contributors`)
      .pipe(tap(contributors => this.contributorsSubject.next(contributors)));
  }

  loadRepositoryInfo(repository: string): Observable<[GithubLabel[], GithubContributor[]]> {
    return combineLatest<[GithubLabel[], GithubContributor[]]>([
      this.loadLabels(repository),
      this.loadContributors(repository),
    ]).pipe(tap(() => this.updateRepository(repository)));
  }

  repositoryValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      control.markAllAsTouched();
      return this.loadRepositoryInfo(control.value).pipe(
        map(() => null),
        catchError((error: HttpErrorResponse) => {
          this.repositorySubject.next(null);
          return of({ httpError: error.error.message });
        }),
      );
    };
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
