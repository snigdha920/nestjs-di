import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Author {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  @Field(() => ID)
  public id!: string;

  @Property()
  @Field()
  name: string;

  @Property({ default: 0 })
  @Field(() => Number)
  bestsellers = 0;

  constructor(name: string) {
    this.name = name;
  }
}
