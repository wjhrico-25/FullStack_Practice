import * as  bcrypt from "bcryptjs";
import { Arg, Ctx, Mutation, Resolver} from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";



@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
	
    @Ctx() ctx: MyContext // accessing the context GraphQL

  ): Promise<User | null> {
    
    // find the user
    const user = await User.findOne({ where: { email } }); 

    // fetching the user of the email
    if (!user) {
      return null;
    } 

	  // Compare the password
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return null;
    }

    if (!user.confirmed_email) {
      return null;
    }

    ctx.req.session!.userId = user.id; //create a session in Redis | to request to read the cookie
    return user;
  }
}
