const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  // const token = req.cookies.jwt;
  // if (!token) {
  //   next(new UnauthorizedError('Необходима авторизация'));
  // }

  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;

  // let payload;
  // try {
  //   payload = jwt.verify(token, 'secret-key');
  // } catch (err) {
  //   next(new UnauthorizedError('Необходима авторизация'));
  // }
  // req.user = payload;
  next();
};
