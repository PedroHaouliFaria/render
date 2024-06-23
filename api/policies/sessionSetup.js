// api/policies/sessionSetup.js
module.exports = async function (req, res, proceed) {
  // Check if the userId is present in the session
  if (!req.session.userId) {
    // If userId is not present, redirect to the login page
    return res.redirect('/login');
  }
  // If userId is present, proceed to the next middleware or route handler
  return proceed();
};
