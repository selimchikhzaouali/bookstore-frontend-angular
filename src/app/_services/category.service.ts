import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/api/categories'; // Replace with your backend URL if needed

  constructor(private http: HttpClient) {}

  // Retrieve all categories
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Retrieve a specific category by ID
  getCategoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // Add a new category
  createCategory(category: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, category);
  }

  // Update an existing category
  updateCategory(id: number, category: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, category);
  }

  // Delete a category
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}