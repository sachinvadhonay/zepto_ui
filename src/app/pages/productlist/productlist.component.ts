import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productlist',
 standalone: true,
  imports: [CommonModule],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.css'
})
export class ProductlistComponent implements OnInit {

  products: Product[] = [];

  categoryId:number = 0;

  constructor(private route: ActivatedRoute,private productService: ProductService,private router: Router) { }

  ngOnInit(): void {

      this.categoryId = Number(this.route.snapshot.paramMap.get('id'));

      this.loadProducts();

      
  }

  loadProducts()
  {
    this.productService.getProductByCategory(this.categoryId).subscribe(res=>{
       console.log("Filtered Products:", res);

    this.products = res;
    })
  }

  editProduct(id:number){
    this.router.navigate(['/addproduct',id]);
  }

  deleteProduct(id:number)
  {
    Swal.fire({
      title:'Are you sure?',
      text:'This Product will be deleted!',
      icon:'warning',
      showCancelButton: true,
    confirmButtonText: 'Yes, Delete'
    }).then((result)=>{

      if(result.isConfirmed)
      {
        this.productService.DeleteProduct(id).subscribe({
           next:(res)=>{

          Swal.fire({
            title:'Deleted!',
            text:'Product Deleted Successfully',
            icon:'success'
          });
         
         this.loadProducts();
      },
        error:(err)=>{

          Swal.fire({
            title:'Error!',
            text:'Delete Failed',
            icon:'error'
          });

          console.log(err);
        }

      });
    }
    });
  }
  
}
 
