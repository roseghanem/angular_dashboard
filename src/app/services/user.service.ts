import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, shareReplay, finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://reqres.in/api/users';
  private userCache = new Map<number, any>();

  constructor(private http: HttpClient, private loadingService: LoadingService) {}

  getUsers(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?page=${page}`).pipe(
      shareReplay(1),
      finalize(() => this.loadingService.setLoading(false)) 
    );
  }

  getUserById(id: number): Observable<any> {
    if (this.userCache.has(id)) {
      return of(this.userCache.get(id));
    } else {
      return this.http.get(`${this.baseUrl}/${id}`).pipe(
        tap(data => this.userCache.set(id, data)),
        shareReplay(1),
        finalize(() => this.loadingService.setLoading(false)) 
      );
    }
  }
}