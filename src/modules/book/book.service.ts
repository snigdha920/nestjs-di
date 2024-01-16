import { Injectable } from '@nestjs/common';
import { AuthorService } from '../author/author.service';

// @Injectable()
export class BookService {
  constructor(public readonly authorService: AuthorService) {
    console.log(`BookService.authorService is`, authorService);
  }

  async getBookAuthor() {
    const author = await this.authorService.getAuthor(); // this.authorService is undefined
    return `book author: ${author}`;
  }
}
