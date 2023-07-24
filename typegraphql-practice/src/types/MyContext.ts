import { Request, Response } from "express";
// import { Session, SessionData } from "express-session";

export interface MyContext {
  req: Request;
  res: Response;
}
  // & { session: Session & Partial<SessionData> & { userId?: number } };
  // 