const jwt = require('jsonwebtoken');
const jwtSecret = process.env.SECRET_KEY;

export default (req, res) => {
  if (req.method === 'GET') {
    if (!('token' in req.cookies)) {
      res.status(401).json({message: 'Logowanie nie powiodło się'});
      return;
    }
    let decoded;
    const token = req.cookies.token;
    if (token) {
      try {
        decoded = jwt.verify(token, jwtSecret);
      } catch (e) {
        console.error(e);
      }
    }

    if (decoded) {
      res.json(decoded);
      return;
    } else {
      res.status(401).json({message: 'Logowanie nie powiodło się'});
    }
  }
};
