import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private apiUrl = 'https://api.github.com/users';

  constructor(private http: HttpClient) {}

  getUserInfo(username: string): Observable<any> {
    const url = `${this.apiUrl}/${username}`;
    return this.http.get(url);
  }

  getUserRepositories(username: string): Observable<any> {
    const url = `${this.apiUrl}/${username}/repos`;
    return this.http.get(url);
  }

  getLanguages(url: string): Observable<string[]> {
    return this.http
      .get(url)
      .pipe(map((languages: any) => Object.keys(languages) as string[]));
  }

  getFilteredRepositories(
    username: string,
    repoNames: string[]
  ): Observable<any[]> {
    return forkJoin(
      repoNames.map((repoName) =>
        this.getUserRepositories(username).pipe(
          map((repos: any[]) => repos.find((repo) => repo.name === repoName)),
          switchMap((repo) =>
            repo
              ? this.getLanguages(repo.languages_url).pipe(
                  map((languages) => ({ ...repo, languages }))
                )
              : of(null)
          )
        )
      )
    );
  }
}
