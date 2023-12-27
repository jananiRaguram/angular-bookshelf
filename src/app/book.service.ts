import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Book } from './book';
import { BOOKS } from './mock-books';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BookService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

  /** Log a bookService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`BookService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      
      return of(result as T);
    };
  }

  private booksUrl = 'api/books';  // URL to web api
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET books from the server */
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl).pipe(
      tap(_ => this.log('fetched books')),
      catchError(this.handleError<Book[]>('getBooks', []))
    );
  }

  getBook(id: number): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Book>(url).pipe(
      tap( _ => this.log(`fetched book id=${id}`)),
      catchError(this.handleError<Book>(`getBook id=${id}`))
    );
  }

  updateBook(book: Book): Observable<any>{
    return this.http.put(this.booksUrl, book, this.httpOptions).pipe(
      tap( _ => this.log(`updated book id=${book.id}`)),
      catchError(this.handleError<any>(`updateBook`))
    );
  }
 
  addBook(book: Book): Observable<Book>{
    return this.http.post<Book>(this.booksUrl, book, this.httpOptions).pipe(
      tap((newBook: Book ) => this.log(`added book id=${newBook.id}`)),
      catchError(this.handleError<Book>('addBook'))
    );
  }

  deleteBook(id: number): Observable<Book>{
    const url = `${this.booksUrl}/${id}`;

    return this.http.delete<Book>(url, this.httpOptions).pipe(
      tap( _ => this.log(`deleted book id=${id}`)),
      catchError(this.handleError<Book>('deleteBook'))
    );
  }

  searchBooks(term: string): Observable<Book[]> {
    if(!term.trim()){
      return of([]);
    }

    return this.http.get<Book[]>(`${this.booksUrl}/?name=${term}`).pipe(
      tap( x => x.length ? 
        this.log(`found books matching ${term}`):
        this.log(`no matches for ${term}`)),
      catchError(this.handleError<Book[]>('searchBooks', []))
    );
  }
}