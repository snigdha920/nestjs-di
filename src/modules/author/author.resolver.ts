import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { Inject } from '@nestjs/common';
import {
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Author } from './author.entity';
import { AuthorService } from './author.service';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(
    private readonly authorService: AuthorService,
    private readonly orm: MikroORM,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  @Query(() => String)
  async rootQuery() {
    return 'Hello, World!';
  }

  @Mutation(() => Author)
  async createAuthor() {
    const author = await this.authorService.createAuthor('test');
    return author;
  }

  @Subscription(() => Author)
  @UseRequestContext()
  authorAdded() {
    return this.pubSub.asyncIterator('authorAdded');
  }

  @ResolveField(() => String)
  async computedField() {
    await this.authorService.logMikroEM();
    return 'something computed';
  }
}
