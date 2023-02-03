import { MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Author } from './author.entity';

@Injectable()
export class AuthorService {
  constructor(private readonly orm: MikroORM) {}
  async createAuthor(name: string) {
    const authorRepository = this.orm.em.getRepository(Author);
    const author = new Author(name);

    await authorRepository.persistAndFlush(author);

    return author;
  }
}
