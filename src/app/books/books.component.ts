import { Component, OnInit } from '@angular/core';

import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.bookService.getBooks()
    .subscribe(books => this.books = books);
  }

  add(name: string): void{
    name = name.trim();
    if(!name){
      return;
    }
    this.bookService.addBook({name} as Book).subscribe(
      book => {
        this.books.push(book);
      }
    );
  }

  delete(book: Book): void{
    this.books = this.books.filter(b => b !== book);
    this.bookService.deleteBook(book.id).subscribe();
  }
}