import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { vendors } from '../models/vendor.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   private apiUrl = 'https://localhost:7018/api/Product/category';

   private apivenurl = 'https://localhost:7018/api/Product/vendors';

  constructor(private http: HttpClient) 
  { 

  }

  getProductByCategory(categoryId: string): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/${categoryId}`);
  }


    addproduct(data:FormData){
      return this.http.post('https://localhost:7018/api/Product',data);
    }
    
    getallvendors(): Observable<vendors[]>{
       return this.http.get<vendors[]>(this.apivenurl)
    }

}
