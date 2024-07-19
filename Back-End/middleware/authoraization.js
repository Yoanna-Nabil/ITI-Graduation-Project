function restrictTo(...roles) {
  return (req, res, next) => {
    console.log(req.body.role);
    if (!roles.includes(req.role)) {
      return res
        .status(401)
        .json({ message: `Yom MUST BE ${req.role} to continue` });
    } else {
      next();
    }
  };
}
module.exports = { restrictTo };
