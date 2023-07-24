import { MiddlewareFn } from "type-graphql";

import { MyContext } from "../../types/MyContext";

//generic: MiddlewareFn<MyContext>
export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw new Error("Not authenticated"); //showing error
  }

  return next();
};