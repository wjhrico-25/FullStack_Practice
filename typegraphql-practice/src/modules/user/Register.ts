//import { Length, IsEmail } from "class-validator";
import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import * as  bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { isAuth } from "../middleware/isAuth";
import { logger } from "../middleware/logger";
import { sendEmail } from "../utils/sendEmail";
import { createConfirmationUrl } from "../utils/createConfirmationUrl";
  
  @Resolver(User)
  export class RegisterResolver {
    //@Authorized() //Message shows Access denied! You need to be authorized to perform this action!
    @UseMiddleware(isAuth, logger) //adding new message errors
    @Query(() => String)
    async hello() {
      return "Hello World!";
    }
  
    @Mutation(() => User)
    async register(
      @Arg("data")
      {
        email,
        firstName,
        lastName,
        password
      }: RegisterInput): Promise<User> {
                
        //console.log(email, firstName, lastName, password, "Checking ONLY");
        const hashedPassword = await bcrypt.hash(password, 12);
        //console.log(hashedPassword, "Checking password");

        const user = await User.create({
        firstName,
        lastName,
        email,        
        password: hashedPassword    
        }).save();

        console.log(user, 'User Registered')
    

      await sendEmail(email, await createConfirmationUrl(user.id));

      return user;
    }
  }
  
  