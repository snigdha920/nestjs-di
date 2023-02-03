import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Author } from './author.entity';
import { AuthorService } from './author.service';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}
  @Query(() => Author)
  async author() {
    const newAuthor = await this.authorService.createAuthor(
      `test-${new Date().toString()}`,
    );
    return newAuthor;
  }

  @ResolveField(() => String)
  async computedField() {
    return 'something computed';
  }
}
