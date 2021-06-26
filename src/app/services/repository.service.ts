import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { GithubLabel } from '../models/github/github-label';
import { tap } from 'rxjs/operators';
import { GithubContributor } from '../models/github/github-contributor';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  githubApiUrl = 'https://api.github.com/repos';

  labelsSubject: Subject<GithubLabel[] | null> = new Subject<GithubLabel[] | null>();
  labels$: Observable<GithubLabel[] | null> = this.labelsSubject.asObservable();

  contributorsSubject: Subject<GithubContributor[] | null> = new Subject<
    GithubContributor[] | null
  >();
  contributors$: Observable<GithubContributor[] | null> = this.contributorsSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  loadLabels(repository: string): Observable<GithubLabel[]> {
    return this.http
      .get<GithubLabel[]>(`${this.githubApiUrl}/${repository}/labels`)
      .pipe(tap(labels => this.labelsSubject.next(labels)));
  }

  loadContributors(repository: string): Observable<GithubContributor[]> {
    return this.http
      .get<GithubContributor[]>(`${this.githubApiUrl}/${repository}/contributors`)
      .pipe(tap(contributors => this.contributorsSubject.next(contributors)));
  }

  reset(): void {
    this.labelsSubject.next(null);
  }
}
