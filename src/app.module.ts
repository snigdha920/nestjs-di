import { MongoDriver } from '@mikro-orm/mongodb';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { join } from 'path';
import { Author } from './author/author.entity';
import { AuthorResolver } from './author/author.resolver';
import { AuthorService } from './author/author.service';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      dbName: 'nestjs-mikro-test',
      port: 27017,
      driver: MongoDriver,
      entities: [Author],
      allowGlobalContext: false,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          path: '/graphql',
        },
      },
    }),
  ],
  providers: [
    AuthorService,
    AuthorResolver,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
})
export class AppModule {}
