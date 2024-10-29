const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "c0d608098b78d61cf5654965dab8b53632bf831dc6b43f29289411376ac107b";
const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res
      .status(401)
      .send({ error: "Please authenticate user usnig valid token." });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res
      .status(401)
      .send({ error: "Please authenticate user usnig valid token." });
  }
};
module.exports = fetchuser;
