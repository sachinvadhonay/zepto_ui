import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';
import { vendors } from '../../models/vendor.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent implements OnInit{


    constructor(private categoryService: CategoryService, private productService : ProductService, private route: ActivatedRoute) 
    {
      

    }

      ngOnInit(): void {
        
        this.Loadcategories();
        this.Loadvendors();

        this.productId = Number(this.route.snapshot.paramMap.get('id'));

        if(this.productId > 0)
        {
          this.loadProductById();
        }
      }


    productId:number = 0;

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

    
   
     loadProductById()
     {
      this.productService.getproductById(this.productId).subscribe(res=>
      {
        this.productData = res;
      }
      );
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



  createFormData(): FormData
  {
    const formData = new FormData();

    formData.append('productname',this.productData.productname);
     formData.append('description', this.productData.description);
    formData.append('price', this.productData.price);
    formData.append('quantity', this.productData.quantity);
    formData.append('categoryId', this.productData.categoryId);
    formData.append('vendorId', this.productData.vendorId);

     if(this.selectedFile)
    {
      formData.append('imageFile', this.selectedFile);
    }

    return formData;
  }



      saveProduct()
      {
        if(this.productId > 0)
        {
          this.updateproduct();
        }
        else
        {
          this.addproduct();
        }
      }


    addproduct()
    {
      const formData = this.createFormData();

      this.productService.addproduct(formData).subscribe({
          next: (res) => {

        Swal.fire({
          title: 'Success!',
          text: 'Product Added Successfully',
          icon: 'success',
          confirmButtonText: 'OK'
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
    


    updateproduct()
    {
      const formData = this.createFormData();

      this.productService.updateProduct(this.productId,formData).subscribe({

        next:(res)=>{
          
        Swal.fire({
          title: 'Updated!',
          text: 'Product Updated Successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        console.log(res);
        },

        error: (err) => {

        Swal.fire({
          title: 'Error!',
          text: 'Update Failed',
          icon: 'error',
          confirmButtonText: 'OK'
        });

        console.log(err);

      }
      });


    }
 
  }


 
