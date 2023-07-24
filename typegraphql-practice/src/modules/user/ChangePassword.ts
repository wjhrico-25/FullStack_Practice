import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../../entity/User";
import { redis } from "../../redis";
import { forgotPasswordPrefix } from "../../constants/redisPrefixes";

import { MyContext } from "../../types/MyContext";
import { ChangePasswordInput } from "./changepassword/ChangePasswordInput";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg("data")
    { token, password }: ChangePasswordInput,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const userIdString = await redis.get(forgotPasswordPrefix + token);

    if (!userIdString) {
      return null;
    }
        
    const userId = parseInt(userIdString, 10);
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
        return null;
      }

    await redis.del(forgotPasswordPrefix + token);

    user.password = await bcrypt.hash(password, 12);

    await user.save();

    ctx.req.session!.userId = user.id;

    return user;
  }
}