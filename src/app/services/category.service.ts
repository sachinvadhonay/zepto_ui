import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    private apiUrl = 'https://localhost:7018/api/Product/categories';

  constructor(private http: HttpClient) 
  { 


  }
   getAllcategories():Observable<Category[]>{
      return this.http.get<Category[]>(this.apiUrl)
    }

    
  
}
