import { MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class PasswordInput {
  @Field()
  @MinLength(10) //until 10 characters
  password: string;
}