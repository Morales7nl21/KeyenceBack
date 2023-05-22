import jwt from "jsonwebtoken";
import { Request, Response } from "express";
export function sign(user:string,name:string):string{   
    const token = jwt.sign(
        {
          usuario: user,
          username: name,
        },
        process.env.KEY_TO_JWT || "key",
        {
          expiresIn: "10h",
        }
      );   
    return token;    
}

export const validateToken = (req:Request, resp:Response, next: () => void):void => {
    
    const token = req.headers["authorization"];    
    if (token != undefined && token.startsWith("Bearer ")) {
      const token_without_bearer = token.slice(7);  
      jwt.verify(token_without_bearer, process.env.KEY_TO_JWT || "key");    
      next();
      
    } else
      resp.status(401).json({
        msg: "Access denied",
      });
  };