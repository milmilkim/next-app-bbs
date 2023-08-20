import jwt from 'jsonwebtoken';

const secret = process.env.SECRET;

export const generateToken = (value: object) => {
  if (!secret) {
    throw new Error('secret 환경변수 없음!');
  }
  return jwt.sign(value, secret, {
    expiresIn: '1h',
  });
};

export const verifyToken = (token: string) => {
  if (!secret) {
    throw new Error('secret 환경변수 없음!');
  }
  return jwt.verify(token, secret);
};
