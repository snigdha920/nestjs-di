import { MikroORM } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { Author } from './author.entity';

@Injectable()
export class AuthorService {
  constructor(
    private readonly orm: MikroORM,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}
  async createAuthor(name: string) {
    const authorRepository = this.orm.em.getRepository(Author);
    const author = new Author(name);

    await authorRepository.persistAndFlush(author);

    this.pubSub.publish('authorAdded', { authorAdded: author });

    return author;
  }

  async logMikroEM() {
    const em = this.orm.em;
    console.log('EM ID: ', em.id);

    return em.id;
  }
}
