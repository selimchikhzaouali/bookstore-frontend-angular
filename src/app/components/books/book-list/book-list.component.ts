import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: any[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data.map((book) => ({
        ...book,
        image: `https://picsum.photos/seed/${book.title}/300/200`
      }));
    });
  }
}
