import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '@modules/jwt';
import { fail } from '@modules/response';
import statusCode from '@modules/statusCode';
import message from '@modules/message';

const authJWT = (req: Request, res: Response, next: NextFunction) => {
  let token: string = '';
  if (req.headers['authorization']) {
    token = req.headers['authorization']!.split('Bearer ').reverse()[0];
  }

  if (!token) {
    return res
      .status(statusCode.UNAUTHORIZED)
      .send(fail(statusCode.UNAUTHORIZED, message.NULL_VALUE_ACEESS_TOKEN));
  }

  const payload = verifyAccessToken(token);

  if (payload.ok) {
    req.body.userId = payload.userId;
    req.body.authority = payload.authority;
    next();
  } else {
    // 토큰 만료
    if (payload.message.includes('expired')) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(fail(statusCode.UNAUTHORIZED, message.ACCESS_TOKEN_EXPIRES));
    }
    // 검증 실패
    return res
      .status(statusCode.UNAUTHORIZED)
      .send(fail(statusCode.UNAUTHORIZED, message.INVALID_ACCESS_TOKEN));
  }
};

export default authJWT;
