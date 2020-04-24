import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NewsService {
apiUrl = 'https://api.github.com/users';

  constructor(private http: HttpClient ) { }


  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?per_page=12`)
    }
    
  }


