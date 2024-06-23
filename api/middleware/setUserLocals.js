// api/middleware/setUserLocals.js
module.exports = async function (req, res, next) {
  if (req.session && req.session.userId) {
    try {
      const user = await User.findOne({ id: req.session.userId }).populate('group');
      if (!user) {
        return res.serverError('User not found');
      }
      res.locals.user = user;
      return next();
    } catch (error) {
      return res.serverError(error);
    }
  } else {
    res.locals.user = {};
    return next();
  }
};
