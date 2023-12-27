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
  book = <Book>{};
  constructor(private bookService: BookService) { }
  
 
  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks()
    .subscribe(books => this.books = books);
  }

  delete(book: Book): void{
    this.books = this.books.filter(b => b !== book);
    this.bookService.deleteBook(book.id).subscribe();
  }

  add(f: Book): void{
    let title, author: String;
    let numPgs: number;
    let read: boolean;

    title = f.title.trim();
    author = f.author.trim();
    numPgs = f.numPgs;
    read = f.read;

    if(!title || !author || numPgs == 0){
      return;
    }

    this.bookService.addBook({title, author, numPgs, read} as Book).subscribe(
      book => {
        this.books.push(book);
      }
    );
  }
}