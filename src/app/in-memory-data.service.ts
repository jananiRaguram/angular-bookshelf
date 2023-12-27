import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Book } from './book';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const books = [
      { id: 1, 
        title: 'The Ballad of Songbirds and Snakes',
        author: 'Suzanne Collins',
        numPgs: 747,
        read: false 
      },
      { id: 2, 
        title: 'The Priory of the Orange Tree',
        author: 'Samantha Shannon',
        numPgs: 848,
        read: true 
      }
    
    ];
    return {books};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(books: Book[]): number {
    return books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 11;
  }
}