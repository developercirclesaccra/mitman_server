let authenticateRequest = (req, res, next) => {
  if (process.env.MITMAN_TOKEN == req.get('mitman-token')) {
    return next();
  }
  res.status(401).json({
    success: false,
    msg: 'Unauthorized request',
  });
};

module.exports = authenticateRequest;