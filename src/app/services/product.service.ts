import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   private apiUrl = 'https://localhost:7018/api/Product';

  constructor(private http: HttpClient) 
  { 

  }

  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl)
  }

}
