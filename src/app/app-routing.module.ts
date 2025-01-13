import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { 
    path: 'books', 
    loadChildren: () => import('./components/books/books.module').then(m => m.BooksModule) 
  },
  // {
  //   path: 'authors',
  //   loadChildren: () => import('./components/authors/authors.module').then(m => m.AuthorsModule)
  // },
  // {
  //   path: 'categories',
  //   loadChildren: () => import('./components/categories/categories.module').then(m => m.CategoriesModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
