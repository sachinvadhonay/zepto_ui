import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';
import { vendors } from '../../models/vendor.model';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent implements OnInit{

    categories: Category[] = [];

    vendors : vendors[] = [];

    productData: any ={
    productname:'',
    description: '',
    price: 0,
    quantity: 0,
    categoryId: 0,
    vendorId: 0,
    }

     selectedFile: File | null = null;

     constructor(private categoryService: CategoryService, private productService : ProductService) {
      

     }
   
  ngOnInit(): void {
    
    this.Loadcategories();
    this.Loadvendors();
  }

  Loadcategories()
  {
    this.categoryService.getAllcategories().subscribe(res=>{
      this.categories = res;
    });
  }

  Loadvendors()
  {
    this.productService.getallvendors().subscribe(res=>{
      console.log(res);
      this.vendors = res;
    })
  }

   onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  saveProduct()
  {

    const formData = new FormData();

    formData.append('productname', this.productData.productname);
    formData.append('description', this.productData.description);
    formData.append('price', this.productData.price);
    formData.append('quantity', this.productData.quantity);
    formData.append('categoryId', this.productData.categoryId);
    formData.append('vendorId', this.productData.vendorId);

     if (this.selectedFile) {
      formData.append('imageFile', this.selectedFile);
    }

     this.productService.addproduct(formData).subscribe({

    next: (res) => {

      Swal.fire({
        title: 'Success!',
        text: 'Product Added Successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(()=>{

         this.productData = {
      productname: '',
      description: '',
      price: 0,
      quantity: 0,
      categoryId: 0,
      vendorId: 0
    };
     this.selectedFile = null;
      });

      console.log(res);

    },

    error: (err) => {

      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'OK'
      });

      console.log(err);

    }

  });
  }


}
