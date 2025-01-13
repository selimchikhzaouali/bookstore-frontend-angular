import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BooksRoutingModule } from './books-routing.module'; // Import feature routing
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    BookListComponent,
    BookFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BooksRoutingModule // Include feature routing
  ]
})
export class BooksModule { }
