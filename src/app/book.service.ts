import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Book } from './book';
import { BOOKS } from './mock-books';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class BookService {

  constructor(private messageService: MessageService) { }

  getBooks(): Observable<Book[]> {
    const books = of(BOOKS);
    this.messageService.add('BookService: fetched books');
    return books;
  }

  getBook(id: number): Observable<Book> {
    // For now, assume that a book with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const book = BOOKS.find(b => b.id === id)!;
    this.messageService.add(`BookService: fetched book id=${id}`);
    return of(book);
  }
}