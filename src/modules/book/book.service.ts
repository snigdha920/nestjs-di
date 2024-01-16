import { Injectable } from '@nestjs/common';
import type { AuthorService } from '../author/author.service';

// @Injectable()
export class BookService {
  constructor(private readonly authorService: AuthorService) {}

  async getBookAuthor() {
    const author = await this.authorService.getAuthor(); // this.authorService is undefined
    return `book author: ${author}`;
  }
}
