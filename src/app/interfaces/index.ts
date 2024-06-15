import { JwtPayload } from 'jsonwebtoken';

// declare module 'express' {
//     interface Request {
//         user: JwtPayload;
//     }
// }


declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
