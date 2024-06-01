import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadUsers } from '../../state/user.actions';
import { UserState } from '../../state/user.reducer';
import { selectAllUsers } from '../../state/user.selectors';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: Observable<any[]>;
  filterUsers$: Observable<any[]>;
  loading$: Observable<boolean>;  
  page: number=1;

  constructor(
    private store: Store<UserState>,
     private router: Router,
     private loadingService: LoadingService) {
    this.users$ = this.store.pipe(select(selectAllUsers));
    this.filterUsers$ = this.users$;
    this.loading$ = this.loadingService.loading$;  
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadUsers({ page: this.page }));
  }

  navigateToUser(id: number): void {
    this.router.navigate(['/user', id]);
  }

  search(term: string): void {
    this.filterUsers$ = this.users$.pipe(
      map(users => users.filter(user =>
        user.first_name.toLowerCase().includes(term.toLowerCase()) ||
        user.last_name.toLowerCase().includes(term.toLowerCase())
      ))
    );
  }

  previous(): void {
    if (this.page > 1) {
      this.page--;
      this.store.dispatch(new LoadUsers({ page: this.page }));
    }
  }

  next(): void {
    if (this.page < 2) {  // Adjust this condition if there are more pages
      this.page++;
      this.store.dispatch(new LoadUsers({ page: this.page }));
    }
  }
}