import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Author {
  @PrimaryKey()
  @Field()
  id!: string;

  @Property()
  @Field()
  name!: string;
}
