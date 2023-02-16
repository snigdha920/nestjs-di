import {
  Embeddable,
  Embedded,
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

@Embeddable()
@ObjectType()
export class AuthorInfo {
  @Property({ default: null })
  @Field(() => GraphQLISODateTime, { nullable: true })
  dateOrNull: Date | null = null;

  @Property({ default: false })
  @Field(() => Boolean)
  someBoolean = false;

  constructor(args: AuthorInfo = { dateOrNull: null, someBoolean: false }) {
    Object.assign(this, args);
  }
}

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

  @Embedded({ entity: () => AuthorInfo, object: true })
  @Field(() => AuthorInfo)
  info = new AuthorInfo();

  constructor(name: string) {
    this.name = name;
  }
}
