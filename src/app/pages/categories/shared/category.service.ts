import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import {map, catchError, flatMap} from 'rxjs/operators'
import { Category } from './categoy.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  private apiPath: string = "api/categories";
  constructor(public http: HttpClient) { }


  getAll(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    );
  }

  getById( id: number): Observable<Category> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get<Category>(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    )
  }

  create (category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiPath, category).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    );
  }

  update( category: Category): Observable<Category> {
    const url = `${this.apiPath}/${category.id}`;
    return this.http.put<Category>(url, category).pipe(
      catchError(this.handleError),
      map(() => category)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(()=> null)
    );
  }

  private jsonDataToCategories(jsonData: any[]): Category[] {
    const categories: Category[] = [];
    jsonData.forEach(e => categories.push(e as Category));
    return categories;
  }

  private jsonDataToCategory(jsonData: any): Category {
    return jsonData as Category;
  }

  handleError(error: any) {
    console.log(error);
    return throwError(error);
  }
}
