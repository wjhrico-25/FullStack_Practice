
import { v4 } from "uuid";
import { redis } from "../../redis";

export const createConfirmationUrl = async (userId: number) => {
  const token = v4(); // unique ID
  await redis.set(token, userId, "EX", 60 * 60 * 24); // 1 day expiration | 
	//userId: person ID to confirm   
  return `http://localhost:3333/confirmEmail/${token}`; //redirect the frontend (mutation)
};

/*
take the userID to create a token that associate it with the person userID, when it clicks it, will send it to the server to verify the correct token for the user and confirms the account
Token: set ID
userID: Rand uuid
*/ 

/* sending the tokwn to the server and verify it correctly. */
