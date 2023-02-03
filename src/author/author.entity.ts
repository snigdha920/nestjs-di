import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Author {
  @PrimaryKey()
  @Field(() => String)
  _id!: ObjectId;

  @Property()
  @Field()
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
