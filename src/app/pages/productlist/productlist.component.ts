import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productlist',
 standalone: true,
  imports: [CommonModule],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.css'
})
export class ProductlistComponent implements OnInit {

  products: Product[] = [];

  constructor(private route: ActivatedRoute,private productService: ProductService,private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

     if(id)
      {
        this.productService.getProductByCategory(id).subscribe(res =>{
          console.log("Filtered Products:", res);
          this.products = res;
        });
      }
      
  }


  editProduct(id:number){
    this.router.navigate(['/addproduct',id]);
  }


 
}
