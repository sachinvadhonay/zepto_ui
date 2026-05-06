import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];

  
  constructor(private categoryservice : CategoryService,private router: Router) {

  }
  
  ngOnInit(): void {
     this.loadcategories();
  }


  loadcategories()
  {
     this.categoryservice.getAllcategories().subscribe(res=>{


      // 👇 attach static images
      this.categories = res.map(cat => ({
      ...cat,
      image: this.getCategoryImage(cat.categoryName)

    }));

     });
  }

  goToProducts(id: number)
  {
    this.router.navigate(['/productlist',id]);
  }

  getCategoryImage(name: string): string {
    const category = name.toLowerCase();

    if (category.includes('fruit')) return '1.png';
    if (category.includes('dairy')) return '2.png';
    if (category.includes('bakery')) return '3.png';
    if (category.includes('snack')) return '4.png';
    if (category.includes('beverage')) return '5.png';

    return '';
  } 


  goToAddProduct(){
    this.router.navigate(['/addproduct'])
  }
}
 