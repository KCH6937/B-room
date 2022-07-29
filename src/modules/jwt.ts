import jwt from 'jsonwebtoken';

const jwtSecret: string = process.env.JWT_SECRET as string;

//access token 발급
export const signAccessToken = (userId: number, authority: number) => {
  const payload = {
    userId,
    authority
  };

  return jwt.sign(payload, jwtSecret, {
    algorithm: 'HS256',
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES
  });
};

//access token 검증
export const verifyAccessToken = (token: string) => {
  let decoded: any = null;
  try {
    decoded = jwt.verify(token, jwtSecret);

    return {
      ok: true,
      userId: decoded.userId,
      authority: decoded.authority
    };
  } catch (err: any) {
    return {
      ok: false,
      message: err.message
    };
  }
};
