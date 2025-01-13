import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/_services/book.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from 'src/app/_services/author.service';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  authors: any[] = [];
  categories: any[] = [];

  constructor(private fb: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService,
    private categoryService: CategoryService ) {
    
    this.bookForm = this.fb.group({
      title: [null, Validators.required],
      price: [null, Validators.required],
      isbn: [null, Validators.required],
      authorId: [null, Validators.required],
      categoryId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAuthors();
    this.getCategories();
  }

  getAuthors(): void {
    this.authorService.getAuthors().subscribe( data => {
      this.authors = data;
    });
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe( data => {
      this.categories = data;
    });
  }

  onSubmit(): void {
    this.bookService.addBook(this.bookForm.value).subscribe(() => {
      this.bookForm.reset();
      alert('Book added successfully');
    });
  }
}
