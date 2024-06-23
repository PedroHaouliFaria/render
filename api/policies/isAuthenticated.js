module.exports = function(req, res, next) {
  // Check if the session exists and if the userId is present in the session
  if (req.session && req.session.userId) {
    return next(); // Proceed to the next middleware or route handler if the user is logged in
  }
  // If the user is not logged in, send a 401 Unauthorized response with an error message
  return res.status(401).send({ error: 'User not logged in' });
};
