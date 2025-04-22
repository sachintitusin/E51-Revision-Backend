const secure = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      return res.status(401).send("Unauthorized");
    }
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
};

module.exports = secure;
