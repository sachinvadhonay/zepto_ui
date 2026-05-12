import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddproductComponent } from './pages/addproduct/addproduct.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductlistComponent } from './pages/productlist/productlist.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full',
      },
      {
        path: 'Home',
        component: HomeComponent,
      },
      {
        path: 'productlist/:id',
        component: ProductlistComponent,
      },
      {
        path: 'addproduct',
        component: AddproductComponent,
      },
      {
        path: 'addproduct/:id',
        component: AddproductComponent,
      },

      {
         path: 'categories',
         component: CategoriesComponent 
        },
    ],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
