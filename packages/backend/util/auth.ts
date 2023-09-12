import express from 'express';
import { z } from 'zod';
import { compareToken } from './jwt';
import { checkUser } from '../service/User';
import { Role } from '@prisma/client';

export interface CustomUserRequest extends express.Request {
    user: null | {
        username: string;
        role: Role;
        no_hp: string;
        id: number;
    };
  }

export async function AuthMiddleware(req : express.Request, res : express.Response, next : express.NextFunction) {
    const token = req.signedCookies.token
   
    if(!z.string().nonempty().safeParse(token).success) {
        return {
            status : false,
            code : 401,
            message : "Unauthorized"
        }
    }
    const decode = compareToken(token)
    if(decode === false) {
        return {
            status : false,
            code : 401,
            message : "Not authorized"
        }
    }

    const result = await checkUser(decode.id)
    if(!result.status || result.data == null) return res.status(result.code).json(result);
    
    (req as CustomUserRequest).user = result.data
    next()
}