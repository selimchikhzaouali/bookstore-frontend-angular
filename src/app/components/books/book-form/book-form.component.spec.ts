import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs';
import { BookFormComponent } from './book-form.component';
import { BookService } from 'src/app/_services/book.service';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;
  let mockBookService: jasmine.SpyObj<BookService>;

  beforeEach(async () => {
    // Create a mock service
    mockBookService = jasmine.createSpyObj('BookService', ['addBook']);
    mockBookService.addBook.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      declarations: [BookFormComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCardModule,
        HttpClientModule
      ],
      providers: [
        { provide: BookService, useValue: mockBookService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;

    // Mock authors and categories for dropdowns
    component.authors = [
      { id: 1, name: 'Author One' },
      { id: 2, name: 'Author Two' },
    ];
    component.categories = [
      { id: 1, name: 'Category One', description: 'Description One' },
      { id: 2, name: 'Category Two', description: 'Description Two' },
    ];

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.bookForm.value).toEqual({
      title: null,
      isbn: null,
      price: null,
      authorId: null,
      categoryId: null,
    });
  });

  it('should mark the form as invalid when required fields are empty', () => {
    component.bookForm.controls['title'].setValue(null);
    component.bookForm.controls['isbn'].setValue(null);
    component.bookForm.controls['price'].setValue(null);
    expect(component.bookForm.invalid).toBeTrue();
  });

  it('should mark the form as valid when all required fields are filled', () => {
    component.bookForm.controls['title'].setValue('Book Title');
    component.bookForm.controls['isbn'].setValue('123-456');
    component.bookForm.controls['price'].setValue(100);
    component.bookForm.controls['authorId'].setValue(1);
    component.bookForm.controls['categoryId'].setValue(2);
    expect(component.bookForm.valid).toBeTrue();
  });

  it('should call addBook service method on form submit', () => {
    const formValue = {
      title: 'Test Book',
      isbn: '123-456',
      price: 99.99,
      authorId: 1,
      categoryId: 1,
    };

    component.bookForm.setValue(formValue);
    component.onSubmit();

    expect(mockBookService.addBook).toHaveBeenCalledWith(formValue);
  });

  it('should reset the form after successful submission', () => {
    const formValue = {
      title: 'Test Book',
      isbn: '123-456',
      price: 99.99,
      authorId: 1,
      categoryId: 1,
    };

    component.bookForm.setValue(formValue);
    component.onSubmit();

    expect(component.bookForm.value).toEqual({
      title: null,
      isbn: null,
      price: null,
      authorId: null,
      categoryId: null,
    });
  });
});
