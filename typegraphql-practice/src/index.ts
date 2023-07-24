import { ApolloServer } from "apollo-server-express";
import Express from "express";
import session from "express-session";
import { buildSchema } from "type-graphql";
import 'reflect-metadata';

import { DataSource } from "typeorm";
import { GraphQLError, GraphQLFormattedError, GraphQLSchema } from "graphql";
import { redis } from "./redis";
import cors from 'cors';

//Resolvers
/*
import { LoginResolver } from "./modules/user/Login";
import { MeResolver } from "./modules/user/Me";
import { ConfirmUserResolver } from "./modules/user/ConfirmUser";
*/

//import connectRedis from "connect-redis";
//import { sendEmail } from "./modules/utils/sendEmail";
// import { MyContext } from "./types/MyContext";
// const RedisStore = connectRedis(session);


declare module 'express-session' {
    export interface SessionData {
      user: { [key: string]: any };
      userId: number;
    }
  }

const main = async () => {
  const dataSource = await new DataSource({
    "name": "default",
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "postgres",
    "database": "backend-practice",
    "synchronize": true,
    "logging": true,
    "entities": [ "src/entity/*.*" ]
    });

    await dataSource.initialize();
    // console.log(session, 'check redis');        

    //replacing import * as express from "express;    
    // const express = require("express");
    // const app = express();
    const app = Express();

    //replacing import connectRedis from "connect-redis";
    // const connectRedis = require("connect-redis");     
    //console.log(RedisStore, 'check redis');
    const RedisStore = require("connect-redis").default;

    app.use(
        cors({
            credentials: true,
            origin: "http://localhost:3333",
        })
    );

    app.use(
        session({
            store: new RedisStore({ client: redis as any}), //session data being stored
            name: "testCookie", //name of the cookie 
            secret: "session testing only",
            resave: false,
            saveUninitialized: false,
            //constantly create a new session for new users

            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
            }, //cookie properties 
        })
    );

    const schema: GraphQLSchema = await buildSchema({
        resolvers: [__dirname + "/modules/**/*.ts"], //__dirname: tells the current directory
        authChecker: ({ context: {req} }) => {
           return !!req.session.userId
            
           // the short version of this coding:
            // if(req.session.userId) {
            //     return true
            // }
            // return false;
        }                
      });

    const apolloServer = new ApolloServer({
        schema,
        formatError: (error: GraphQLError): GraphQLFormattedError => {
            if (error && error.extensions) {
                error.extensions.code = 'GRAPHQL_VALIDATION_FAILED TESTING';
            }
            return error;
        },
        context: ({ req, res }: any) => ({ req, res }),
    });    

    await apolloServer.start();

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(4000, () =>{
        console.log(`Server started on http://localhost:4000/graphql`);
        // console.log(`Server started on http://localhost:3333`);
        //sendEmail();
    });
    
};

main();
